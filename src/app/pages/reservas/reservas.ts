import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReservasService } from '../../services/reservas';
import {
  Reserva,
  EstadoReserva
} from '../../models/turistear.models';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservas.html',
  styleUrl: './reservas.css'
})
export class Reservas implements OnInit {
  private reservasService = inject(ReservasService);
  private cdr = inject(ChangeDetectorRef);

  reservas: Reserva[] = [];
  nuevaReserva: Reserva = this.reservaVacia();

  editando = false;
  idEditando: number | null = null;
  cargando = true;
  guardando = false;

  mensaje = '';
  tipoMensaje: 'success' | 'danger' = 'success';

  estados: EstadoReserva[] = [
    'PENDIENTE',
    'CONFIRMADA',
    'CANCELADA'
  ];

  ngOnInit(): void {
    this.cargarReservas();
  }

  reservaVacia(): Reserva {
    return {
      usuario: '',
      tipoServicio: 'PLAN',
      servicioId: 0,
      cantidadPersonas: 1,
      fechaReserva: ''
    };
  }

  cargarReservas(): void {
    this.cargando = true;

    this.reservasService.listar().subscribe({
      next: respuesta => {
        this.reservas = respuesta;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Error al cargar reservas:', error);
        this.cargando = false;

        this.mostrarMensaje(
          'No fue posible cargar las reservas.',
          'danger'
        );

        this.cdr.detectChanges();
      }
    });
  }

  guardarReserva(): void {
    if (!this.validarFormulario() || this.guardando) return;

    this.guardando = true;

    const datos: Reserva = {
      usuario: this.nuevaReserva.usuario.trim(),
      tipoServicio: this.nuevaReserva.tipoServicio,
      servicioId: Number(this.nuevaReserva.servicioId),
      cantidadPersonas: Number(
        this.nuevaReserva.cantidadPersonas
      ),
      fechaReserva: this.nuevaReserva.fechaReserva
    };

    if (
      this.editando &&
      this.idEditando !== null
    ) {
      this.reservasService
        .actualizar(this.idEditando, datos)
        .subscribe({
          next: respuesta => {
            const posicion =
              this.reservas.findIndex(
                reserva =>
                  reserva.id === this.idEditando
              );

            if (posicion !== -1) {
              this.reservas[posicion] = respuesta;
            }

            this.guardando = false;
            this.cancelarEdicion();

            this.mostrarMensaje(
              'Reserva actualizada correctamente.',
              'success'
            );

            this.cdr.detectChanges();
          },
          error: error => {
            console.error(
              'Error al actualizar reserva:',
              error
            );

            this.guardando = false;

            this.mostrarMensaje(
              'No fue posible actualizar la reserva.',
              'danger'
            );

            this.cdr.detectChanges();
          }
        });

      return;
    }

    this.reservasService.crear(datos).subscribe({
      next: respuesta => {
        this.reservas.push(respuesta);

        this.guardando = false;
        this.nuevaReserva = this.reservaVacia();

        this.mostrarMensaje(
          'Reserva creada correctamente.',
          'success'
        );

        this.cdr.detectChanges();
      },
      error: error => {
        console.error(
          'Error al crear reserva:',
          error
        );

        this.guardando = false;

        this.mostrarMensaje('No fue posible cargar las reservas. Comprueba que el servidor esté disponible', 'danger');

        this.cdr.detectChanges();
      }
    });
  }

  editarReserva(reserva: Reserva): void {
    if (reserva.id === undefined) return;

    this.editando = true;
    this.idEditando = reserva.id;
    this.nuevaReserva = {
      ...reserva
    };

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  cambiarEstado(
    id: number | undefined,
    estado: EstadoReserva
  ): void {
    if (id === undefined) return;

    this.reservasService
      .cambiarEstado(id, estado)
      .subscribe({
        next: respuesta => {
          const posicion =
            this.reservas.findIndex(
              reserva => reserva.id === id
            );

          if (posicion !== -1) {
            this.reservas[posicion] = respuesta;
          }

          this.mostrarMensaje(
            'Estado actualizado correctamente.',
            'success'
          );

          this.cdr.detectChanges();
        },
        error: error => {
          console.error(
            'Error al cambiar estado:',
            error
          );

          this.mostrarMensaje(
            'No fue posible actualizar el estado.',
            'danger'
          );

          this.cdr.detectChanges();
        }
      });
  }

  eliminarReserva(
    id: number | undefined
  ): void {
    if (id === undefined) return;

    if (
      !window.confirm(
        '¿Deseas eliminar esta reserva?'
      )
    ) {
      return;
    }

    this.reservasService
      .eliminar(id)
      .subscribe({
        next: () => {
          this.reservas =
            this.reservas.filter(
              reserva => reserva.id !== id
            );

          this.mostrarMensaje(
            'Reserva eliminada correctamente.',
            'success'
          );

          this.cdr.detectChanges();
        },
        error: error => {
          console.error(
            'Error al eliminar reserva:',
            error
          );

          this.mostrarMensaje(
            'No fue posible eliminar la reserva.',
            'danger'
          );

          this.cdr.detectChanges();
        }
      });
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.idEditando = null;
    this.nuevaReserva = this.reservaVacia();
  }

  validarFormulario(): boolean {
    if (
      !this.nuevaReserva.usuario.trim() ||
      !this.nuevaReserva.fechaReserva
    ) {
      this.mostrarMensaje(
        'Completa el usuario y la fecha.',
        'danger'
      );

      return false;
    }

    if (
      this.nuevaReserva.servicioId <= 0 ||
      this.nuevaReserva.cantidadPersonas <= 0
    ) {
      this.mostrarMensaje(
        'El servicio y la cantidad de personas deben ser mayores que cero.',
        'danger'
      );

      return false;
    }

    return true;
  }

  mostrarMensaje(
    texto: string,
    tipo: 'success' | 'danger'
  ): void {
    this.mensaje = texto;
    this.tipoMensaje = tipo;

    setTimeout(() => {
      this.mensaje = '';
      this.cdr.detectChanges();
    }, 4000);
  }
}
