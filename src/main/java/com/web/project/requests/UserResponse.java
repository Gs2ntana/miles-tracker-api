package com.web.project.requests;

import com.web.project.model.Usuario;

public record UserResponse(
        Long id,
        String nome,
        String email
) {
    public UserResponse(Usuario usuario) {
        this(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail()
        );
    }
}