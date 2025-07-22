import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDevengados, mockCompromisos } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { Save, ArrowLeft } from "lucide-react";

interface FormData {
  fecha: string;
  detalle: string;
  monto: string;
  medioPago: string;
  devengadoId: string;
}

export default function PagoForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fecha: new Date().toISOString().split('T')[0],
    detalle: '',
    monto: '',
    medioPago: '',
    devengadoId: ''
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast({
        title: "Pago creado exitosamente",
        description: "El nuevo pago ha sido registrado en el sistema",
      });
      navigate('/app/ejecucion/pagos/listar');
      setLoading(false);
    }, 1000);
  };

  const handleBack = () => {
    navigate('/app/ejecucion/pagos/listar');
  };

  const selectedDevengado = mockDevengados.find(d => d.id === formData.devengadoId);
  const selectedCompromiso = selectedDevengado ? 
    mockCompromisos.find(c => c.id === selectedDevengado.compromisoId) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Nuevo Pago</h1>
          <p className="text-muted-foreground">
            Crear un nuevo pago asociado a un devengado
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Información del Pago</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div>
                <Label htmlFor="medioPago">Medio de Pago</Label>
                <Select 
                  value={formData.medioPago} 
                  onValueChange={(value) => handleChange('medioPago', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar medio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TRANSFERENCIA">Transferencia Bancaria</SelectItem>
                    <SelectItem value="CHEQUE">Cheque</SelectItem>
                    <SelectItem value="EFECTIVO">Efectivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="devengadoId">Devengado</Label>
              <Select 
                value={formData.devengadoId} 
                onValueChange={(value) => handleChange('devengadoId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar devengado" />
                </SelectTrigger>
                <SelectContent>
                  {mockDevengados
                    .filter(d => d.estado === 'PROCESADO')
                    .map((devengado) => (
                    <SelectItem key={devengado.id} value={devengado.id}>
                      {devengado.id} - {devengado.detalle} (${devengado.monto.toLocaleString()})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="detalle">Detalle</Label>
              <Textarea
                id="detalle"
                placeholder="Descripción detallada del pago"
                value={formData.detalle}
                onChange={(e) => handleChange('detalle', e.target.value)}
                required
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {selectedDevengado && selectedCompromiso && (
          <Card className="shadow-card bg-muted/30">
            <CardHeader>
              <CardTitle>Información del Devengado Seleccionado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Devengado:</span> {selectedDevengado.id}
                </div>
                <div>
                  <span className="font-medium">Monto:</span> ${selectedDevengado.monto.toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Estado:</span> {selectedDevengado.estado}
                </div>
                <div>
                  <span className="font-medium">Compromiso:</span> {selectedCompromiso.id}
                </div>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm"><span className="font-medium">Detalle del Devengado:</span></p>
                <p className="text-sm text-muted-foreground">{selectedDevengado.detalle}</p>
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
                Crear Pago
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}