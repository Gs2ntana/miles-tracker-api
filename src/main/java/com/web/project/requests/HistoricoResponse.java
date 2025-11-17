package com.web.project.requests;

public record HistoricoResponse(
        java.time.LocalDate data,
        String descricao,
        Integer pontos,
        String status
) {}