package com.web.project.controller;

import com.web.project.model.Usuario;
import com.web.project.requests.CartaoRequestDTO;
import com.web.project.requests.CartaoResponse;
import com.web.project.service.CartaoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cartoes")
public class CartaoController {

    @Autowired
    private CartaoService cartaoService;

    @PostMapping
    public ResponseEntity<CartaoResponse> cadastrarCartao(
            @RequestBody @Valid CartaoRequestDTO request,
            @AuthenticationPrincipal Usuario usuarioLogado) {
        CartaoResponse cartaoSalvo = cartaoService.cadastrarCartao(request, usuarioLogado);
        return ResponseEntity.status(HttpStatus.CREATED).body(cartaoSalvo);
    }

    @GetMapping
    public ResponseEntity<List<CartaoResponse>> listarCartoes(
            @AuthenticationPrincipal Usuario usuarioLogado) {

        // O serviço agora já devolve a lista convertida e segura
        List<CartaoResponse> cartoes = cartaoService.listarCartoesDoUsuario(usuarioLogado);
        return ResponseEntity.ok(cartoes);
    }
}