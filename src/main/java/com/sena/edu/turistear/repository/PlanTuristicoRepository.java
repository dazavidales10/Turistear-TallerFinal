package com.sena.edu.turistear.repository;

import com.sena.edu.turistear.model.planTuristico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlanTuristicoRepository extends JpaRepository<planTuristico, Long> {
    Optional<planTuristico> findByNombreIgnoreCase(String nombre);
}
