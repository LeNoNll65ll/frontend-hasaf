import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Calendar,
  Filter,
  Download,
  RefreshCw,
  AlertTriangle
} from "lucide-react";
// Importación de componentes de gráficos de Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";

export default function ControlPanel() {
  // Datos hardcodeados para el gráfico de ejecución mensual por unidad SAF
  const ejecucionMensualData = [
    {
      mes: 'Ene',
      'SAF-001': 2800000,
      'SAF-002': 1200000,
      'SAF-003': 900000,
    },
    {
      mes: 'Feb',
      'SAF-001': 3200000,
      'SAF-002': 1800000,
      'SAF-003': 1100000,
    },
    {
      mes: 'Mar',
      'SAF-001': 2900000,
      'SAF-002': 1500000,
      'SAF-003': 1300000,
    },
    {
      mes: 'Abr',
      'SAF-001': 3500000,
      'SAF-002': 2100000,
      'SAF-003': 1400000,
    },
    {
      mes: 'May',
      'SAF-001': 3800000,
      'SAF-002': 2300000,
      'SAF-003': 1600000,
    },
    {
      mes: 'Jun',
      'SAF-001': 4200000,
      'SAF-002': 2500000,
      'SAF-003': 1800000,
    },
  ];

  // Datos hardcodeados para el gráfico circular de distribución por tipo de gasto
  const distribucionGastoData = [
    { tipo: 'Personal', valor: 18500000, color: 'hsl(var(--primary))' },
    { tipo: 'Bienes de Consumo', valor: 8200000, color: 'hsl(var(--success))' },
    { tipo: 'Servicios', valor: 12300000, color: 'hsl(var(--warning))' },
    { tipo: 'Bienes de Capital', valor: 6200000, color: 'hsl(var(--accent))' },
  ];

  // Datos hardcodeados para el gráfico de líneas de tendencia temporal
  const tendenciaEjecucionData = [
    { periodo: 'Q1 2023', presupuesto: 15000000, ejecutado: 11200000 },
    { periodo: 'Q2 2023', presupuesto: 16200000, ejecutado: 13800000 },
    { periodo: 'Q3 2023', presupuesto: 17800000, ejecutado: 15100000 },
    { periodo: 'Q4 2023', presupuesto: 18500000, ejecutado: 16300000 },
    { periodo: 'Q1 2024', presupuesto: 19200000, ejecutado: 17400000 },
    { periodo: 'Q2 2024', presupuesto: 20100000, ejecutado: 18200000 },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Panel de Control</h1>
        <p className="text-muted-foreground">
          Análisis y reportes de gestión presupuestaria - Integración con Apache Superset/Grafana
        </p>
      </div>

      {/* Filtros Globales */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros de Análisis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Unidad SAF</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar unidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las unidades</SelectItem>
                  <SelectItem value="saf-001">SAF Comando de Operaciones</SelectItem>
                  <SelectItem value="saf-002">SAF Comando de Educación</SelectItem>
                  <SelectItem value="saf-003">SAF Comando Logístico</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Período</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-month">Mes actual</SelectItem>
                  <SelectItem value="current-quarter">Trimestre actual</SelectItem>
                  <SelectItem value="current-year">Año actual</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Tipo de Gasto</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de gasto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="bienes-consumo">Bienes de Consumo</SelectItem>
                  <SelectItem value="servicios">Servicios</SelectItem>
                  <SelectItem value="bienes-capital">Bienes de Capital</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-2">
              <Button className="flex-1">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Presupuesto Asignado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mb-1">$45.2M</div>
            <div className="text-xs text-success">+8.2% vs período anterior</div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ejecutado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success mb-1">$32.7M</div>
            <div className="text-xs text-muted-foreground">72.4% del total</div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Compromisos Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning mb-1">$8.1M</div>
            <div className="text-xs text-muted-foreground">17.9% del total</div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Disponible
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground mb-1">$4.4M</div>
            <div className="text-xs text-muted-foreground">9.7% del total</div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos Interactivos - Datos hardcodeados para demostración */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Ejecución Mensual por Barras */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Ejecución Mensual por Unidad SAF
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {/* Contenedor responsivo para el gráfico de barras */}
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ejecucionMensualData}>
                  {/* Grilla del gráfico */}
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
                  {/* Eje X - Meses */}
                  <XAxis 
                    dataKey="mes" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  {/* Eje Y - Montos */}
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                  />
                  {/* Tooltip que aparece al hacer hover */}
                  <Tooltip 
                    formatter={(value: any) => [`$${(value / 1000000).toFixed(2)}M`, 'Ejecutado']}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  {/* Leyenda */}
                  <Legend />
                  {/* Barras para cada unidad SAF */}
                  <Bar dataKey="SAF-001" fill="hsl(var(--primary))" name="SAF Comando Operaciones" />
                  <Bar dataKey="SAF-002" fill="hsl(var(--success))" name="SAF Comando Educación" />
                  <Bar dataKey="SAF-003" fill="hsl(var(--warning))" name="SAF Comando Logístico" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico Circular de Distribución por Tipo de Gasto */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Distribución por Tipo de Gasto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {/* Contenedor responsivo para el gráfico circular */}
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  {/* Configuración del gráfico circular */}
                  <Pie
                    data={distribucionGastoData}
                    dataKey="valor"
                    nameKey="tipo"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ tipo, percent }) => `${tipo}: ${(percent * 100).toFixed(1)}%`}
                    labelLine={false}
                  >
                    {/* Colores para cada segmento del gráfico */}
                    {distribucionGastoData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  {/* Tooltip personalizado */}
                  <Tooltip 
                    formatter={(value: any) => [`$${(value / 1000000).toFixed(2)}M`, 'Monto']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Líneas - Tendencia Temporal */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Tendencia de Ejecución vs Presupuesto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {/* Contenedor responsivo para el gráfico de líneas */}
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tendenciaEjecucionData}>
                  {/* Grilla del gráfico */}
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
                  {/* Eje X - Períodos */}
                  <XAxis 
                    dataKey="periodo" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  {/* Eje Y - Montos */}
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                  />
                  {/* Tooltip */}
                  <Tooltip 
                    formatter={(value: any) => [`$${(value / 1000000).toFixed(2)}M`, '']}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  {/* Leyenda */}
                  <Legend />
                  {/* Línea de presupuesto asignado */}
                  <Line 
                    type="monotone" 
                    dataKey="presupuesto" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Presupuesto Asignado"
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  />
                  {/* Línea de ejecución real */}
                  <Line 
                    type="monotone" 
                    dataKey="ejecutado" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={2}
                    name="Ejecutado"
                    dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Alertas y Notificaciones */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Alertas del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-warning/10 border border-warning/20 rounded">
              <div className="flex items-center gap-2 text-warning mb-1">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">Presupuesto por Vencer</span>
              </div>
              <p className="text-sm text-muted-foreground">
                3 asignaciones vencen en los próximos 7 días
              </p>
            </div>
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded">
              <div className="flex items-center gap-2 text-destructive mb-1">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">Ejecución Baja</span>
              </div>
              <p className="text-sm text-muted-foreground">
                SAF-003 tiene solo 45% de ejecución este mes
              </p>
            </div>
            <div className="p-3 bg-success/10 border border-success/20 rounded">
              <div className="flex items-center gap-2 text-success mb-1">
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium">Meta Alcanzada</span>
              </div>
              <p className="text-sm text-muted-foreground">
                SAF-001 superó la meta mensual en un 12%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nota sobre Integración */}
      <Card className="shadow-card border-accent/20 bg-accent/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-accent/20 rounded-lg">
              <BarChart3 className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Integración con Herramientas de BI
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Este panel está preparado para integrarse con Apache Superset o Grafana para 
                generar visualizaciones avanzadas y reportes interactivos. Los datos mockup 
                mostrados serán reemplazados por conexiones en tiempo real a la base de datos.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Configurar Superset
                </Button>
                <Button variant="outline" size="sm">
                  Configurar Grafana
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}