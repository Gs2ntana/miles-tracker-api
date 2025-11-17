package com.web.project.service;

import com.web.project.model.*;
import com.web.project.repository.AquisicaoRepository;
import com.web.project.repository.NotificacaoRepository;
import com.web.project.enuns.StatusCredito;
import com.web.project.repository.UsuarioProgramaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AlertService {

    private static final Logger log = LoggerFactory.getLogger(AlertService.class);

    @Autowired
    private AquisicaoRepository aquisicaoRepository;

    @Autowired
    private NotificacaoRepository notificacaoRepository; // Crie este

    @Autowired
    private UsuarioProgramaRepository usuarioProgramaRepository;

    // Roda todo dia às 4 da manhã
    @Scheduled(cron = "0 0 4 * * ?")
    @Transactional
    public void verificarPontosAtrasados() {
        log.info("Iniciando verificação de pontos atrasados...");

        List<Aquisicao> atrasadas = aquisicaoRepository.findByStatusCreditoAndDataPrevistaBefore(
                StatusCredito.PENDENTE,
                LocalDate.now()
        );

        for (Aquisicao a : atrasadas) {
            log.warn("Aquisição ID {} está atrasada. Gerando notificação.", a.getId());

            Notificacao notificacao = new Notificacao();
            notificacao.setUsuario(a.getCartao().getUsuario());
            notificacao.setAquisicaoOrigem(a);
            notificacao.setMensagem("Seus pontos da compra '" + a.getDescricao() + "' não foram creditados na data prevista (" + a.getDataPrevista() + ").");
            notificacao.setDataEnvio(LocalDateTime.now());
            notificacao.setLida(false);

            notificacaoRepository.save(notificacao);
        }
        log.info("Verificação concluída. {} notificações geradas.", atrasadas.size());
    }

    // Roda todo dia às 05:00 AM para creditar o que venceu
    @Scheduled(cron = "0 0 5 * * ?")
    @Transactional
    public void processarCreditosAutomaticos() {
        LocalDate hoje = LocalDate.now();

        // Busca pontos que devem cair hoje (ou antes) e que ainda estão PENDENTE
        List<Aquisicao> aCreditar = aquisicaoRepository.findByStatusCreditoAndDataPrevistaBefore(
                StatusCredito.PENDENTE, hoje.plusDays(1));

        for (Aquisicao a : aCreditar) {
            a.setStatusCredito(StatusCredito.CREDITADO);
            aquisicaoRepository.save(a);

            Programa programaDestino = a.getCartao().getProgramaPadrao();

            if (programaDestino != null) {
                Usuario usuario = a.getCartao().getUsuario();

                UsuarioPrograma conta = usuarioProgramaRepository
                        .findByUsuarioIdAndProgramaId(usuario.getId(), programaDestino.getId())
                        .orElseGet(() -> {
                            // Se o usuário ainda não tem vínculo com esse programa, cria agora
                            UsuarioPrograma novaConta = new UsuarioPrograma();
                            novaConta.setUsuario(usuario);
                            novaConta.setPrograma(programaDestino);
                            novaConta.setSaldoAtual(0);
                            return novaConta;
                        });

                conta.setSaldoAtual(conta.getSaldoAtual() + a.getPontosEsperados());
                usuarioProgramaRepository.save(conta);
            }
        }
    }
}