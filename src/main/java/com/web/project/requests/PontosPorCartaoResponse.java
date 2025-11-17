package com.web.project.requests;

public record PontosPorCartaoResponse(
        String nomeCartao,
        String ultimosDigitos,
        Long totalPontos
) {}
