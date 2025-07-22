import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/common/DataTable";
import { mockDevengados, mockCompromisos } from "@/data/mockData";
import { FilterState } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function DevengadosList() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filters, setFilters] = useState<FilterState>({});

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'fecha', label: 'Fecha' },
    { key: 'detalle', label: 'Detalle' },
    { key: 'monto', label: 'Monto' },
    { 
      key: 'compromisoId', 
      label: 'Compromiso',
      render: (value: string) => {
        const compromiso = mockCompromisos.find(c => c.id === value);
        return compromiso?.id || value;
      }
    },
    { key: 'estado', label: 'Estado' },
  ];

  const filteredData = useMemo(() => {
    return mockDevengados.filter(devengado => {
      const matchesSearch = !filters.searchText || 
        devengado.detalle.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        devengado.id.toLowerCase().includes(filters.searchText.toLowerCase());
      
      const matchesDateFrom = !filters.dateFrom || 
        new Date(devengado.fecha) >= new Date(filters.dateFrom);
      
      const matchesDateTo = !filters.dateTo || 
        new Date(devengado.fecha) <= new Date(filters.dateTo);
      
      const matchesEstado = !filters.estado || devengado.estado === filters.estado;

      return matchesSearch && matchesDateFrom && matchesDateTo && matchesEstado;
    });
  }, [filters]);

  const handleCreate = () => {
    navigate('/app/ejecucion/devengados/nuevo');
  };

  const handleView = (devengado: any) => {
    toast({
      title: "Ver Devengado",
      description: `Visualizando detalles de ${devengado.id}`,
    });
  };

  const handleEdit = (devengado: any) => {
    toast({
      title: "Editar Devengado",
      description: `Editando ${devengado.id}`,
    });
  };

  const handleDelete = (devengado: any) => {
    toast({
      variant: "destructive",
      title: "Eliminar Devengado",
      description: `¿Está seguro de eliminar ${devengado.id}?`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Devengados</h1>
        <p className="text-muted-foreground">
          Gestión de devengados asociados a compromisos
        </p>
      </div>

      <DataTable
        title="Lista de Devengados"
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