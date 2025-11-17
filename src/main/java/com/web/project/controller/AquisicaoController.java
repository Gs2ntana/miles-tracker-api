package com.web.project.controller;

import com.web.project.model.Usuario;
import com.web.project.requests.AquisicaoRequestDTO;
import com.web.project.requests.AquisicaoResponse;
import com.web.project.service.AquisicaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;

@RestController
@RequestMapping("/aquisicoes")
public class AquisicaoController {

    @Autowired
    private AquisicaoService aquisicaoService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AquisicaoResponse> registrarAquisicao(
            @RequestParam("valorCompra") BigDecimal valorCompra,
            @RequestParam("descricao") String descricao,
            @RequestParam("dataCompra") LocalDate dataCompra,
            @RequestParam("diasParaCredito") Integer diasParaCredito,
            @RequestParam("cartaoId") Long cartaoId,
            @RequestPart("comprovante") MultipartFile arquivo,
            @AuthenticationPrincipal Usuario usuarioLogado
    ) {
        if (arquivo.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        AquisicaoRequestDTO request = new AquisicaoRequestDTO(valorCompra, descricao, dataCompra, diasParaCredito, cartaoId);

        AquisicaoResponse aquisicaoSalva = aquisicaoService.registrarAquisicao(request, arquivo, usuarioLogado);
        return ResponseEntity.status(HttpStatus.CREATED).body(aquisicaoSalva);
    }
}