export interface PlanTuristico {
  id?: number;
  nombre: string;
  destino: string;
  descripcion: string;
  precio: number;
  duracion: string;
  disponibilidad: number;
}

export interface Vuelo {
  id?: number;
  origen: string;
  destino: string;
  fechaSalida: string;
  precio: number;
  cuposDisponibles: number;
}

export interface Reserva {
  id?: number;
  usuario: string;
  tipoServicio: string;
  servicioId: number;
  cantidadPersonas: number;
  fechaReserva: string;
  precioTotal?: number;
  estado?: EstadoReserva;
}

export type EstadoReserva =
  | 'PENDIENTE'
  | 'CONFIRMADA'
  | 'CANCELADA';
