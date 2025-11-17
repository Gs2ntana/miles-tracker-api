package com.web.project.service;

import com.web.project.model.Cartao;
import com.web.project.model.Usuario;
import com.web.project.repository.AquisicaoRepository;
import com.web.project.repository.CartaoRepository;
import com.web.project.repository.ComprovanteRepository;
import com.web.project.requests.AquisicaoRequestDTO;
import com.web.project.requests.AquisicaoResponse;
import com.web.project.service.FileStorageService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AquisicaoServiceTest {

    @InjectMocks
    private AquisicaoService aquisicaoService;

    @Mock
    private AquisicaoRepository aquisicaoRepository;

    @Mock
    private CartaoRepository cartaoRepository;

    @Mock
    private ComprovanteRepository comprovanteRepository;

    @Mock
    private FileStorageService fileStorageService;

    @Mock
    private MultipartFile arquivoMock;

    @Test
    @DisplayName("Deve registrar aquisição com sucesso e calcular pontos corretamente")
    void registrarAquisicao_Sucesso() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);

        Cartao cartao = new Cartao();
        cartao.setId(10L);
        cartao.setUsuario(usuario);
        cartao.setFatorConversao(2.0); // 1 Real = 2 Pontos

        AquisicaoRequestDTO request = new AquisicaoRequestDTO(
                new BigDecimal("100.00"),
                "Teste Unitário",
                LocalDate.now(),
                30,
                10L // ID Cartao
        );

        // Simulando comportamento dos mocks
        when(cartaoRepository.findById(10L)).thenReturn(Optional.of(cartao));
        when(fileStorageService.saveFile(any())).thenReturn("arquivo_teste.pdf");

        // Simulando o salvamento (retorna o objeto passado com ID preenchido)
        when(aquisicaoRepository.save(any())).thenAnswer(invocation -> {
            var a = (com.web.project.model.Aquisicao) invocation.getArgument(0);
            a.setId(999L);
            return a;
        });

        AquisicaoResponse resposta = aquisicaoService.registrarAquisicao(request, arquivoMock, usuario);

        assertNotNull(resposta);
        assertEquals(999L, resposta.id());

        assertEquals(200, resposta.pontosEsperados());

        verify(aquisicaoRepository, times(1)).save(any());
        verify(comprovanteRepository, times(1)).save(any());
    }

    @Test
    @DisplayName("Deve lançar exceção se usuário tentar usar cartão de outra pessoa")
    void registrarAquisicao_FalhaAutorizacao() {
        Usuario donoDoCartao = new Usuario();
        donoDoCartao.setId(1L);

        Usuario ladrao = new Usuario();
        ladrao.setId(2L); // ID diferente!

        Cartao cartao = new Cartao();
        cartao.setId(10L);
        cartao.setUsuario(donoDoCartao);

        AquisicaoRequestDTO request = new AquisicaoRequestDTO(
                new BigDecimal("50.00"), "Fraude", LocalDate.now(), 30, 10L
        );

        when(cartaoRepository.findById(10L)).thenReturn(Optional.of(cartao));

        assertThrows(RuntimeException.class, () -> {
            aquisicaoService.registrarAquisicao(request, arquivoMock, ladrao);
        });

        verify(aquisicaoRepository, never()).save(any());
    }
}