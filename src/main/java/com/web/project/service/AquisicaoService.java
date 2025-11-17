package com.web.project.service;
import com.web.project.model.*;
import com.web.project.repository.AquisicaoRepository;
import com.web.project.repository.CartaoRepository;
import com.web.project.repository.ComprovanteRepository;
import com.web.project.requests.AquisicaoRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import com.web.project.enuns.StatusCredito;
import java.math.BigDecimal;
import java.time.LocalDate;
import com.web.project.requests.AquisicaoResponse;

@Service
public class AquisicaoService {

    @Autowired
    private AquisicaoRepository aquisicaoRepository;
    @Autowired
    private CartaoRepository cartaoRepository;
    @Autowired
    private ComprovanteRepository comprovanteRepository;
    @Autowired
    private FileStorageService fileStorageService;

    @Transactional
    public AquisicaoResponse registrarAquisicao(AquisicaoRequestDTO request, MultipartFile arquivo, Usuario usuario) {
        Cartao cartao = cartaoRepository.findById(request.cartaoId())
                .orElseThrow(() -> new RuntimeException("Cartão não encontrado"));
        if (!cartao.getUsuario().getId().equals(usuario.getId())) {
            throw new RuntimeException("Usuário não autorizado a usar este cartão"); // Ou 403 Forbidden
        }

        String pathArquivo = fileStorageService.saveFile(arquivo);

        int pontos = calcularPontos(request.valorCompra(), cartao.getFatorConversao());
        LocalDate dataPrevista = request.dataCompra().plusDays(request.diasParaCredito());

        Aquisicao aquisicao = new Aquisicao();
        aquisicao.setValorCompra(request.valorCompra());
        aquisicao.setDescricao(request.descricao());
        aquisicao.setDataCompra(request.dataCompra().atStartOfDay());
        aquisicao.setCartao(cartao);
        aquisicao.setPontosEsperados(pontos);
        aquisicao.setDataPrevista(dataPrevista);
        aquisicao.setStatusCredito(StatusCredito.PENDENTE);

        Aquisicao aquisicaoSalva = aquisicaoRepository.save(aquisicao);

        Comprovante comprovante = new Comprovante();
        comprovante.setNomeOriginal(arquivo.getOriginalFilename());
        comprovante.setTipoArquivo(arquivo.getContentType());
        comprovante.setPathArquivo(pathArquivo);
        comprovante.setAquisicao(aquisicaoSalva);

        comprovanteRepository.save(comprovante);

        return new AquisicaoResponse(aquisicaoSalva);
    }

    private int calcularPontos(BigDecimal valor, Double fator) {
        return valor.multiply(BigDecimal.valueOf(fator)).intValue();
    }
}