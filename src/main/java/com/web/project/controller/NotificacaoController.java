package com.web.project.controller;
import java.util.stream.Collectors;
import com.web.project.model.Notificacao;
import com.web.project.model.Usuario;
import com.web.project.repository.NotificacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.web.project.requests.NotificacaoResponse;
import java.util.List;

@RestController
@RequestMapping("/notificacoes")
public class NotificacaoController {

    @Autowired
    private NotificacaoRepository notificacaoRepository;

    @GetMapping
    public ResponseEntity<List<NotificacaoResponse>> getMinhasNotificacoes(@AuthenticationPrincipal Usuario usuarioLogado) {
        List<Notificacao> notificacoes = notificacaoRepository.findByUsuarioIdOrderByDataEnvioDesc(usuarioLogado.getId());

        List<NotificacaoResponse> responseDTOs = notificacoes.stream()
                .map(NotificacaoResponse::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(responseDTOs);
    }
}