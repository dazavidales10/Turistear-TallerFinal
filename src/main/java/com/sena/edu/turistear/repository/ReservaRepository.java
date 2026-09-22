package com.sena.edu.turistear.repository;

import com.sena.edu.turistear.model.reserva;
import com.sena.edu.turistear.model.estadoReserva;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservaRepository extends JpaRepository<reserva, Long> {
    List<reserva> findByEstado(estadoReserva estado);
}
