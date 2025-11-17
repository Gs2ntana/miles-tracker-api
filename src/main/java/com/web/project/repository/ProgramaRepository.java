package com.web.project.repository;

import com.web.project.model.Programa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgramaRepository extends JpaRepository<Programa, Long> {
    Programa findByNome(String nome);
}
