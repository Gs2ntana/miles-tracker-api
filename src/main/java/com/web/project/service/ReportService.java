package com.web.project.service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.web.project.model.Usuario;
import com.web.project.requests.HistoricoResponse;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@Service
public class ReportService {

    @Autowired
    private DashboardService dashboardService;

    // --- LÓGICA CSV ---
    public void writeHistoricoToCsv(PrintWriter writer, Usuario usuario) {
        List<HistoricoResponse> historico = dashboardService.getHistorico(usuario);

        try (CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
                .withHeader("Data", "Descricao", "Pontos", "Status"))) {
            for (HistoricoResponse item : historico) {
                csvPrinter.printRecord(item.data(), item.descricao(), item.pontos(), item.status());
            }
        } catch (IOException e) {
            throw new RuntimeException("Erro ao gerar CSV", e);
        }
    }

    public byte[] generateHistoricoPdf(Usuario usuario) {
        List<HistoricoResponse> historico = dashboardService.getHistorico(usuario);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter pdfWriter = new PdfWriter(baos);
        PdfDocument pdfDoc = new PdfDocument(pdfWriter);
        Document document = new Document(pdfDoc);

        document.add(new Paragraph("Relatório de Histórico de Pontos"));

        Table table = new Table(new float[]{3, 5, 2, 2});
        table.addHeaderCell(new Cell().add(new Paragraph("Data")));
        table.addHeaderCell(new Cell().add(new Paragraph("Descrição")));
        table.addHeaderCell(new Cell().add(new Paragraph("Pontos")));
        table.addHeaderCell(new Cell().add(new Paragraph("Status")));

        for (HistoricoResponse item : historico) {
            table.addCell(item.data().toString());
            table.addCell(item.descricao());
            table.addCell(item.pontos().toString());
            table.addCell(item.status());
        }

        document.add(table);
        document.close();

        return baos.toByteArray();
    }
}