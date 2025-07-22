import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCompromisos, mockPedidos } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { Save, ArrowLeft } from "lucide-react";

interface FormData {
  fecha: string;
  detalle: string;
  monto: string;
  compromisoId: string;
}

export default function DevengadoForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fecha: new Date().toISOString().split('T')[0],
    detalle: '',
    monto: '',
    compromisoId: ''
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast({
        title: "Devengado creado exitosamente",
        description: "El nuevo devengado ha sido registrado en el sistema",
      });
      navigate('/app/ejecucion/devengados/listar');
      setLoading(false);
    }, 1000);
  };

  const handleBack = () => {
    navigate('/app/ejecucion/devengados/listar');
  };

  const selectedCompromiso = mockCompromisos.find(c => c.id === formData.compromisoId);
  const selectedPedido = selectedCompromiso ? 
    mockPedidos.find(p => p.id === selectedCompromiso.pedidoCuotaId) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Nuevo Devengado</h1>
          <p className="text-muted-foreground">
            Crear un nuevo devengado asociado a un compromiso
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Información del Devengado</CardTitle>
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
              <Label htmlFor="compromisoId">Compromiso</Label>
              <Select 
                value={formData.compromisoId} 
                onValueChange={(value) => handleChange('compromisoId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar compromiso" />
                </SelectTrigger>
                <SelectContent>
                  {mockCompromisos
                    .filter(c => c.estado === 'CONFIRMADO')
                    .map((compromiso) => (
                    <SelectItem key={compromiso.id} value={compromiso.id}>
                      {compromiso.id} - {compromiso.detalle} (${compromiso.monto.toLocaleString()})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="detalle">Detalle</Label>
              <Textarea
                id="detalle"
                placeholder="Descripción detallada del devengado"
                value={formData.detalle}
                onChange={(e) => handleChange('detalle', e.target.value)}
                required
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {selectedCompromiso && selectedPedido && (
          <Card className="shadow-card bg-muted/30">
            <CardHeader>
              <CardTitle>Información del Compromiso Seleccionado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Compromiso:</span> {selectedCompromiso.id}
                </div>
                <div>
                  <span className="font-medium">Monto:</span> ${selectedCompromiso.monto.toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Estado:</span> {selectedCompromiso.estado}
                </div>
                <div>
                  <span className="font-medium">Pedido:</span> {selectedPedido.id}
                </div>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm"><span className="font-medium">Detalle del Compromiso:</span></p>
                <p className="text-sm text-muted-foreground">{selectedCompromiso.detalle}</p>
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
                Crear Devengado
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}