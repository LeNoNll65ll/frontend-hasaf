import { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Download } from "lucide-react";

interface Column<T = Record<string, unknown>> {
  key: keyof T & string;
  label: string;
  render?: (value: T[keyof T], item: T) => ReactNode;
}

interface DataTableProps<T = Record<string, unknown>> {
  title: string;
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  filters?: {
    search?: string;
    dateFrom?: string;
    dateTo?: string;
    estado?: string;
    onSearchChange?: (value: string) => void;
    onDateFromChange?: (value: string) => void;
    onDateToChange?: (value: string) => void;
    onEstadoChange?: (value: string) => void;
  };
  actions?: {
    onCreate?: () => void;
    onView?: (item: T) => void;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
  };
}

export function DataTable<T = Record<string, unknown>>({
  title,
  columns,
  data,
  loading = false,
  filters,
  actions
}: DataTableProps<T>) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR');
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      'PENDIENTE': 'bg-warning/10 text-warning border-warning/20',
      'APROBADO': 'bg-success/10 text-success border-success/20',
      'RECHAZADO': 'bg-destructive/10 text-destructive border-destructive/20',
      'ACTIVA': 'bg-success/10 text-success border-success/20',
      'UTILIZADA': 'bg-accent/10 text-accent-foreground border-accent/20',
      'VENCIDA': 'bg-destructive/10 text-destructive border-destructive/20',
      'CONFIRMADO': 'bg-success/10 text-success border-success/20',
      'CANCELADO': 'bg-destructive/10 text-destructive border-destructive/20',
      'PROCESADO': 'bg-success/10 text-success border-success/20',
      'EJECUTADO': 'bg-success/10 text-success border-success/20',
      'FALLIDO': 'bg-destructive/10 text-destructive border-destructive/20',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[status] || 'bg-muted text-muted-foreground'}`}>
        {status}
      </span>
    );
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
          <div className="flex gap-2">
            {actions?.onCreate && (
              <Button onClick={actions.onCreate} className="bg-primary hover:bg-primary-hover">
                Crear Nuevo
              </Button>
            )}
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {filters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {filters.onSearchChange && (
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar..."
                  value={filters.search || ''}
                  onChange={(e) => filters.onSearchChange!(e.target.value)}
                  className="pl-9"
                />
              </div>
            )}
            
            {filters.onDateFromChange && (
              <Input
                type="date"
                placeholder="Fecha desde"
                value={filters.dateFrom || ''}
                onChange={(e) => filters.onDateFromChange!(e.target.value)}
              />
            )}
            
            {filters.onDateToChange && (
              <Input
                type="date"
                placeholder="Fecha hasta"
                value={filters.dateTo || ''}
                onChange={(e) => filters.onDateToChange!(e.target.value)}
              />
            )}
            
            {filters.onEstadoChange && (
              <Select value={filters.estado || 'all'} onValueChange={filters.onEstadoChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="PENDIENTE">Pendiente</SelectItem>
                  <SelectItem value="APROBADO">Aprobado</SelectItem>
                  <SelectItem value="RECHAZADO">Rechazado</SelectItem>
                  <SelectItem value="ACTIVA">Activa</SelectItem>
                  <SelectItem value="UTILIZADA">Utilizada</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-0">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-muted-foreground">Cargando datos...</div>
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-muted-foreground">No se encontraron registros</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  {columns.map((column) => (
                    <TableHead key={column.key} className="font-semibold">
                      {column.label}
                    </TableHead>
                  ))}
                  {(actions?.onView || actions?.onEdit || actions?.onDelete) && (
                    <TableHead className="font-semibold text-right">Acciones</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item.id || index} className="hover:bg-muted/50 transition-colors">
                    {columns.map((column) => (
                      <TableCell key={column.key}>
                        {column.render 
                          ? column.render(item[column.key], item)
                          : column.key === 'fecha'
                            ? formatDate(item[column.key])
                            : column.key.includes('monto') || column.key.includes('Monto')
                              ? formatCurrency(item[column.key])
                              : column.key === 'estado'
                                ? getStatusBadge(item[column.key])
                                : item[column.key]
                        }
                      </TableCell>
                    ))}
                    {(actions?.onView || actions?.onEdit || actions?.onDelete) && (
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          {actions.onView && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => actions.onView!(item)}
                              className="h-8 px-2"
                            >
                              Ver
                            </Button>
                          )}
                          {actions.onEdit && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => actions.onEdit!(item)}
                              className="h-8 px-2"
                            >
                              Editar
                            </Button>
                          )}
                          {actions.onDelete && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => actions.onDelete!(item)}
                              className="h-8 px-2 text-destructive hover:text-destructive"
                            >
                              Eliminar
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}