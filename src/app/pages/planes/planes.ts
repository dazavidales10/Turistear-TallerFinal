import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PlanesService } from '../../services/planes';
import { PlanTuristico } from '../../models/turistear.models';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './planes.html',
  styleUrl: './planes.css'
})
export class Planes implements OnInit {
  private planesService = inject(PlanesService);
  private cdr = inject(ChangeDetectorRef);

  planes: PlanTuristico[] = [];
  nuevoPlan: PlanTuristico = this.planVacio();

  editando = false;
  idEditando: number | null = null;
  cargando = true;
  guardando = false;

  mensaje = '';
  tipoMensaje: 'success' | 'danger' = 'success';

  ngOnInit(): void {
    this.cargarPlanes();
  }

  planVacio(): PlanTuristico {
    return {
      nombre: '',
      destino: '',
      descripcion: '',
      precio: 0,
      duracion: '',
      disponibilidad: 0
    };
  }

  cargarPlanes(): void {
    this.cargando = true;

    this.planesService.listar().subscribe({
      next: respuesta => {
        this.planes = respuesta;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Error al cargar planes:', error);
        this.cargando = false;
        this.mostrarMensaje('No fue posible cargar los planes.', 'danger');
        this.cdr.detectChanges();
      }
    });
  }

  guardarPlan(): void {
    if (!this.validarFormulario() || this.guardando) return;

    this.guardando = true;

    if (this.editando && this.idEditando !== null) {
      this.planesService.actualizar(this.idEditando, this.nuevoPlan).subscribe({
        next: respuesta => {
          const posicion = this.planes.findIndex(
            plan => plan.id === this.idEditando
          );

          if (posicion !== -1) {
            this.planes[posicion] = respuesta;
          }

          this.guardando = false;
          this.cancelarEdicion();
          this.mostrarMensaje('Plan actualizado correctamente.', 'success');
          this.cdr.detectChanges();
        },
        error: error => {
          console.error('Error al actualizar plan:', error);
          this.guardando = false;
          this.mostrarMensaje('No fue posible actualizar el plan.', 'danger');
          this.cdr.detectChanges();
        }
      });

      return;
    }

    this.planesService.crear(this.nuevoPlan).subscribe({
      next: respuesta => {
        this.planes.push(respuesta);
        this.guardando = false;
        this.nuevoPlan = this.planVacio();
        this.mostrarMensaje('Plan creado correctamente.', 'success');
        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Error al crear plan:', error);
        this.guardando = false;
        this.mostrarMensaje('No fue posible crear el plan.', 'danger');
        this.cdr.detectChanges();
      }
    });
  }

  editarPlan(plan: PlanTuristico): void {
    if (plan.id === undefined) return;

    this.editando = true;
    this.idEditando = plan.id;
    this.nuevoPlan = { ...plan };

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  eliminarPlan(id: number | undefined): void {
    if (id === undefined) return;

    if (!window.confirm('¿Deseas eliminar este plan?')) {
      return;
    }

    this.planesService.eliminar(id).subscribe({
      next: () => {
        this.planes = this.planes.filter(plan => plan.id !== id);
        this.mostrarMensaje('Plan eliminado correctamente.', 'success');
        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Error al eliminar plan:', error);
        this.mostrarMensaje('No fue posible eliminar el plan.', 'danger');
        this.cdr.detectChanges();
      }
    });
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.idEditando = null;
    this.nuevoPlan = this.planVacio();
  }

  validarFormulario(): boolean {
    if (
      !this.nuevoPlan.nombre.trim() ||
      !this.nuevoPlan.destino.trim() ||
      !this.nuevoPlan.descripcion.trim() ||
      !this.nuevoPlan.duracion.trim()
    ) {
      this.mostrarMensaje('Completa todos los campos.', 'danger');
      return false;
    }

    if (
      this.nuevoPlan.precio < 0 ||
      this.nuevoPlan.disponibilidad < 0
    ) {
      this.mostrarMensaje(
        'El precio y la disponibilidad no pueden ser negativos.',
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
