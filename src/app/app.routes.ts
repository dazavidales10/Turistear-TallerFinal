import { Routes } from '@angular/router';
import { Planes } from './pages/planes/planes';
import { Vuelos } from './pages/vuelos/vuelos';
import { Reservas } from './pages/reservas/reservas';

export const routes: Routes = [
  {
    path: 'planes',
    component: Planes
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
    path: '',
    redirectTo: 'planes',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'planes'
  }
];
