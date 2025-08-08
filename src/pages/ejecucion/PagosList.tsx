import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/common/DataTable";
import { mockPagos, mockDevengados } from "@/data/mockData";
import { FilterState, type Pago } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function PagosList() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filters, setFilters] = useState<FilterState>({});

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'fecha', label: 'Fecha' },
    { key: 'detalle', label: 'Detalle' },
    { key: 'monto', label: 'Monto' },
    { 
      key: 'medioPago', 
      label: 'Medio de Pago',
      render: (value: string) => {
        const medios: Record<string, string> = {
          'TRANSFERENCIA': 'Transferencia',
          'CHEQUE': 'Cheque',
          'EFECTIVO': 'Efectivo'
        };
        return medios[value] || value;
      }
    },
    { 
      key: 'devengadoId', 
      label: 'Devengado',
      render: (value: string) => {
        const devengado = mockDevengados.find(d => d.id === value);
        return devengado?.id || value;
      }
    },
    { key: 'estado', label: 'Estado' },
  ];

  const filteredData = useMemo(() => {
    return mockPagos.filter(pago => {
      const matchesSearch = !filters.searchText || 
        pago.detalle.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        pago.id.toLowerCase().includes(filters.searchText.toLowerCase());
      
      const matchesDateFrom = !filters.dateFrom || 
        new Date(pago.fecha) >= new Date(filters.dateFrom);
      
      const matchesDateTo = !filters.dateTo || 
        new Date(pago.fecha) <= new Date(filters.dateTo);
      
      const matchesEstado = !filters.estado || filters.estado === 'all' || pago.estado === filters.estado;

      return matchesSearch && matchesDateFrom && matchesDateTo && matchesEstado;
    });
  }, [filters]);

  const handleCreate = () => {
    navigate('/app/ejecucion/pagos/nuevo');
  };

  const handleView = (pago: Pago) => {
    toast({
      title: "Ver Pago",
      description: `Visualizando detalles de ${pago.id}`,
    });
  };

  const handleEdit = (pago: Pago) => {
    toast({
      title: "Editar Pago",
      description: `Editando ${pago.id}`,
    });
  };

  const handleDelete = (pago: Pago) => {
    toast({
      variant: "destructive",
      title: "Eliminar Pago",
      description: `¿Está seguro de eliminar ${pago.id}?`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Pagos</h1>
        <p className="text-muted-foreground">
          Gestión de pagos asociados a devengados
        </p>
      </div>

      <DataTable
        title="Lista de Pagos"
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