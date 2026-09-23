import { Routes } from '@angular/router';

import { Inicio } from './pages/inicio/inicio';
import { Planes } from './pages/planes/planes';
import { PlanDetalle } from './pages/plan-detalle/plan-detalle';
import { Vuelos } from './pages/vuelos/vuelos';
import { Reservas } from './pages/reservas/reservas';
import { Clima } from './pages/clima/clima';

export const routes: Routes = [
  {
    path: 'inicio',
    component: Inicio
  },
  {
    path: 'planes',
    component: Planes
  },
  {
    path: 'planes/:id',
    component: PlanDetalle
  },
  {
    path: 'vuelos',
    component: Vuelos
  },
  {
    path: 'reservas',
    component: Reservas
  },
  {
    path: 'clima',
    component: Clima
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];
