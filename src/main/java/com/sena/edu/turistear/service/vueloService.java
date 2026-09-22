package com.sena.edu.turistear.service;

import com.sena.edu.turistear.excepcion.RecursoNoEncontradoException;
import com.sena.edu.turistear.excepcion.ReglaNegocioException;
import com.sena.edu.turistear.model.vuelos;
import com.sena.edu.turistear.repository.vueloRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class vueloService {

    private final vueloRepository repository;

    public vueloService(vueloRepository repository) {
        this.repository = repository;
    }

    public List<vuelos> listar() {
        return repository.findAll();
    }

    public vuelos buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException(
                        "El vuelo con id " + id + " no existe."));
    }

    public vuelos crear(vuelos vuelo) {
        if (vuelo.getOrigen().equalsIgnoreCase(vuelo.getDestino())) {
            throw new ReglaNegocioException("El origen y el destino del vuelo no pueden ser iguales.");
        }
        return repository.save(vuelo);
    }

    public vuelos actualizar(Long id, vuelos datos) {
        vuelos actual = buscar(id);

        if (datos.getOrigen().equalsIgnoreCase(datos.getDestino())) {
            throw new ReglaNegocioException("El origen y el destino no pueden ser iguales.");
        }

        actual.setOrigen(datos.getOrigen());
        actual.setDestino(datos.getDestino());
        actual.setFechaSalida(datos.getFechaSalida());
        actual.setPrecio(datos.getPrecio());
        actual.setCuposDisponibles(datos.getCuposDisponibles());

        return repository.save(actual);
    }

    public void eliminar(Long id) {
        buscar(id);
        repository.deleteById(id);
    }
}
