import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vuelo } from '../models/turistear.models';

@Injectable({
  providedIn: 'root'
})
export class VuelosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/vuelos';

  listar(): Observable<Vuelo[]> {
    return this.http.get<Vuelo[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Vuelo> {
    return this.http.get<Vuelo>(`${this.apiUrl}/${id}`);
  }

  crear(vuelo: Vuelo): Observable<Vuelo> {
    return this.http.post<Vuelo>(this.apiUrl, vuelo);
  }

  actualizar(id: number, vuelo: Vuelo): Observable<Vuelo> {
    return this.http.put<Vuelo>(`${this.apiUrl}/${id}`, vuelo);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
