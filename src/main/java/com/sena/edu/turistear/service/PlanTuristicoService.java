package com.sena.edu.turistear.service;

import com.sena.edu.turistear.excepcion.ReglaNegocioException;
import com.sena.edu.turistear.excepcion.RecursoNoEncontradoException;
import com.sena.edu.turistear.model.planTuristico;
import com.sena.edu.turistear.repository.PlanTuristicoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanTuristicoService {

    private final PlanTuristicoRepository repository;

    public PlanTuristicoService(PlanTuristicoRepository repository) {
        this.repository = repository;
    }

    public List<planTuristico> listar() {
        return repository.findAll();
    }

    public planTuristico buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException(
                        "El plan turístico con id " + id + " no existe."));
    }

    public planTuristico crear(planTuristico plan) {
        if (repository.findByNombreIgnoreCase(plan.getNombre()).isPresent()) {
            throw new ReglaNegocioException("Ya existe un plan turístico con ese nombre.");
        }
        return repository.save(plan);
    }

    public planTuristico actualizar(Long id, planTuristico datos) {
        planTuristico actual = buscar(id);

        if (repository.findByNombreIgnoreCase(datos.getNombre())
                .filter(p -> !p.getId().equals(id)).isPresent()) {
            throw new ReglaNegocioException("Ya existe otro plan con ese nombre.");
        }

        actual.setNombre(datos.getNombre());
        actual.setDestino(datos.getDestino());
        actual.setDescripcion(datos.getDescripcion());
        actual.setPrecio(datos.getPrecio());
        actual.setDuracion(datos.getDuracion());
        actual.setDisponibilidad(datos.getDisponibilidad());

        return repository.save(actual);
    }

    public void eliminar(Long id) {
        buscar(id);
        repository.deleteById(id);
    }
}
