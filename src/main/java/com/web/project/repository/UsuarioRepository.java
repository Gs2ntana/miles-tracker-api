package com.web.project.repository;

import com.web.project.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    UserDetails findByEmail(String email);
    Optional<Usuario> findByTokenRecuperacao(String token);
    Optional<Usuario> findUsuarioByEmail(String email);
}