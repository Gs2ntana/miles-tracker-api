package com.web.project.requests;
import com.web.project.model.Notificacao;
import java.time.LocalDateTime;

public record NotificacaoResponse(
        Long id,
        String mensagem,
        LocalDateTime dataEnvio,
        boolean lida,
        Long aquisicaoId,
        String aquisicaoDescricao
) {
    // Construtor "Mapper"
    public NotificacaoResponse(Notificacao notificacao) {
        this(
                notificacao.getId(),
                notificacao.getMensagem(),
                notificacao.getDataEnvio(),
                notificacao.isLida(),
                notificacao.getAquisicaoOrigem() != null ? notificacao.getAquisicaoOrigem().getId() : null,
                notificacao.getAquisicaoOrigem() != null ? notificacao.getAquisicaoOrigem().getDescricao() : null
        );
    }
}