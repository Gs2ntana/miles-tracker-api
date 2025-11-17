package com.web.project.service;

import com.web.project.model.Usuario;
import com.web.project.repository.UsuarioRepository;
import com.web.project.requests.UpdatePasswordRequestDTO;
import com.web.project.requests.UpdateUserRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public Usuario updateUser(Usuario usuarioLogado, UpdateUserRequestDTO request) {
        usuarioLogado.setNome(request.nome());
        return usuarioLogado;
    }

    @Transactional
    public void updatePassword(Usuario usuarioLogado, UpdatePasswordRequestDTO request) {
        if (!passwordEncoder.matches(request.senhaAtual(), usuarioLogado.getPassword())) {
            throw new RuntimeException("A senha atual está incorreta.");
        }

        usuarioLogado.setSenha(passwordEncoder.encode(request.novaSenha()));
    }
}