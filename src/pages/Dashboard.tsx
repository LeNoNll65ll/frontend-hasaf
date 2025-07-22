import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  CreditCard, 
  BarChart3, 
  TrendingUp, 
  AlertCircle,
  DollarSign,
  FileText,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";
import { mockAuthState } from "@/data/mockData";

export default function Dashboard() {
  const currentUser = mockAuthState.currentUser;

  const stats = [
    {
      title: "Asignaciones Activas",
      value: "8",
      change: "+2 este mes",
      icon: Calculator,
      color: "text-primary"
    },
    {
      title: "Monto Total Asignado",
      value: "$12.5M",
      change: "+15% vs mes anterior",
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "Pedidos Pendientes",
      value: "5",
      change: "3 por vencer",
      icon: AlertCircle,
      color: "text-warning"
    },
    {
      title: "Ejecución del Mes",
      value: "78%",
      change: "+5% vs promedio",
      icon: TrendingUp,
      color: "text-accent"
    }
  ];

  const quickActions = [
    {
      title: "Nueva Asignación de Crédito",
      description: "Crear nueva asignación presupuestaria",
      href: "/app/presupuesto/asignaciones/nueva",
      icon: FileText,
      color: "border-primary/20 hover:border-primary/40 hover:bg-primary/5"
    },
    {
      title: "Nuevo Pedido de Cuota",
      description: "Solicitar cuota presupuestaria",
      href: "/app/presupuesto/pedidos/nuevo",
      icon: CreditCard,
      color: "border-success/20 hover:border-success/40 hover:bg-success/5"
    },
    {
      title: "Nuevo Compromiso",
      description: "Registrar nuevo compromiso",
      href: "/app/ejecucion/compromisos/nuevo",
      icon: Activity,
      color: "border-warning/20 hover:border-warning/40 hover:bg-warning/5"
    },
    {
      title: "Ver Panel de Control",
      description: "Análisis y reportes detallados",
      href: "/app/panel",
      icon: BarChart3,
      color: "border-accent/20 hover:border-accent/40 hover:bg-accent/5"
    }
  ];

  const recentActivity = [
    {
      type: "Asignación creada",
      description: "Nueva asignación AC-003 por $500.000",
      time: "Hace 2 horas"
    },
    {
      type: "Pedido aprobado",
      description: "Pedido PC-004 aprobado por $200.000",
      time: "Hace 4 horas"
    },
    {
      type: "Compromiso confirmado",
      description: "Compromiso CO-002 confirmado",
      time: "Ayer"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Bienvenida */}
      <div className="bg-gradient-card p-6 rounded-lg border shadow-card">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Bienvenido al Sistema HASAF
        </h1>
        <p className="text-muted-foreground">
          {currentUser?.safName} - {currentUser?.role === 'ADMIN' ? 'Administrador' : 'Usuario'}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Panel de control para la gestión presupuestaria y de ejecución financiera
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <IconComponent className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Acciones Rápidas */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link key={index} to={action.href}>
                  <Card className={`h-full cursor-pointer transition-all border-2 ${action.color}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-muted rounded-lg">
                          <IconComponent className="h-6 w-6 text-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">
                            {action.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Actividad Reciente</h2>
          <Card className="shadow-card">
            <CardContent className="p-6 space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.type}
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-sm" asChild>
                <Link to="/app/actividad">Ver toda la actividad</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}