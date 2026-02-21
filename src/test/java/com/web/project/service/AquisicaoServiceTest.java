package com.web.project.service;

import com.web.project.enuns.StatusCredito;
import com.web.project.model.*;
import com.web.project.repository.AquisicaoRepository;
import com.web.project.repository.CartaoRepository;
import com.web.project.repository.ComprovanteRepository;
import com.web.project.requests.AquisicaoRequestDTO;
import com.web.project.requests.AquisicaoResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
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

    // --- 1. HAPPY PATH (Caminho Feliz) ---
    @Test
    @DisplayName("Deve registrar aquisição com sucesso quando todos os dados forem válidos")
    void deveRegistrarAquisicaoComSucesso() {
        // Arrange
        Long usuarioId = 1L;
        Long cartaoId = 10L;
        Usuario usuario = new Usuario();
        usuario.setId(usuarioId);

        Programa programa = new Programa();
        programa.setDiasCarencia(45);

        Cartao cartao = new Cartao();
        cartao.setId(cartaoId);
        cartao.setUsuario(usuario);
        cartao.setFatorConversao(2.0);
        cartao.setProgramaPadrao(programa);


        AquisicaoRequestDTO request = new AquisicaoRequestDTO(
                new BigDecimal("100.00"),
                "Compra Teste",
                LocalDate.now(),
                cartaoId
        );

        when(cartaoRepository.findById(cartaoId)).thenReturn(Optional.of(cartao));
        when(fileStorageService.saveFile(arquivoMock)).thenReturn("/path/to/file.jpg");

        when(aquisicaoRepository.save(any(Aquisicao.class))).thenAnswer(invocation -> {
            Aquisicao a = invocation.getArgument(0);
            a.setId(100L);
            return a;
        });

        // Act
        AquisicaoResponse response = aquisicaoService.registrarAquisicao(request, arquivoMock, usuario);

        // Assert
        assertNotNull(response);

        ArgumentCaptor<Aquisicao> aquisicaoCaptor = ArgumentCaptor.forClass(Aquisicao.class);
        verify(aquisicaoRepository).save(aquisicaoCaptor.capture());
        Aquisicao aquisicaoSalva = aquisicaoCaptor.getValue();

        assertEquals(200, aquisicaoSalva.getPontosEsperados());
        assertEquals(StatusCredito.PENDENTE, aquisicaoSalva.getStatusCredito());

        assertEquals(LocalDate.now().plusDays(45), aquisicaoSalva.getDataPrevista());

        verify(comprovanteRepository, times(1)).save(any(Comprovante.class));
    }

    // --- 2. ERROR PATH (Caminho de Erro) ---
    @Test
    @DisplayName("Deve lançar exceção quando usuário tentar usar cartão de outra pessoa")
    void deveLancarErroQuandoUsuarioNaoAutorizado() {
        // Arrange
        Usuario dono = new Usuario();
        dono.setId(1L);
        Usuario intruso = new Usuario();
        intruso.setId(2L);

        Cartao cartao = new Cartao();
        cartao.setId(10L);
        cartao.setUsuario(dono);

        AquisicaoRequestDTO request = new AquisicaoRequestDTO(
                BigDecimal.TEN, "Teste", LocalDate.now(), 10L
        );

        when(cartaoRepository.findById(10L)).thenReturn(Optional.of(cartao));

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            aquisicaoService.registrarAquisicao(request, arquivoMock, intruso);
        });

        assertEquals("Usuário não autorizado a usar este cartão", exception.getMessage());

        verify(aquisicaoRepository, never()).save(any());
        verify(fileStorageService, never()).saveFile(any());
    }

    // --- 3. EDGE CASE (Caso de Borda) ---
    @Test
    @DisplayName("Deve aplicar carência padrão de 30 dias quando o programa for nulo")
    void deveAplicarCarenciaPadraoQuandoProgramaForNulo() {
        // Arrange
        Usuario usuario = new Usuario();
        usuario.setId(1L);

        Cartao cartao = new Cartao();
        cartao.setUsuario(usuario);
        cartao.setFatorConversao(1.0);
        cartao.setProgramaPadrao(null);

        AquisicaoRequestDTO request = new AquisicaoRequestDTO(
                new BigDecimal("50.00"),
                "Compra Edge Case",
                LocalDate.of(2023, 1, 1),
                1L
        );

        when(cartaoRepository.findById(1L)).thenReturn(Optional.of(cartao));
        when(fileStorageService.saveFile(any())).thenReturn("path");
        when(aquisicaoRepository.save(any(Aquisicao.class))).thenAnswer(i -> i.getArgument(0));

        // Act
        aquisicaoService.registrarAquisicao(request, arquivoMock, usuario);

        // Assert
        ArgumentCaptor<Aquisicao> captor = ArgumentCaptor.forClass(Aquisicao.class);
        verify(aquisicaoRepository).save(captor.capture());
        Aquisicao aquisicao = captor.getValue();

        LocalDate dataEsperada = LocalDate.of(2023, 1, 31);

        assertEquals(dataEsperada, aquisicao.getDataPrevista());
    }
}