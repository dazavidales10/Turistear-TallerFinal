package com.sena.edu.turistear.service;

import com.sena.edu.turistear.excepcion.ReglaNegocioException;
import com.sena.edu.turistear.excepcion.RecursoNoEncontradoException;
import com.sena.edu.turistear.model.estadoReserva;
import com.sena.edu.turistear.model.planTuristico;
import com.sena.edu.turistear.model.reserva;
import com.sena.edu.turistear.model.vuelos;
import com.sena.edu.turistear.repository.PlanTuristicoRepository;
import com.sena.edu.turistear.repository.ReservaRepository;
import com.sena.edu.turistear.repository.vueloRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class reservaService {

    private final ReservaRepository reservaRepository;
    private final PlanTuristicoRepository planRepository;
    private final vueloRepository vueloRepository;

    public reservaService(
            ReservaRepository reservaRepository,
            PlanTuristicoRepository planRepository,
            vueloRepository vueloRepository) {
        this.reservaRepository = reservaRepository;
        this.planRepository = planRepository;
        this.vueloRepository = vueloRepository;
    }

    public List<reserva> listar() {
        return reservaRepository.findAll();
    }

    public reserva buscar(Long id) {
        return reservaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException(
                        "La reserva con id " + id + " no existe."));
    }

    public reserva crear(reserva reserva) {
        if (reserva.getCantidadPersonas() <= 0) {
            throw new ReglaNegocioException("La cantidad de personas debe ser mayor que cero.");
        }

        double precioUnitario;

        if ("PLAN".equalsIgnoreCase(reserva.getTipoServicio())) {
            planTuristico plan = planRepository.findById(reserva.getServicioId())
                    .orElseThrow(() -> new RecursoNoEncontradoException(
                            "El plan turístico indicado no existe."));

            if (plan.getDisponibilidad() < reserva.getCantidadPersonas()) {
                throw new ReglaNegocioException("No hay disponibilidad suficiente para el plan turístico.");
            }

            plan.setDisponibilidad(plan.getDisponibilidad() - reserva.getCantidadPersonas());
            planRepository.save(plan);
            precioUnitario = plan.getPrecio();

        } else if ("VUELO".equalsIgnoreCase(reserva.getTipoServicio())) {
            vuelos vuelo = vueloRepository.findById(reserva.getServicioId())
                    .orElseThrow(() -> new RecursoNoEncontradoException(
                            "El vuelo indicado no existe."));

            if (vuelo.getCuposDisponibles() < reserva.getCantidadPersonas()) {
                throw new ReglaNegocioException("No hay cupos suficientes para el vuelo.");
            }

            vuelo.setCuposDisponibles(
                    vuelo.getCuposDisponibles() - reserva.getCantidadPersonas());
            vueloRepository.save(vuelo);
            precioUnitario = vuelo.getPrecio();

        } else {
            throw new ReglaNegocioException(
                    "El tipo de servicio debe ser PLAN o VUELO.");
        }

        reserva.setPrecioTotal(precioUnitario * reserva.getCantidadPersonas());
        reserva.setEstado(estadoReserva.PENDIENTE);

        return reservaRepository.save(reserva);
    }

    public reserva actualizarEstado(Long id, estadoReserva estado) {
        reserva reserva = buscar(id);

        if (reserva.getEstado() == estadoReserva.CANCELADA) {
            throw new ReglaNegocioException("Una reserva cancelada no puede modificarse.");
        }

        reserva.setEstado(estado);
        return reservaRepository.save(reserva);
    }

    public void eliminar(Long id) {
        buscar(id);
        reservaRepository.deleteById(id);
    }
}
