import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { PlanesService } from '../../services/planes';
import { VuelosService } from '../../services/vuelos';
import { ReservasService } from '../../services/reservas';

import {
  PlanTuristico,
  Vuelo,
  Reserva
} from '../../models/turistear.models';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {
  private planesService = inject(PlanesService);
  private vuelosService = inject(VuelosService);
  private reservasService = inject(ReservasService);
  private cdr = inject(ChangeDetectorRef);

  planes: PlanTuristico[] = [];
  vuelos: Vuelo[] = [];
  reservas: Reserva[] = [];

  cargando = true;
  mensaje = '';

  ngOnInit(): void {
    this.cargarDatos();
  }

  get reservasPendientes(): number {
    return this.reservas.filter(
      reserva =>
        !reserva.estado ||
        reserva.estado === 'PENDIENTE'
    ).length;
  }

  get planesDisponibles(): number {
    return this.planes.filter(
      plan => plan.disponibilidad > 0
    ).length;
  }

  get cuposVuelos(): number {
    return this.vuelos.reduce(
      (total, vuelo) =>
        total + vuelo.cuposDisponibles,
      0
    );
  }

  cargarDatos(): void {
    this.cargando = true;
    this.mensaje = '';

    let terminados = 0;

    const terminar = () => {
      terminados++;

      if (terminados === 3) {
        this.cargando = false;
        this.cdr.detectChanges();
      }
    };

    this.planesService.listar().subscribe({
      next: datos => {
        this.planes = datos;
        terminar();
      },
      error: error => {
        console.error(
          'Error al cargar planes:',
          error
        );

        this.mensaje =
          'No fue posible cargar los planes.';

        terminar();
      }
    });

    this.vuelosService.listar().subscribe({
      next: datos => {
        this.vuelos = datos;
        terminar();
      },
      error: error => {
        console.error(
          'Error al cargar vuelos:',
          error
        );

        this.mensaje =
          'No fue posible cargar los vuelos.';

        terminar();
      }
    });

    this.reservasService.listar().subscribe({
      next: datos => {
        this.reservas = datos;
        terminar();
      },
      error: error => {
        console.error(
          'Error al cargar reservas:',
          error
        );

        this.mensaje =
          'No fue posible cargar las reservas.';

        terminar();
      }
    });
  }
}
