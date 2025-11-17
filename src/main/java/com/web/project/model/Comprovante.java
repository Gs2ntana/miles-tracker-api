package com.web.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "comprovantes")
public class Comprovante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeOriginal;
    private String tipoArquivo;
    private String pathArquivo;

    @ManyToOne
    @JoinColumn(name = "aquisicao_id", nullable = false)
    private Aquisicao aquisicao;
}
