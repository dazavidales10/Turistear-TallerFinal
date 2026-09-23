import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PlanTuristico } from '../models/turistear.models';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/planes';

  listar(): Observable<PlanTuristico[]> {

    return this.http.get<PlanTuristico[]>(
      this.apiUrl
    );

  }

  buscarPorId(id: number): Observable<PlanTuristico> {

    return this.http.get<PlanTuristico>(
      `${this.apiUrl}/${id}`
    );

  }

  crear(plan: PlanTuristico): Observable<PlanTuristico> {

    return this.http.post<PlanTuristico>(
      this.apiUrl,
      plan
    );

  }

  actualizar(
    id: number,
    plan: PlanTuristico
  ): Observable<PlanTuristico> {

    return this.http.put<PlanTuristico>(
      `${this.apiUrl}/${id}`,
      plan
    );

  }

  eliminar(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }

}
