package com.web.project.requests;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

public record AquisicaoRequestDTO(
        @NotNull
        @DecimalMin(value = "0.01", message = "O valor da compra deve ser positivo")
        BigDecimal valorCompra,

        @NotBlank
        String descricao,

        @NotNull
        LocalDate dataCompra,

        @NotNull
        Integer diasParaCredito,

        @NotNull
        Long cartaoId
) {}