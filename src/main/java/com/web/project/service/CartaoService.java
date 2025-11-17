package com.web.project.service;

import com.web.project.model.Bandeira;
import com.web.project.model.Cartao;
import com.web.project.model.Programa;
import com.web.project.model.Usuario;
import com.web.project.repository.BandeiraRepository;
import com.web.project.repository.CartaoRepository;
import com.web.project.repository.ProgramaRepository;
import com.web.project.requests.CartaoRequestDTO;
import com.web.project.requests.CartaoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.stream.Collectors;
import java.util.List;

@Service
public class CartaoService {

    @Autowired
    private CartaoRepository cartaoRepository;
    @Autowired
    private BandeiraRepository bandeiraRepository;
    @Autowired
    private ProgramaRepository programaRepository;

    @Transactional
    public CartaoResponse cadastrarCartao(CartaoRequestDTO request, Usuario usuarioLogado) {
        Bandeira bandeira = bandeiraRepository.findById(request.bandeiraId())
                .orElseThrow(() -> new RuntimeException("Bandeira não encontrada"));
        Programa programa = programaRepository.findById(request.programaPadraoId())
                .orElseThrow(() -> new RuntimeException("Programa não encontrado"));

        Cartao novoCartao = new Cartao();
        novoCartao.setNome(request.nome());
        novoCartao.setDigitos(request.digitos());
        novoCartao.setBandeira(bandeira);
        novoCartao.setProgramaPadrao(programa);
        novoCartao.setUsuario(usuarioLogado);

        Cartao cartaoSalvo = cartaoRepository.save(novoCartao);

        return new CartaoResponse(cartaoSalvo);
    }

    @Transactional(readOnly = true)
    public List<CartaoResponse> listarCartoesDoUsuario(Usuario usuarioLogado) {
        List<Cartao> cartoes = cartaoRepository.findByUsuarioId(usuarioLogado.getId());

        return cartoes.stream()
                .map(CartaoResponse::new)
                .collect(Collectors.toList());
    }
}