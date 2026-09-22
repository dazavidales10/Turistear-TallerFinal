package com.sena.edu.turistear.controller;

import com.sena.edu.turistear.model.estadoReserva;
import com.sena.edu.turistear.model.reserva;
import com.sena.edu.turistear.service.reservaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
public class reservaController {

    private final reservaService service;

    public reservaController(reservaService service) {
        this.service = service;
    }

    @GetMapping
    public List<reserva> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public reserva buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping
    public ResponseEntity<reserva> crear(@Valid @RequestBody reserva reserva) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(reserva));
    }

    @PutMapping("/{id}/estado")
    public reserva actualizarEstado(
            @PathVariable Long id,
            @RequestParam estadoReserva estado) {
        return service.actualizarEstado(id, estado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
