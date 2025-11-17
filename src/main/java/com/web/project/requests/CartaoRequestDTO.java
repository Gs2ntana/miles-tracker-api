package com.web.project.requests;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CartaoRequestDTO(
        @NotBlank
        String nome,

        @NotBlank @Size(min = 4, max = 4)
        String digitos,

        @NotNull
        Long bandeiraId, // ID da bandeira (ex: Visa, Master)

        @NotNull
        Long programaPadraoId // ID do programa (ex: Smiles)
) {
}
