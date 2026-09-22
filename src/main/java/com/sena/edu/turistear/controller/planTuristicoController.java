package com.sena.edu.turistear.controller;

import com.sena.edu.turistear.model.planTuristico;
import com.sena.edu.turistear.service.PlanTuristicoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planes")
public class planTuristicoController {

    private final PlanTuristicoService service;

    public planTuristicoController(PlanTuristicoService service) {
        this.service = service;
    }

    @GetMapping
    public List<planTuristico> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public planTuristico buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping
    public ResponseEntity<planTuristico> crear(@Valid @RequestBody planTuristico plan) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(plan));
    }

    @PutMapping("/{id}")
    public planTuristico actualizar(
            @PathVariable Long id,
            @Valid @RequestBody planTuristico plan) {
        return service.actualizar(id, plan);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        System.out.println("Reserva eliminada correctamente");
        return ResponseEntity.noContent().build();
    }
}
