import { User, AsignacionCredito, PedidoCuota, Compromiso, Devengado, Pago, SolicitudPresupuestaria } from '../types';

// Usuarios mock
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin.saf1',
    role: 'ADMIN',
    safId: 'SAF-001',
    safName: 'SAF'
  },
  {
    id: '2',
    username: 'user.saf2',
    role: 'USER',
    safId: 'SAF-002',
    safName: 'SAF'
  },
  {
    id: '3',
    username: 'viewer.panel',
    role: 'VIEWER',
    safId: 'SAF-000',
    safName: 'SAF'
  }
];

// Datos para los selectores jerárquicos
export const jerarquiaPresupuestaria = {
  tareas: ['Defensa Nacional', 'Apoyo Logístico', 'Administración General'],
  objetivos: ['Operaciones Militares', 'Mantenimiento', 'Capacitación', 'Infraestructura'],
  proyectos: ['Modernización Equipos', 'Construcción Bases', 'Entrenamiento Personal'],
  actividades: ['Compra Armamento', 'Obras Civiles', 'Cursos Especialización'],
  programas: ['Defensa Territorial', 'Apoyo Logístico', 'Desarrollo Institucional'],
  incisos: ['Personal', 'Bienes de Consumo', 'Servicios', 'Bienes de Capital', 'Transferencias']
};

// Asignaciones de crédito mock
export const mockAsignaciones: AsignacionCredito[] = [
  {
    id: 'AC-001',
    fecha: '2024-01-15',
    detalle: 'Asignación presupuestaria para modernización de equipos',
    montoAsignado: 2500000,
    tarea: 'Defensa Nacional',
    objetivo: 'Operaciones Militares',
    proyecto: 'Modernización Equipos',
    actividad: 'Compra Armamento',
    programa: 'Defensa Territorial',
    inciso: 'Bienes de Capital',
    estado: 'ACTIVA',
    safId: 'SAF-001'
  },
  {
    id: 'AC-002',
    fecha: '2024-02-10',
    detalle: 'Presupuesto para mantenimiento de instalaciones',
    montoAsignado: 800000,
    tarea: 'Apoyo Logístico',
    objetivo: 'Mantenimiento',
    proyecto: 'Construcción Bases',
    actividad: 'Obras Civiles',
    programa: 'Apoyo Logístico',
    inciso: 'Servicios',
    estado: 'UTILIZADA',
    safId: 'SAF-002'
  }
];

// Pedidos de cuota mock
export const mockPedidos: PedidoCuota[] = [
  {
    id: 'PC-001',
    fecha: '2024-01-20',
    detalle: 'Solicitud de cuota para compra de equipos',
    montoSolicitado: 500000,
    estado: 'APROBADO',
    asignacionCreditoId: 'AC-001',
    safId: 'SAF-001'
  },
  {
    id: 'PC-002',
    fecha: '2024-02-15',
    detalle: 'Pedido para servicios de mantenimiento',
    montoSolicitado: 200000,
    estado: 'PENDIENTE',
    asignacionCreditoId: 'AC-002',
    safId: 'SAF-002'
  }
];

// Compromisos mock
export const mockCompromisos: Compromiso[] = [
  {
    id: 'CO-001',
    fecha: '2024-01-25',
    detalle: 'Compromiso para compra de equipos militares',
    monto: 450000,
    estado: 'CONFIRMADO',
    pedidoCuotaId: 'PC-001',
    safId: 'SAF-001'
  }
];

// Devengados mock
export const mockDevengados: Devengado[] = [
  {
    id: 'DV-001',
    fecha: '2024-02-01',
    detalle: 'Devengado por equipos recibidos',
    monto: 450000,
    estado: 'PROCESADO',
    compromisoId: 'CO-001',
    safId: 'SAF-001'
  }
];

// Pagos mock
export const mockPagos: Pago[] = [
  {
    id: 'PG-001',
    fecha: '2024-02-05',
    detalle: 'Pago por equipos militares',
    monto: 450000,
    medioPago: 'TRANSFERENCIA',
    estado: 'EJECUTADO',
    devengadoId: 'DV-001',
    safId: 'SAF-001'
  }
];

// Solicitudes presupuestarias mock
export const mockSolicitudes: SolicitudPresupuestaria[] = [
  {
    id: 'SP-001',
    fecha: '2024-01-20',
    detalle: 'Solicitud de cuota para compra de equipos',
    montoSolicitado: 500000,
    estado: 'APROBADO',
    asignacionCreditoId: 'AC-001',
    tipo: 'PEDIDO_CUOTA',
    safId: 'SAF-001'
  },
  {
    id: 'SP-002',
    fecha: '2024-02-15',
    detalle: 'Pedido para servicios de mantenimiento',
    montoSolicitado: 200000,
    estado: 'PENDIENTE',
    asignacionCreditoId: 'AC-002',
    tipo: 'PEDIDO_CUOTA',
    safId: 'SAF-002'
  },
  {
    id: 'SP-003',
    fecha: '2024-03-10',
    detalle: 'Reasignación de fondos entre proyectos',
    montoSolicitado: 300000,
    estado: 'APROBADO',
    asignacionCreditoId: 'AC-001',
    tipo: 'REASIGNACION',
    safId: 'SAF-001'
  },
  {
    id: 'SP-004',
    fecha: '2024-03-15',
    detalle: 'Reprogramación de actividades del segundo trimestre',
    montoSolicitado: 150000,
    estado: 'PENDIENTE',
    asignacionCreditoId: 'AC-002',
    tipo: 'REPROGRAMACION',
    safId: 'SAF-002'
  },
  {
    id: 'SP-005',
    fecha: '2024-04-05',
    detalle: 'Retracción parcial de presupuesto asignado',
    montoSolicitado: 100000,
    estado: 'RECHAZADO',
    asignacionCreditoId: 'AC-001',
    tipo: 'RETRACCION',
    safId: 'SAF-001'
  },
  {
    id: 'SP-006',
    fecha: '2024-04-20',
    detalle: 'Cesión de recursos a unidad hermana',
    montoSolicitado: 250000,
    estado: 'APROBADO',
    asignacionCreditoId: 'AC-002',
    tipo: 'CESION',
    safId: 'SAF-002'
  }
];

// Estado de autenticación
export const mockAuthState = {
  isAuthenticated: false,
  currentUser: null as User | null
};