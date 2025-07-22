import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { BreadcrumbItem } from "@/types";

const routeLabels: Record<string, string> = {
  'app': 'Inicio',
  'presupuesto': 'Presupuesto',
  'ejecucion': 'Ejecución',
  'panel': 'Panel de Control',
  'asignaciones': 'Asignaciones de Crédito',
  'pedidos': 'Pedidos de Cuota',
  'compromisos': 'Compromisos',
  'devengados': 'Devengados',
  'pagos': 'Pagos',
  'listar': 'Listar',
  'nueva': 'Nueva Asignación',
  'nuevo': 'Nuevo',
};

export function Breadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Inicio', href: '/app' }
  ];

  let currentPath = '';
  pathSegments.slice(1).forEach((segment) => {
    currentPath += `/${segment}`;
    const label = routeLabels[segment] || segment;
    breadcrumbs.push({
      label,
      href: pathSegments[pathSegments.length - 1] === segment ? undefined : `/app${currentPath}`
    });
  });

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6">
      <Home className="h-4 w-4" />
      {breadcrumbs.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
          {item.href ? (
            <Link 
              to={item.href} 
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}