package com.sena.edu.turistear.model;


// Creacion de tabla
import jakarta.persistence.*;

@Entity
@Table(name = "planesTuristicos")
public class planesTuristicos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column (nullable = false)
    private String destino;
    
    @Column (nullable = false)
    private String descripcion;

    @Column(nullable = false)
    private Double precio;

    @Column(nullable = false)
    private String duracion;

    @Column(nullable = false)
    private String disponibilidad;

    public planesTuristicos() {
    }

    public planesTuristicos(Long id, String nombre, Double precio, String destino, String descripcion, String duracion, String disponibilidad) {
        this.id = id;
        this.nombre = nombre;
        this.destino = destino;
        this.descripcion = descripcion;
        this.precio = precio;
        this.duracion = duracion;
        this.disponibilidad = disponibilidad;
        
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }

    public String getDestino() { return destino; }
    public void setStock(String destino) { this.destino = destino; }

    public String getDescripcion() { return descripcion; }
    public void setCategoria(String descripcion) { this.descripcion = descripcion; }
    
    public String getDuracion() { return duracion; }
    public void setDuracion(String duracion) { this.duracion = duracion; }
    
    public String getDisponibilidad() { return duracion; }
    public void setDisponibilidad(String disponibilidad) { this.disponibilidad = disponibilidad; }


}




