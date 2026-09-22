package com.sena.edu.turistear.controller;

import com.sena.edu.turistear.external.climaService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clima")
public class climaController {

    private final climaService service;

    public climaController(climaService service) {
        this.service = service;
    }

    @GetMapping
    public String consultar(
            @RequestParam double latitud,
            @RequestParam double longitud) {

        return service.consultar(latitud, longitud);
    }
}