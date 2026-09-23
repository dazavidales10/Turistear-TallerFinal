import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ClimaRespuesta {
  current: {
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    time: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/clima';

  consultar(
    latitud: number,
    longitud: number
  ): Observable<ClimaRespuesta> {
    return this.http.get<ClimaRespuesta>(
      `${this.apiUrl}?latitud=${latitud}&longitud=${longitud}`
    );
  }
}
