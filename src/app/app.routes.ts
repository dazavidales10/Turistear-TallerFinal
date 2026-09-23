import { Routes } from '@angular/router';

import { Planes } from './pages/planes/planes';

export const routes: Routes = [

  {
    path: 'planes',
    component: Planes
  },

  {
    path: '',
    redirectTo: 'planes',
    pathMatch: 'full'
  }

];
