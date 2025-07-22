import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockPedidos, mockAsignaciones } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { Save, ArrowLeft } from "lucide-react";

interface FormData {
  fecha: string;
  detalle: string;
  monto: string;
  pedidoCuotaId: string;
}

export default function CompromisoForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fecha: new Date().toISOString().split('T')[0],
    detalle: '',
    monto: '',
    pedidoCuotaId: ''
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast({
        title: "Compromiso creado exitosamente",
        description: "El nuevo compromiso ha sido registrado en el sistema",
      });
      navigate('/app/ejecucion/compromisos/listar');
      setLoading(false);
    }, 1000);
  };

  const handleBack = () => {
    navigate('/app/ejecucion/compromisos/listar');
  };

  const selectedPedido = mockPedidos.find(p => p.id === formData.pedidoCuotaId);
  const selectedAsignacion = selectedPedido ? 
    mockAsignaciones.find(a => a.id === selectedPedido.asignacionCreditoId) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Nuevo Compromiso</h1>
          <p className="text-muted-foreground">
            Crear un nuevo compromiso de gasto
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Información del Compromiso</CardTitle>
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
                <Label htmlFor="monto">Monto (ARS)</Label>
                <Input
                  id="monto"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.monto}
                  onChange={(e) => handleChange('monto', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="pedidoCuotaId">Pedido de Cuota</Label>
              <Select 
                value={formData.pedidoCuotaId} 
                onValueChange={(value) => handleChange('pedidoCuotaId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar pedido de cuota" />
                </SelectTrigger>
                <SelectContent>
                  {mockPedidos
                    .filter(p => p.estado === 'APROBADO')
                    .map((pedido) => (
                    <SelectItem key={pedido.id} value={pedido.id}>
                      {pedido.id} - {pedido.detalle} (${pedido.montoSolicitado.toLocaleString()})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="detalle">Detalle</Label>
              <Textarea
                id="detalle"
                placeholder="Descripción detallada del compromiso"
                value={formData.detalle}
                onChange={(e) => handleChange('detalle', e.target.value)}
                required
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {selectedPedido && selectedAsignacion && (
          <Card className="shadow-card bg-muted/30">
            <CardHeader>
              <CardTitle>Información del Pedido Seleccionado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Pedido:</span> {selectedPedido.id}
                </div>
                <div>
                  <span className="font-medium">Monto Solicitado:</span> ${selectedPedido.montoSolicitado.toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Estado:</span> {selectedPedido.estado}
                </div>
                <div>
                  <span className="font-medium">Asignación:</span> {selectedAsignacion.id}
                </div>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm"><span className="font-medium">Detalle del Pedido:</span></p>
                <p className="text-sm text-muted-foreground">{selectedPedido.detalle}</p>
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
                Crear Compromiso
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}