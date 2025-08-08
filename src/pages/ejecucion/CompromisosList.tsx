import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/common/DataTable";
import { mockCompromisos, mockPedidos } from "@/data/mockData";
import { FilterState, type Compromiso } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function CompromisosList() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filters, setFilters] = useState<FilterState>({});

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'fecha', label: 'Fecha' },
    { key: 'detalle', label: 'Detalle' },
    { key: 'monto', label: 'Monto' },
    { 
      key: 'pedidoCuotaId', 
      label: 'Pedido de Cuota',
      render: (value: string) => {
        const pedido = mockPedidos.find(p => p.id === value);
        return pedido?.id || value;
      }
    },
    { key: 'estado', label: 'Estado' },
  ];

  const filteredData = useMemo(() => {
    return mockCompromisos.filter(compromiso => {
      const matchesSearch = !filters.searchText || 
        compromiso.detalle.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        compromiso.id.toLowerCase().includes(filters.searchText.toLowerCase());
      
      const matchesDateFrom = !filters.dateFrom || 
        new Date(compromiso.fecha) >= new Date(filters.dateFrom);
      
      const matchesDateTo = !filters.dateTo || 
        new Date(compromiso.fecha) <= new Date(filters.dateTo);
      
      const matchesEstado = !filters.estado || filters.estado === 'all' || compromiso.estado === filters.estado;

      return matchesSearch && matchesDateFrom && matchesDateTo && matchesEstado;
    });
  }, [filters]);

  const handleCreate = () => {
    navigate('/app/ejecucion/compromisos/nuevo');
  };

  const handleView = (compromiso: Compromiso) => {
    toast({
      title: "Ver Compromiso",
      description: `Visualizando detalles de ${compromiso.id}`,
    });
  };

  const handleEdit = (compromiso: Compromiso) => {
    toast({
      title: "Editar Compromiso",
      description: `Editando ${compromiso.id}`,
    });
  };

  const handleDelete = (compromiso: Compromiso) => {
    toast({
      variant: "destructive",
      title: "Eliminar Compromiso",
      description: `¿Está seguro de eliminar ${compromiso.id}?`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Compromisos</h1>
        <p className="text-muted-foreground">
          Gestión de compromisos de gasto asociados a pedidos de cuota
        </p>
      </div>

      <DataTable
        title="Lista de Compromisos"
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