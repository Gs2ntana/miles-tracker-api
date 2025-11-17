package com.web.project.repository;
import com.web.project.model.Bandeira;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BandeiraRepository extends JpaRepository<Bandeira, Long> {
    Optional<Bandeira> findByNome(String nome);
}