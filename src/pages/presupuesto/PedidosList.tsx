import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/common/DataTable";
import { mockPedidos, mockAsignaciones } from "@/data/mockData";
import { FilterState } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function PedidosList() {
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
      label: 'Asignación',
      render: (value: string) => {
        const asignacion = mockAsignaciones.find(a => a.id === value);
        return asignacion?.id || value;
      }
    },
    { key: 'estado', label: 'Estado' },
  ];

  const filteredData = useMemo(() => {
    return mockPedidos.filter(pedido => {
      const matchesSearch = !filters.searchText || 
        pedido.detalle.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        pedido.id.toLowerCase().includes(filters.searchText.toLowerCase());
      
      const matchesDateFrom = !filters.dateFrom || 
        new Date(pedido.fecha) >= new Date(filters.dateFrom);
      
      const matchesDateTo = !filters.dateTo || 
        new Date(pedido.fecha) <= new Date(filters.dateTo);
      
      const matchesEstado = !filters.estado || filters.estado === 'all' || pedido.estado === filters.estado;

      return matchesSearch && matchesDateFrom && matchesDateTo && matchesEstado;
    });
  }, [filters]);

  const handleCreate = () => {
    navigate('/app/presupuesto/pedidos/nuevo');
  };

  const handleView = (pedido: any) => {
    toast({
      title: "Ver Pedido",
      description: `Visualizando detalles de ${pedido.id}`,
    });
  };

  const handleEdit = (pedido: any) => {
    toast({
      title: "Editar Pedido",
      description: `Editando ${pedido.id}`,
    });
  };

  const handleDelete = (pedido: any) => {
    toast({
      variant: "destructive",
      title: "Eliminar Pedido",
      description: `¿Está seguro de eliminar ${pedido.id}?`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Pedidos de Cuota</h1>
        <p className="text-muted-foreground">
          Gestión de solicitudes de cuotas presupuestarias
        </p>
      </div>

      <DataTable
        title="Lista de Pedidos de Cuota"
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