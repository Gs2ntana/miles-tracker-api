package com.web.project.requests;

import com.web.project.model.Aquisicao;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record AquisicaoResponse(
        Long id,
        LocalDateTime dataCompra,
        BigDecimal valorCompra,
        String descricao,
        Integer pontosEsperados,
        LocalDate dataPrevista,
        String statusCredito,
        String nomeCartao
) {
    public AquisicaoResponse(Aquisicao aquisicao) {
        this(
                aquisicao.getId(),
                aquisicao.getDataCompra(),
                aquisicao.getValorCompra(),
                aquisicao.getDescricao(),
                aquisicao.getPontosEsperados(),
                aquisicao.getDataPrevista(),
                aquisicao.getStatusCredito().name(),
                aquisicao.getCartao().getNome()
        );
    }
}