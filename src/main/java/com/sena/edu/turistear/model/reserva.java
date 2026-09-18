package com.sena.edu.turistear.model;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "reserva")
public class reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String usuario;

    @Column(nullable = false)
    private String tipoServicio;

    @Column(nullable = false)
    private Long servicioId;

    @Column(nullable = false)
    private Integer cantidadPersonas;

    @Column (nullable = false)
    private LocalDate fechaReserva;

    @Column(nullable = false)
    private Integer precioTotal;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private estadoReserva estado;

    public reserva() {
    }

    public reserva(Long id, String usuario,String tipoServicio, Long servicioId, Integer cantidadPersonas, LocalDate fechaReserva, Integer precioTotal, estadoReserva estado) {
        this.id = id;
        this.usuario = usuario;
        this.tipoServicio = tipoServicio;
        this.servicioId = servicioId;
        this.cantidadPersonas = cantidadPersonas;
        this.estado = estado;
        this.fechaReserva = fechaReserva;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsuario() { return usuario; }
    public void setUsuario(String usuario) { this.usuario = usuario; }

    public Long getServicioId() { return servicioId; }
    public void setServicioId(Long servicioId) { this.servicioId = servicioId; }

    public Integer getCantidadPersonas() { return cantidadPersonas; }
    public void setCantidadPersonas(Integer cantidadPersonas) { this.cantidadPersonas = cantidadPersonas; }

    public Integer getprecioTotal() { return precioTotal; }
    public void setprecioTotal(Integer precioTotal) { this.precioTotal = precioTotal; }

    public LocalDate getPrioridad() { return fechaReserva; }
    public void setPrioridad(LocalDate fechaReserva) { this.fechaReserva = fechaReserva; }

    public estadoReserva getEstado() { return estado; }
    public void setEstado(estadoReserva estado) { this.estado = estado; }
}
