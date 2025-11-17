package com.web.project.requests;
import com.web.project.model.Cartao;

public record CartaoResponse(
        Long id,
        String nome,
        String digitos,
        String nomeBandeira,
        String nomePrograma
) {
    // Construtor "Mapper"
    public CartaoResponse(Cartao cartao) {
        this(
                cartao.getId(),
                cartao.getNome(),
                cartao.getDigitos(),
                cartao.getBandeira().getNome(),
                cartao.getProgramaPadrao().getNome()
        );
    }
}