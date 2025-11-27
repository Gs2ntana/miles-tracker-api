package com.web.project.service;
import com.web.project.model.Usuario;
import com.web.project.repository.AquisicaoRepository;
import com.web.project.requests.DashboardMediaResponse;
import com.web.project.requests.HistoricoResponse;
import com.web.project.requests.PontosPorCartaoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private AquisicaoRepository aquisicaoRepository;

    // Requisito: "Histórico de acúmulo e uso"
    @Transactional(readOnly = true)
    public List<HistoricoResponse> getHistorico(Usuario usuario) {
        return aquisicaoRepository.findByCartaoUsuarioId(usuario.getId())
                .stream()
                .map(a -> new HistoricoResponse(
                        a.getDataCompra().toLocalDate(),
                        a.getDescricao(),
                        a.getPontosEsperados(),
                        a.getStatusCredito().name()
                ))
                .collect(Collectors.toList());
    }

    // Requisito: "Pontos por cartão"
    @Transactional(readOnly = true)
    public List<PontosPorCartaoResponse> getPontosPorCartao(Usuario usuario) {
        return aquisicaoRepository.sumPontosPorCartao(usuario.getId());
    }

    @Transactional(readOnly = true)
    public DashboardMediaResponse calcularMediaDias(Usuario usuario) {
        Double media = aquisicaoRepository.getMediaDiasParaCredito(usuario.getId());
        // Regra de negócio: se não tem dados, retorna 0.0 para não quebrar o front
        return new DashboardMediaResponse(media == null ? 0.0 : media);
    }
}