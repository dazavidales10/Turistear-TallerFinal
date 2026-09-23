import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  vuelos: Vuelo[] = [];
  nuevoVuelo: Vuelo = this.vueloVacio();

  editando = false;
  idEditando: number | null = null;
  cargando = true;
  guardando = false;

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
    this.cargando = true;

    this.vuelosService.listar().subscribe({
      next: respuesta => {
        this.vuelos = respuesta;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Error al cargar vuelos:', error);
        this.cargando = false;
        this.mostrarMensaje('No fue posible cargar los vuelos.', 'danger');
        this.cdr.detectChanges();
      }
    });
  }

  guardarVuelo(): void {
    if (!this.validarFormulario() || this.guardando) return;

    this.guardando = true;

    if (this.editando && this.idEditando !== null) {
      this.vuelosService.actualizar(this.idEditando, this.nuevoVuelo).subscribe({
        next: respuesta => {
          const posicion = this.vuelos.findIndex(
            vuelo => vuelo.id === this.idEditando
          );

          if (posicion !== -1) {
            this.vuelos[posicion] = respuesta;
          }

          this.guardando = false;
          this.cancelarEdicion();
          this.mostrarMensaje('Vuelo actualizado correctamente.', 'success');
          this.cdr.detectChanges();
        },
        error: error => {
          console.error('Error al actualizar vuelo:', error);
          this.guardando = false;
          this.mostrarMensaje('No fue posible actualizar el vuelo.', 'danger');
          this.cdr.detectChanges();
        }
      });

      return;
    }

    this.vuelosService.crear(this.nuevoVuelo).subscribe({
      next: respuesta => {
        this.vuelos.push(respuesta);
        this.guardando = false;
        this.nuevoVuelo = this.vueloVacio();
        this.mostrarMensaje('Vuelo creado correctamente.', 'success');
        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Error al crear vuelo:', error);
        this.guardando = false;
        this.mostrarMensaje('No fue posible crear el vuelo.', 'danger');
        this.cdr.detectChanges();
      }
    });
  }

  editarVuelo(vuelo: Vuelo): void {
    if (vuelo.id === undefined) return;

    this.editando = true;
    this.idEditando = vuelo.id;
    this.nuevoVuelo = { ...vuelo };

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  eliminarVuelo(id: number | undefined): void {
    if (id === undefined) return;

    if (!window.confirm('¿Deseas eliminar este vuelo?')) {
      return;
    }

    this.vuelosService.eliminar(id).subscribe({
      next: () => {
        this.vuelos = this.vuelos.filter(
          vuelo => vuelo.id !== id
        );

        this.mostrarMensaje(
          'Vuelo eliminado correctamente.',
          'success'
        );

        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Error al eliminar vuelo:', error);

        this.mostrarMensaje(
          'No fue posible eliminar el vuelo.',
          'danger'
        );

        this.cdr.detectChanges();
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

    if (
      this.nuevoVuelo.precio < 0 ||
      this.nuevoVuelo.cuposDisponibles < 0
    ) {
      this.mostrarMensaje(
        'El precio y los cupos no pueden ser negativos.',
        'danger'
      );

      return false;
    }

    if (
      this.nuevoVuelo.origen.trim().toLowerCase() ===
      this.nuevoVuelo.destino.trim().toLowerCase()
    ) {
      this.mostrarMensaje(
        'El origen y el destino deben ser diferentes.',
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
