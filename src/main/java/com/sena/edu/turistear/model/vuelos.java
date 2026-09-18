package com.sena.edu.turistear.model;


import java.time.LocalDate;

// Creacion de tabla
import jakarta.persistence.*;

@Entity
@Table(name = "vuelos")
public class vuelos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String origen;

    @Column (nullable = false)
    private String destino;
    
    @Column (nullable = false)
    private LocalDate fechaSalida;

    @Column(nullable = false)
    private Double precio;

    @Column(nullable = false)
    private Integer cuposDisponibles;


    public vuelos() {
    }

    public vuelos(Long id, String origen, Double precio, String destino, LocalDate fechaSalida, Integer cuposDisponibles) {
        this.id = id;
        this.origen = origen;
        this.destino = destino;
        this.fechaSalida = fechaSalida;
        this.precio = precio;
        this.cuposDisponibles = cuposDisponibles;
        
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getOrigen() { return origen; }
    public void setOrigen(String origen) { this.origen = origen; }

    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }

    public String getDestino() { return destino; }
    public void setStock(String destino) { this.destino = destino; }

    public LocalDate getFechaSalida() { return fechaSalida; }
    public void setFechasalida(LocalDate fechaSalida) { this.fechaSalida = fechaSalida; }
    
    public Integer cuposDisponibles() { return cuposDisponibles; }
    public void setCuposDisponibles(Integer cuposDisponibles) { this.cuposDisponibles = cuposDisponibles; }

}




