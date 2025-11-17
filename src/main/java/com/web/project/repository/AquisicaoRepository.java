package com.web.project.repository;

import com.web.project.enuns.StatusCredito;
import com.web.project.model.Aquisicao;
import com.web.project.requests.PontosPorCartaoResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface AquisicaoRepository extends JpaRepository<Aquisicao, Long> {
    List<Aquisicao> findByCartaoUsuarioId(Long usuarioId);

    @Query("SELECT new com.web.project.requests.PontosPorCartaoResponse(a.cartao.nome, a.cartao.digitos, SUM(a.pontosEsperados)) " +
            "FROM Aquisicao a " +
            "WHERE a.cartao.usuario.id = :usuarioId " +
            "GROUP BY a.cartao.nome, a.cartao.digitos")
    List<PontosPorCartaoResponse> sumPontosPorCartao(@Param("usuarioId") Long usuarioId);

    List<Aquisicao> findByStatusCreditoAndDataPrevistaBefore(StatusCredito status, LocalDate hoje);

    @Query(value = "SELECT AVG(CAST(a.data_prevista AS DATE) - CAST(a.data_compra AS DATE)) " +
            "FROM aquisicoes a " +
            "WHERE a.cartao_id IN (SELECT c.id FROM cartoes c WHERE c.usuario_id = :usuarioId)",
            nativeQuery = true)
    Double getMediaDiasParaCredito(@Param("usuarioId") Long usuarioId);
}