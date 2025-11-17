package com.web.project.repository;
import com.web.project.model.UsuarioPrograma;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UsuarioProgramaRepository extends JpaRepository<UsuarioPrograma, Long> {
    List<UsuarioPrograma>  findByUsuarioId(Long usuarioId);

    Optional<UsuarioPrograma> findByUsuarioIdAndProgramaId(Long usuarioId, Long programaId);
}