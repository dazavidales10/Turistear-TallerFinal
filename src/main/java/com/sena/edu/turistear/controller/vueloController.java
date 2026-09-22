package com.sena.edu.turistear.controller;

import com.sena.edu.turistear.model.vuelos;
import com.sena.edu.turistear.service.vueloService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vuelos")
public class vueloController {

    private final vueloService service;

    public vueloController(vueloService service) {
        this.service = service;
    }

    @GetMapping
    public List<vuelos> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public vuelos buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping
    public ResponseEntity<vuelos> crear(@Valid @RequestBody vuelos vuelo) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(vuelo));
    }

    @PutMapping("/{id}")
    public vuelos actualizar(@PathVariable Long id, @Valid @RequestBody vuelos vuelo) {
        return service.actualizar(id, vuelo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
