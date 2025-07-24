import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/common/DataTable";
import { mockAsignaciones } from "@/data/mockData";
import { FilterState } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function AsignacionesList() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filters, setFilters] = useState<FilterState>({});

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'fecha', label: 'Fecha' },
    { key: 'detalle', label: 'Detalle' },
    { key: 'montoAsignado', label: 'Monto Asignado' },
    { key: 'tarea', label: 'Tarea' },
    { key: 'objetivo', label: 'Objetivo' },
    { key: 'estado', label: 'Estado' },
  ];

  const filteredData = useMemo(() => {
    return mockAsignaciones.filter(asignacion => {
      const matchesSearch = !filters.searchText || 
        asignacion.detalle.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        asignacion.id.toLowerCase().includes(filters.searchText.toLowerCase());
      
      const matchesDateFrom = !filters.dateFrom || 
        new Date(asignacion.fecha) >= new Date(filters.dateFrom);
      
      const matchesDateTo = !filters.dateTo || 
        new Date(asignacion.fecha) <= new Date(filters.dateTo);
      
      const matchesEstado = !filters.estado || filters.estado === 'all' || asignacion.estado === filters.estado;

      return matchesSearch && matchesDateFrom && matchesDateTo && matchesEstado;
    });
  }, [filters]);

  const handleCreate = () => {
    navigate('/app/presupuesto/asignaciones/nueva');
  };

  const handleView = (asignacion: any) => {
    toast({
      title: "Ver Asignación",
      description: `Visualizando detalles de ${asignacion.id}`,
    });
    // En una implementación real, navegaría a la vista de detalle
  };

  const handleEdit = (asignacion: any) => {
    toast({
      title: "Editar Asignación",
      description: `Editando ${asignacion.id}`,
    });
    // En una implementación real, navegaría al formulario de edición
  };

  const handleDelete = (asignacion: any) => {
    toast({
      variant: "destructive",
      title: "Eliminar Asignación",
      description: `¿Está seguro de eliminar ${asignacion.id}?`,
    });
    // En una implementación real, mostraría un dialog de confirmación
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Asignaciones de Crédito</h1>
        <p className="text-muted-foreground">
          Gestión de asignaciones presupuestarias del sistema SAF
        </p>
      </div>

      <DataTable
        title="Lista de Asignaciones"
        columns={columns}
        data={filteredData}
        filters={{
          search: filters.searchText,
          dateFrom: filters.dateFrom,
          dateTo: filters.dateTo,
          estado: filters.estado,
          onSearchChange: (value) => setFilters(prev => ({ ...prev, searchText: value })),
          onDateFromChange: (value) => setFilters(prev => ({ ...prev, dateFrom: value })),
          onDateToChange: (value) => setFilters(prev => ({ ...prev, dateTo: value })),
          onEstadoChange: (value) => setFilters(prev => ({ ...prev, estado: value })),
        }}
        actions={{
          onCreate: handleCreate,
          onView: handleView,
          onEdit: handleEdit,
          onDelete: handleDelete,
        }}
      />
    </div>
  );
}