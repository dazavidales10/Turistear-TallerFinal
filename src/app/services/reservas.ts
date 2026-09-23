import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva, EstadoReserva } from '../models/turistear.models';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/reservas';

  listar(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.apiUrl}/${id}`);
  }

  crear(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva);
  }

  actualizar(id: number, reserva: Reserva): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.apiUrl}/${id}`, reserva);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  cambiarEstado(id: number, estado: EstadoReserva): Observable<Reserva> {
    return this.http.put<Reserva>(
      `${this.apiUrl}/${id}/estado?estado=${estado}`,
      {}
    );
  }
}
