package com.sena.edu.turistear.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "planes_turisticos")
public class planTuristico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Column(nullable = false)
    private String nombre;

    @NotBlank(message = "El destino es obligatorio")
    @Column(nullable = false)
    private String destino;

    @NotBlank(message = "La descripción es obligatoria")
    @Column(nullable = false, length = 1000)
    private String descripcion;

    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.0", inclusive = true, message = "El precio no puede ser negativo")
    @Column(nullable = false)
    private Double precio;

    @NotBlank(message = "La duración es obligatoria")
    @Column(nullable = false)
    private String duracion;

    @NotNull(message = "La disponibilidad es obligatoria")
    @Min(value = 0, message = "La disponibilidad no puede ser negativa")
    @Column(nullable = false)
    private Integer disponibilidad;

    public planTuristico() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDestino() { return destino; }
    public void setDestino(String destino) { this.destino = destino; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }

    public String getDuracion() { return duracion; }
    public void setDuracion(String duracion) { this.duracion = duracion; }

    public Integer getDisponibilidad() { return disponibilidad; }
    public void setDisponibilidad(Integer disponibilidad) { this.disponibilidad = disponibilidad; }
}
