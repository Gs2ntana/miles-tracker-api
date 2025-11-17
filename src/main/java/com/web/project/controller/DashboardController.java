package com.web.project.controller;

import com.web.project.model.Usuario;
import com.web.project.requests.DashboardMediaResponse;
import com.web.project.requests.HistoricoResponse;
import com.web.project.requests.PontosPorCartaoResponse;
import com.web.project.service.DashboardService;
import com.web.project.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;
    @Autowired
    private ReportService reportService;

    @GetMapping("/historico")
    public ResponseEntity<List<HistoricoResponse>> getHistorico(
            @AuthenticationPrincipal Usuario usuarioLogado) {
        return ResponseEntity.ok(dashboardService.getHistorico(usuarioLogado));
    }

    @GetMapping("/pontos-por-cartao")
    public ResponseEntity<List<PontosPorCartaoResponse>> getPontosPorCartao(
            @AuthenticationPrincipal Usuario usuarioLogado) {
        return ResponseEntity.ok(dashboardService.getPontosPorCartao(usuarioLogado));
    }

    @GetMapping("/export/csv")
    public void exportHistoricoCsv(
            @AuthenticationPrincipal Usuario usuarioLogado,
            HttpServletResponse response) throws IOException {

        response.setContentType("text/csv");
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"historico.csv\"");

        reportService.writeHistoricoToCsv(response.getWriter(), usuarioLogado);
    }

    @GetMapping("/export/pdf")
    public ResponseEntity<byte[]> exportHistoricoPdf(
            @AuthenticationPrincipal Usuario usuarioLogado) {

        byte[] pdfContents = reportService.generateHistoricoPdf(usuarioLogado);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("filename", "historico.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfContents);
    }

    @GetMapping("/media-dias")
    public ResponseEntity<DashboardMediaResponse> getMediaDias(@AuthenticationPrincipal Usuario user) {
        return ResponseEntity.ok(dashboardService.calcularMediaDias(user));
    }
}