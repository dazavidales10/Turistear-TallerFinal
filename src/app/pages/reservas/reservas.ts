import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReservasService } from '../../services/reservas';
import { Reserva, EstadoReserva } from '../../models/turistear.models';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservas.html',
  styleUrl: './reservas.css'
})
export class Reservas implements OnInit {
  private reservasService = inject(ReservasService);

  reservas: Reserva[] = [];
  nuevaReserva: Reserva = this.reservaVacia();

  editando = false;
  idEditando: number | null = null;

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
      fechaReserva: '',
      estado: 'PENDIENTE'
    };
  }

  cargarReservas(): void {
    this.reservasService.listar().subscribe({
      next: (respuesta: Reserva[]) => {
        this.reservas = respuesta;
      },
      error: (error: unknown) => {
        console.error('Error al cargar reservas:', error);
        this.mostrarMensaje('No fue posible cargar las reservas.', 'danger');
      }
    });
  }

  crearReserva(): void {
    if (!this.validarFormulario()) return;

    this.reservasService.crear(this.nuevaReserva).subscribe({
      next: (respuesta: Reserva) => {
        this.reservas.push(respuesta);
        this.mostrarMensaje('Reserva creada correctamente.', 'success');
        this.cancelarEdicion();
      },
      error: (error: unknown) => {
        console.error('Error al crear reserva:', error);
        this.mostrarMensaje('No fue posible crear la reserva.', 'danger');
      }
    });
  }

  editarReserva(reserva: Reserva): void {
    if (!reserva.id) return;

    this.editando = true;
    this.idEditando = reserva.id;

    this.nuevaReserva = {
      id: reserva.id,
      usuario: reserva.usuario,
      tipoServicio: reserva.tipoServicio,
      servicioId: reserva.servicioId,
      cantidadPersonas: reserva.cantidadPersonas,
      fechaReserva: reserva.fechaReserva,
      precioTotal: reserva.precioTotal,
      estado: reserva.estado || 'PENDIENTE'
    };

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  actualizarReserva(): void {
    if (!this.editando || this.idEditando === null) return;
    if (!this.validarFormulario()) return;

    this.reservasService.actualizar(
      this.idEditando,
      this.nuevaReserva
    ).subscribe({
      next: (respuesta: Reserva) => {
        const posicion = this.reservas.findIndex(
          reserva => reserva.id === this.idEditando
        );

        if (posicion !== -1) {
          this.reservas[posicion] = respuesta;
        }

        this.mostrarMensaje(
          'Reserva actualizada correctamente.',
          'success'
        );

        this.cancelarEdicion();
      },
      error: (error: unknown) => {
        console.error('Error al actualizar reserva:', error);
        this.mostrarMensaje(
          'No fue posible actualizar la reserva.',
          'danger'
        );
      }
    });
  }

  eliminarReserva(id: number | undefined): void {
    if (id === undefined) return;

    const confirmar = window.confirm(
      '¿Estás seguro de que deseas eliminar esta reserva?'
    );

    if (!confirmar) return;

    this.reservasService.eliminar(id).subscribe({
      next: () => {
        this.reservas = this.reservas.filter(
          reserva => reserva.id !== id
        );

        this.mostrarMensaje(
          'Reserva eliminada correctamente.',
          'success'
        );
      },
      error: (error: unknown) => {
        console.error('Error al eliminar reserva:', error);
        this.mostrarMensaje(
          'No fue posible eliminar la reserva.',
          'danger'
        );
      }
    });
  }

  cambiarEstado(
    id: number | undefined,
    estado: EstadoReserva
  ): void {
    if (id === undefined) return;

    this.reservasService.cambiarEstado(id, estado).subscribe({
      next: (respuesta: Reserva) => {
        const posicion = this.reservas.findIndex(
          reserva => reserva.id === id
        );

        if (posicion !== -1) {
          this.reservas[posicion] = respuesta;
        }

        this.mostrarMensaje(
          'Estado actualizado correctamente.',
          'success'
        );
      },
      error: (error: unknown) => {
        console.error('Error al cambiar estado:', error);
        this.mostrarMensaje(
          'No fue posible cambiar el estado.',
          'danger'
        );
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
        'Completa todos los campos obligatorios.',
        'danger'
      );
      return false;
    }

    if (this.nuevaReserva.servicioId <= 0) {
      this.mostrarMensaje(
        'El ID del servicio debe ser mayor que 0.',
        'danger'
      );
      return false;
    }

    if (this.nuevaReserva.cantidadPersonas <= 0) {
      this.mostrarMensaje(
        'La cantidad de personas debe ser mayor que 0.',
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
    }, 4000);
  }
}
