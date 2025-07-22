import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAsignaciones } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { Save, ArrowLeft } from "lucide-react";

interface FormData {
  fecha: string;
  detalle: string;
  montoSolicitado: string;
  asignacionCreditoId: string;
}

export default function PedidoForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fecha: new Date().toISOString().split('T')[0],
    detalle: '',
    montoSolicitado: '',
    asignacionCreditoId: ''
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast({
        title: "Pedido creado exitosamente",
        description: "El nuevo pedido de cuota ha sido registrado en el sistema",
      });
      navigate('/app/presupuesto/pedidos/listar');
      setLoading(false);
    }, 1000);
  };

  const handleBack = () => {
    navigate('/app/presupuesto/pedidos/listar');
  };

  const selectedAsignacion = mockAsignaciones.find(a => a.id === formData.asignacionCreditoId);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Nuevo Pedido de Cuota</h1>
          <p className="text-muted-foreground">
            Crear una nueva solicitud de cuota presupuestaria
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Información del Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fecha">Fecha</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => handleChange('fecha', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="montoSolicitado">Monto Solicitado (ARS)</Label>
                <Input
                  id="montoSolicitado"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.montoSolicitado}
                  onChange={(e) => handleChange('montoSolicitado', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="asignacionCreditoId">Asignación de Crédito</Label>
              <Select 
                value={formData.asignacionCreditoId} 
                onValueChange={(value) => handleChange('asignacionCreditoId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar asignación de crédito" />
                </SelectTrigger>
                <SelectContent>
                  {mockAsignaciones
                    .filter(a => a.estado === 'ACTIVA')
                    .map((asignacion) => (
                    <SelectItem key={asignacion.id} value={asignacion.id}>
                      {asignacion.id} - {asignacion.detalle} (${asignacion.montoAsignado.toLocaleString()})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="detalle">Detalle</Label>
              <Textarea
                id="detalle"
                placeholder="Descripción detallada del pedido de cuota"
                value={formData.detalle}
                onChange={(e) => handleChange('detalle', e.target.value)}
                required
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {selectedAsignacion && (
          <Card className="shadow-card bg-muted/30">
            <CardHeader>
              <CardTitle>Información de la Asignación Seleccionada</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Tarea:</span> {selectedAsignacion.tarea}
                </div>
                <div>
                  <span className="font-medium">Objetivo:</span> {selectedAsignacion.objetivo}
                </div>
                <div>
                  <span className="font-medium">Proyecto:</span> {selectedAsignacion.proyecto}
                </div>
                <div>
                  <span className="font-medium">Programa:</span> {selectedAsignacion.programa}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={handleBack}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              "Guardando..."
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Crear Pedido
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}