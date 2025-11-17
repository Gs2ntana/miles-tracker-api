package com.web.project.requests;

import jakarta.validation.constraints.NotBlank;

public record UpdateUserRequestDTO(
        @NotBlank
        String nome
) {}
