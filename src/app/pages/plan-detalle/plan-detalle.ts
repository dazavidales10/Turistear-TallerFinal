import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { PlanesService } from '../../services/planes';
import { PlanTuristico } from '../../models/turistear.models';

@Component({
  selector: 'app-plan-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './plan-detalle.html',
  styleUrl: './plan-detalle.css'
})
export class PlanDetalle implements OnInit {
  private route = inject(ActivatedRoute);
  private planesService = inject(PlanesService);
  private cdr = inject(ChangeDetectorRef);

  plan: PlanTuristico | null = null;
  cargando = true;
  mensaje = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      if (!id) {
        this.mensaje = 'El plan solicitado no es válido.';
        this.cargando = false;
        this.cdr.detectChanges();
        return;
      }

      this.cargarPlan(id);
    });
  }

  cargarPlan(id: number): void {
    this.cargando = true;
    this.cdr.detectChanges();

    this.planesService.buscarPorId(id).subscribe({
      next: plan => {
        this.plan = plan;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Error al cargar detalle:', error);
        this.mensaje = 'No fue posible cargar el plan solicitado.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}
