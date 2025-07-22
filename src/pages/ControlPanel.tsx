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

export default function ControlPanel() {
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

      {/* Placeholder para Grafana/Superset */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Ejecución Mensual */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Ejecución Mensual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/30 rounded border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="font-semibold mb-2">Gráfico de Barras</h3>
                <p className="text-sm">Ejecución mensual por unidad SAF</p>
                <p className="text-xs mt-2 opacity-75">
                  Integración con Apache Superset/Grafana
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Distribución por Tipo de Gasto */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Distribución por Tipo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/30 rounded border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <PieChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="font-semibold mb-2">Gráfico Circular</h3>
                <p className="text-sm">Distribución del gasto por categoría</p>
                <p className="text-xs mt-2 opacity-75">
                  Integración con Apache Superset/Grafana
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tendencia Temporal */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Tendencia de Ejecución
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/30 rounded border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="font-semibold mb-2">Gráfico de Líneas</h3>
                <p className="text-sm">Evolución temporal de la ejecución</p>
                <p className="text-xs mt-2 opacity-75">
                  Integración con Apache Superset/Grafana
                </p>
              </div>
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