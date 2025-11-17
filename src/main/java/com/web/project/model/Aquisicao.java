package com.web.project.model;

import  com.web.project.enuns.StatusCredito;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "aquisicoes")
public class Aquisicao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataCompra;
    private BigDecimal valorCompra;
    private String descricao;

    private Integer pontosEsperados;
    private LocalDate dataPrevista;

    @Enumerated(EnumType.STRING)
    private StatusCredito statusCredito = StatusCredito.PENDENTE;

    @ManyToOne
    @JoinColumn(name = "cartao_id", nullable = false)
    private Cartao cartao;

    @OneToMany(mappedBy = "aquisicao", cascade = CascadeType.ALL)
    private List<Comprovante> comprovantes;
}
