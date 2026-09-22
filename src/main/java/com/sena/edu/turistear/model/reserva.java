package com.sena.edu.turistear.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "reservas")
public class reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El usuario es obligatorio")
    @Column(nullable = false)
    private String usuario;

    @NotBlank(message = "El tipo de servicio es obligatorio")
    @Column(nullable = false)
    private String tipoServicio;

    @NotNull(message = "El servicio es obligatorio")
    @Column(nullable = false)
    private Long servicioId;

    @NotNull(message = "La cantidad de personas es obligatoria")
    @Min(value = 1, message = "Debe existir al menos una persona")
    @Column(nullable = false)
    private Integer cantidadPersonas;

    @NotNull(message = "La fecha de reserva es obligatoria")
    @FutureOrPresent(message = "La fecha de reserva no puede estar en el pasado")
    @Column(nullable = false)
    private LocalDate fechaReserva;

    @Column(nullable = false)
    private Double precioTotal;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private estadoReserva estado;

    public reserva() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsuario() { return usuario; }
    public void setUsuario(String usuario) { this.usuario = usuario; }

    public String getTipoServicio() { return tipoServicio; }
    public void setTipoServicio(String tipoServicio) { this.tipoServicio = tipoServicio; }

    public Long getServicioId() { return servicioId; }
    public void setServicioId(Long servicioId) { this.servicioId = servicioId; }

    public Integer getCantidadPersonas() { return cantidadPersonas; }
    public void setCantidadPersonas(Integer cantidadPersonas) { this.cantidadPersonas = cantidadPersonas; }

    public LocalDate getFechaReserva() { return fechaReserva; }
    public void setFechaReserva(LocalDate fechaReserva) { this.fechaReserva = fechaReserva; }

    public Double getPrecioTotal() { return precioTotal; }
    public void setPrecioTotal(Double precioTotal) { this.precioTotal = precioTotal; }

    public estadoReserva getEstado() { return estado; }
    public void setEstado(estadoReserva estado) { this.estado = estado; }
}
