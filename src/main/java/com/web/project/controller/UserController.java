package com.web.project.controller;

import com.web.project.model.Usuario;
import com.web.project.requests.UpdatePasswordRequestDTO;
import com.web.project.requests.UpdateUserRequestDTO;
import com.web.project.requests.UserResponse;
import com.web.project.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuario")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint para o usuário pegar seus próprios dados
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMe(@AuthenticationPrincipal Usuario usuarioLogado) {
        // Usa um DTO de resposta para evitar Lazy Loading
        return ResponseEntity.ok(new UserResponse(usuarioLogado));
    }

    // Endpoint para atualizar o nome
    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateUser(
            @AuthenticationPrincipal Usuario usuarioLogado,
            @RequestBody @Valid UpdateUserRequestDTO request) {

        Usuario usuarioAtualizado = userService.updateUser(usuarioLogado, request);
        return ResponseEntity.ok(new UserResponse(usuarioAtualizado));
    }

    // Endpoint para atualizar a senha
    @PutMapping("/me/senha")
    public ResponseEntity<Void> updatePassword(
            @AuthenticationPrincipal Usuario usuarioLogado,
            @RequestBody @Valid UpdatePasswordRequestDTO request) {

        userService.updatePassword(usuarioLogado, request);
        return ResponseEntity.noContent().build();
    }
}