// Tipos del sistema HASAF

export interface User {
  id: string;
  username: string;
  password: string;
  role: 'ADMIN' | 'USER' | 'VIEWER';
  safId: string;
  safName: string;
}

export interface AsignacionCredito {
  id: string;
  fecha: string;
  detalle: string;
  montoAsignado: number;
  tarea: string;
  objetivo: string;
  proyecto: string;
  actividad: string;
  programa: string;
  inciso: string;
  estado: 'ACTIVA' | 'UTILIZADA' | 'VENCIDA';
  safId: string;
}

export interface PedidoCuota {
  id: string;
  fecha: string;
  detalle: string;
  montoSolicitado: number;
  estado: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';
  asignacionCreditoId: string;
  safId: string;
}

export interface Compromiso {
  id: string;
  fecha: string;
  detalle: string;
  monto: number;
  estado: 'PENDIENTE' | 'CONFIRMADO' | 'CANCELADO';
  pedidoCuotaId: string;
  safId: string;
}

export interface Devengado {
  id: string;
  fecha: string;
  detalle: string;
  monto: number;
  estado: 'PENDIENTE' | 'PROCESADO';
  compromisoId: string;
  safId: string;
}

export interface Pago {
  id: string;
  fecha: string;
  detalle: string;
  monto: number;
  medioPago: 'TRANSFERENCIA' | 'CHEQUE' | 'EFECTIVO';
  estado: 'PENDIENTE' | 'EJECUTADO' | 'FALLIDO';
  devengadoId: string;
  safId: string;
}

export interface FilterState {
  dateFrom?: string;
  dateTo?: string;
  estado?: string;
  safId?: string;
  searchText?: string;
}

export interface SolicitudPresupuestaria {
  id: string;
  fecha: string;
  detalle: string;
  montoSolicitado: number;
  estado: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';
  asignacionCreditoId: string;
  tipo: 'PEDIDO_CUOTA' | 'REASIGNACION' | 'REPROGRAMACION' | 'RETRACCION' | 'CESION';
  safId: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}