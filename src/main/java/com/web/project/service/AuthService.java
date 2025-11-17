package com.web.project.service;

import com.web.project.model.Usuario;
import com.web.project.repository.UsuarioRepository;
import com.web.project.requests.RegisterRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.web.project.requests.ResetPasswordRequestDTO;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerUser(RegisterRequestDTO request) {
        if (usuarioRepository.findByEmail(request.email()) != null) {
            throw new RuntimeException("E-mail já cadastrado");
        }

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(request.nome());
        novoUsuario.setEmail(request.email());
        novoUsuario.setSenha(passwordEncoder.encode(request.senha()));

        usuarioRepository.save(novoUsuario);
    }

    @Transactional
    public void forgotPassword(String email) {
        Usuario usuario = usuarioRepository.findUsuarioByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        String token = UUID.randomUUID().toString();
        usuario.setTokenRecuperacao(token);
        usuario.setDataToken(LocalDateTime.now().plusHours(1)); // Token válido por 1 hora

        usuarioRepository.save(usuario);

        System.out.println("---- SIMULAÇÃO DE E-MAIL ----");
        System.out.println("Token de recuperação para " + email + ": " + token);
        System.out.println("-----------------------------");
    }

    @Transactional
    public void resetPassword(ResetPasswordRequestDTO request) {
        Usuario usuario = usuarioRepository.findByTokenRecuperacao(request.token())
                .orElseThrow(() -> new RuntimeException("Token inválido ou expirado"));

        if (usuario.getDataToken().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expirado");
        }

        usuario.setSenha(passwordEncoder.encode(request.novaSenha()));
        usuario.setTokenRecuperacao(null);
        usuario.setDataToken(null);

        usuarioRepository.save(usuario);
    }
}
