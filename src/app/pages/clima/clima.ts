import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {
  ClimaService,
  ClimaRespuesta
} from '../../services/clima';

interface DestinoClima {
  nombre: string;
  latitud: number;
  longitud: number;
}

@Component({
  selector: 'app-clima',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clima.html',
  styleUrl: './clima.css'
})
export class Clima implements OnInit {
  private climaService = inject(ClimaService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  destinos: DestinoClima[] = [
    {
      nombre: 'Bogotá',
      latitud: 4.711,
      longitud: -74.0721
    },
    {
      nombre: 'Cartagena',
      latitud: 10.391,
      longitud: -75.4794
    },
    {
      nombre: 'Medellín',
      latitud: 6.2442,
      longitud: -75.5812
    },
    {
      nombre: 'Cali',
      latitud: 3.4516,
      longitud: -76.532
    },
    {
      nombre: 'Santa Marta',
      latitud: 11.2408,
      longitud: -74.199
    },
    {
      nombre: 'San Andrés',
      latitud: 12.5847,
      longitud: -81.7006
    }
  ];

  destinoSeleccionado: DestinoClima =
    this.destinos[0];

  temperatura: number | null = null;
  codigoClima: number | null = null;
  viento: number | null = null;
  horaActualizacion = '';

  cargando = true;
  mensaje = '';
  consultado = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const destino = params['destino'];

      if (destino) {
        const encontrado = this.destinos.find(
          item =>
            item.nombre.toLowerCase() ===
            String(destino).toLowerCase()
        );

        if (encontrado) {
          this.destinoSeleccionado = encontrado;
        }
      }

      this.consultarClima();
    });
  }

  consultarClima(): void {
    if (this.cargando && this.consultado) {
      return;
    }

    this.cargando = true;
    this.mensaje = '';

    this.climaService.consultar(
      this.destinoSeleccionado.latitud,
      this.destinoSeleccionado.longitud
    ).subscribe({
      next: (respuesta: ClimaRespuesta) => {
        if (!respuesta.current) {
          this.mensaje =
            'No se recibió información del clima.';
          this.cargando = false;
          this.cdr.detectChanges();
          return;
        }

        this.temperatura =
          respuesta.current.temperature_2m;

        this.codigoClima =
          respuesta.current.weather_code;

        this.viento =
          respuesta.current.wind_speed_10m;

        this.horaActualizacion =
          respuesta.current.time;

        this.consultado = true;
        this.cargando = false;

        this.cdr.detectChanges();
      },
      error: error => {
        console.error(
          'Error al consultar clima:',
          error
        );

        this.mensaje =
          'El servicio de clima no está disponible en este momento.';

        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  obtenerDescripcion(
    codigo: number | null
  ): string {
    if (codigo === null) {
      return 'Sin información';
    }

    if (codigo === 0) return 'Cielo despejado';

    if (codigo >= 1 && codigo <= 3) {
      return 'Parcialmente nublado';
    }

    if (codigo >= 45 && codigo <= 48) {
      return 'Niebla';
    }

    if (codigo >= 51 && codigo <= 55) {
      return 'Llovizna';
    }

    if (codigo >= 61 && codigo <= 65) {
      return 'Lluvia';
    }

    if (codigo >= 71 && codigo <= 75) {
      return 'Nieve';
    }

    if (codigo >= 80 && codigo <= 82) {
      return 'Lluvias fuertes';
    }

    if (codigo >= 95 && codigo <= 99) {
      return 'Tormenta';
    }

    return 'Condición desconocida';
  }
}
