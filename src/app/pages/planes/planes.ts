import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlanesService } from '../../services/planes';
import { PlanTuristico } from '../../models/turistear.models';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './planes.html',
  styleUrl: './planes.css'
})
export class Planes implements OnInit {

  private planesService = inject(PlanesService);

  // Lista de planes que vienen desde Spring Boot
  planes: PlanTuristico[] = [];

  // Objeto utilizado para el formulario
  nuevoPlan: PlanTuristico = {
    nombre: '',
    destino: '',
    descripcion: '',
    precio: 0,
    duracion: '',
    disponibilidad: 0
  };

  // Mensaje que mostraremos al usuario
  mensaje: string = '';

  // Indica si el mensaje es de éxito o error
  tipoMensaje: 'success' | 'danger' = 'success';

  ngOnInit(): void {
    this.cargarPlanes();
  }

  /**
   * Obtiene todos los planes desde Spring Boot.
   */
  cargarPlanes(): void {

    this.planesService.listar().subscribe({

      next: (respuesta: PlanTuristico[]) => {

        this.planes = respuesta;

        console.log('Planes recibidos:', respuesta);

      },

      error: (error: unknown) => {

        console.error(
          'Error al cargar los planes:',
          error
        );

        this.mostrarMensaje(
          'No fue posible cargar los planes. Verifica que Spring Boot esté ejecutándose.',
          'danger'
        );

      }

    });

  }

  /**
   * Crea un nuevo plan mediante POST.
   */
  crearPlan(): void {

    // Validación básica
    if (
      !this.nuevoPlan.nombre.trim() ||
      !this.nuevoPlan.destino.trim() ||
      !this.nuevoPlan.descripcion.trim() ||
      !this.nuevoPlan.duracion.trim()
    ) {

      this.mostrarMensaje(
        'Completa todos los campos del formulario.',
        'danger'
      );

      return;
    }

    // Validar precio
    if (this.nuevoPlan.precio < 0) {

      this.mostrarMensaje(
        'El precio no puede ser negativo.',
        'danger'
      );

      return;
    }

    // Validar disponibilidad
    if (this.nuevoPlan.disponibilidad < 0) {

      this.mostrarMensaje(
        'La disponibilidad no puede ser negativa.',
        'danger'
      );

      return;
    }

    this.planesService.crear(this.nuevoPlan).subscribe({

      next: (respuesta: PlanTuristico) => {

        console.log('Plan creado:', respuesta);

        // Agregamos el nuevo plan a la lista
        this.planes.push(respuesta);

        this.mostrarMensaje(
          'Plan creado correctamente.',
          'success'
        );

        // Limpiamos el formulario
        this.limpiarFormulario();

      },

      error: (error: unknown) => {

        console.error(
          'Error al crear el plan:',
          error
        );

        this.mostrarMensaje(
          'No fue posible crear el plan.',
          'danger'
        );

      }

    });

  }

  /**
   * Limpia los campos del formulario.
   */
  limpiarFormulario(): void {

    this.nuevoPlan = {
      nombre: '',
      destino: '',
      descripcion: '',
      precio: 0,
      duracion: '',
      disponibilidad: 0
    };

  }

  /**
   * Muestra un mensaje al usuario.
   */
  mostrarMensaje(
    texto: string,
    tipo: 'success' | 'danger'
  ): void {

    this.mensaje = texto;
    this.tipoMensaje = tipo;

    setTimeout(() => {
      this.mensaje = '';
    }, 4000);

  }

}
