package com.web.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "resgates")
public class Resgate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataResgate;
    private String descricao;
    private Integer pontosResgatados;

    @ManyToOne
    @JoinColumn(name = "usuario_programa_id", nullable = false)
    private UsuarioPrograma contaOrigem;
}