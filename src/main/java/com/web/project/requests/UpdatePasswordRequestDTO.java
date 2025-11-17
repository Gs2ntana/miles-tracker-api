package com.web.project.requests;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdatePasswordRequestDTO(
        @NotBlank
        String senhaAtual,

        @NotBlank @Size(min = 6)
        String novaSenha
) {}