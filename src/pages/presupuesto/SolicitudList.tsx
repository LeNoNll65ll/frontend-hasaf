import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/common/DataTable";
import { mockSolicitudes, mockAsignaciones } from "@/data/mockData";
import { FilterState, type SolicitudPresupuestaria } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function SolicitudList() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filters, setFilters] = useState<FilterState>({});

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'fecha', label: 'Fecha' },
    { key: 'detalle', label: 'Detalle' },
    { key: 'montoSolicitado', label: 'Monto Solicitado' },
    { 
      key: 'asignacionCreditoId', 
      label: 'Asignación de Crédito',
      render: (value: string) => {
        const asignacion = mockAsignaciones.find(a => a.id === value);
        return asignacion?.id || value;
      }
    },
    { 
      key: 'tipo', 
      label: 'Tipo',
      render: (value: string) => {
        const tipos = {
          'PEDIDO_CUOTA': 'Pedido de Cuota',
          'REASIGNACION': 'Reasignación',
          'REPROGRAMACION': 'Reprogramación',
          'RETRACCION': 'Retracción',
          'CESION': 'Cesión'
        };
        return tipos[value as keyof typeof tipos] || value;
      }
    },
    { key: 'estado', label: 'Estado' },
  ];

  const filteredData = useMemo(() => {
    return mockSolicitudes.filter(solicitud => {
      const matchesSearch = !filters.searchText || 
        solicitud.detalle.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        solicitud.id.toLowerCase().includes(filters.searchText.toLowerCase());
      
      const matchesDateFrom = !filters.dateFrom || 
        new Date(solicitud.fecha) >= new Date(filters.dateFrom);
      
      const matchesDateTo = !filters.dateTo || 
        new Date(solicitud.fecha) <= new Date(filters.dateTo);
      
      const matchesEstado = !filters.estado || filters.estado === 'all' || solicitud.estado === filters.estado;

      return matchesSearch && matchesDateFrom && matchesDateTo && matchesEstado;
    });
  }, [filters]);

  const handleCreate = () => {
    navigate('/app/presupuesto/solicitudes/nueva');
  };

  const handleView = (solicitud: SolicitudPresupuestaria) => {
    toast({
      title: "Ver Solicitud",
      description: `Visualizando detalles de ${solicitud.id}`,
    });
  };

  const handleEdit = (solicitud: SolicitudPresupuestaria) => {
    toast({
      title: "Editar Solicitud",
      description: `Editando ${solicitud.id}`,
    });
  };

  const handleDelete = (solicitud: SolicitudPresupuestaria) => {
    toast({
      variant: "destructive",
      title: "Eliminar Solicitud",
      description: `¿Está seguro de eliminar ${solicitud.id}?`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Solicitudes Presupuestarias</h1>
        <p className="text-muted-foreground">
          Gestión de todas las solicitudes presupuestarias del sistema
        </p>
      </div>

      <DataTable
        title="Lista de Solicitudes Presupuestarias"
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