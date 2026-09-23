import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VuelosService } from '../../services/vuelos';
import { Vuelo } from '../../models/turistear.models';

@Component({
  selector: 'app-vuelos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vuelos.html',
  styleUrl: './vuelos.css'
})
export class Vuelos implements OnInit {
  private vuelosService = inject(VuelosService);
  vuelos: Vuelo[] = [];
  nuevoVuelo: Vuelo = this.vueloVacio();
  editando = false;
  idEditando: number | null = null;
  mensaje = '';
  tipoMensaje: 'success' | 'danger' = 'success';

  ngOnInit(): void {
    this.cargarVuelos();
  }

  vueloVacio(): Vuelo {
    return {
      origen: '',
      destino: '',
      fechaSalida: '',
      precio: 0,
      cuposDisponibles: 0
    };
  }

  cargarVuelos(): void {
    this.vuelosService.listar().subscribe({
      next: (respuesta: Vuelo[]) => {
        this.vuelos = respuesta;
      },
      error: (error: unknown) => {
        console.error('Error al cargar vuelos:', error);
        this.mostrarMensaje('No fue posible cargar los vuelos.', 'danger');
      }
    });
  }

  crearVuelo(): void {
    if (!this.validarFormulario()) return;

    this.vuelosService.crear(this.nuevoVuelo).subscribe({
      next: (respuesta: Vuelo) => {
        this.vuelos.push(respuesta);
        this.mostrarMensaje('Vuelo creado correctamente.', 'success');
        this.cancelarEdicion();
      },
      error: (error: unknown) => {
        console.error('Error al crear vuelo:', error);
        this.mostrarMensaje('No fue posible crear el vuelo.', 'danger');
      }
    });
  }

  editarVuelo(vuelo: Vuelo): void {
    if (!vuelo.id) return;

    this.editando = true;
    this.idEditando = vuelo.id;
    this.nuevoVuelo = {
      id: vuelo.id,
      origen: vuelo.origen,
      destino: vuelo.destino,
      fechaSalida: vuelo.fechaSalida,
      precio: vuelo.precio,
      cuposDisponibles: vuelo.cuposDisponibles
    };

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  actualizarVuelo(): void {
    if (!this.editando || this.idEditando === null) return;
    if (!this.validarFormulario()) return;

    this.vuelosService.actualizar(this.idEditando, this.nuevoVuelo).subscribe({
      next: (respuesta: Vuelo) => {
        const posicion = this.vuelos.findIndex(
          vuelo => vuelo.id === this.idEditando
        );

        if (posicion !== -1) {
          this.vuelos[posicion] = respuesta;
        }

        this.mostrarMensaje('Vuelo actualizado correctamente.', 'success');
        this.cancelarEdicion();
      },
      error: (error: unknown) => {
        console.error('Error al actualizar vuelo:', error);
        this.mostrarMensaje('No fue posible actualizar el vuelo.', 'danger');
      }
    });
  }

  eliminarVuelo(id: number | undefined): void {
    if (id === undefined) return;

    const confirmar = window.confirm(
      '¿Estás seguro de que deseas eliminar este vuelo?'
    );

    if (!confirmar) return;

    this.vuelosService.eliminar(id).subscribe({
      next: () => {
        this.vuelos = this.vuelos.filter(vuelo => vuelo.id !== id);
        this.mostrarMensaje('Vuelo eliminado correctamente.', 'success');
      },
      error: (error: unknown) => {
        console.error('Error al eliminar vuelo:', error);
        this.mostrarMensaje('No fue posible eliminar el vuelo.', 'danger');
      }
    });
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.idEditando = null;
    this.nuevoVuelo = this.vueloVacio();
  }

  validarFormulario(): boolean {
    if (
      !this.nuevoVuelo.origen.trim() ||
      !this.nuevoVuelo.destino.trim() ||
      !this.nuevoVuelo.fechaSalida
    ) {
      this.mostrarMensaje('Completa todos los campos.', 'danger');
      return false;
    }

    if (this.nuevoVuelo.precio < 0) {
      this.mostrarMensaje('El precio no puede ser negativo.', 'danger');
      return false;
    }

    if (this.nuevoVuelo.cuposDisponibles < 0) {
      this.mostrarMensaje(
        'Los cupos disponibles no pueden ser negativos.',
        'danger'
      );
      return false;
    }

    return true;
  }

  mostrarMensaje(texto: string, tipo: 'success' | 'danger'): void {
    this.mensaje = texto;
    this.tipoMensaje = tipo;

    setTimeout(() => {
      this.mensaje = '';
    }, 4000);
  }
}
