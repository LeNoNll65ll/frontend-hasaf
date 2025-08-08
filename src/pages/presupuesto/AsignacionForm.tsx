import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { jerarquiaPresupuestaria } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { Save, ArrowLeft, FileSpreadsheet, Plus } from "lucide-react";
import ExcelUploader from "@/components/common/ExcelUploader";

interface FormData {
  fecha: string;
  detalle: string;
  montoAsignado: string;
  tarea: string;
  objetivo: string;
  proyecto: string;
  actividad: string;
  programa: string;
  inciso: string;
}

export default function AsignacionForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  // Estado para manejar el tipo de carga (individual o masiva)
  const [activeTab, setActiveTab] = useState("individual");
  
  // Datos del formulario individual
  const [formData, setFormData] = useState<FormData>({
    fecha: new Date().toISOString().split('T')[0],
    detalle: '',
    montoAsignado: '',
    tarea: '',
    objetivo: '',
    proyecto: '',
    actividad: '',
    programa: '',
    inciso: ''
  });

  // Función para manejar cambios en el formulario individual
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Función para enviar formulario individual
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulamos el guardado individual
    setTimeout(() => {
      toast({
        title: "Asignación creada exitosamente",
        description: "La nueva asignación de crédito ha sido registrada en el sistema",
      });
      navigate('/app/presupuesto/asignaciones/listar');
      setLoading(false);
    }, 1000);
  };

  // Función para procesar datos del Excel
  const handleExcelDataProcessed = async (excelData: Record<string, unknown>[]) => {
    setLoading(true);

    // Simulamos el procesamiento masivo en el backend
    setTimeout(() => {
      toast({
        title: "Carga masiva exitosa",
        description: `Se procesaron ${excelData.length} asignaciones de crédito exitosamente`,
      });
      navigate('/app/presupuesto/asignaciones/listar');
      setLoading(false);
    }, 2000);
  };

  // Función para volver al listado
  const handleBack = () => {
    navigate('/app/presupuesto/asignaciones/listar');
  };

  return (
    <div className="space-y-6">
      {/* Header con botón de regreso */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Nueva Asignación de Crédito</h1>
          <p className="text-muted-foreground">
            Crear una nueva asignación presupuestaria en el sistema
          </p>
        </div>
      </div>

      {/* Pestañas para carga individual o masiva */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="individual" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Carga Individual
          </TabsTrigger>
          <TabsTrigger value="masiva" className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Carga Masiva (Excel)
          </TabsTrigger>
        </TabsList>

        {/* Contenido de carga individual */}
        <TabsContent value="individual">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Información General</CardTitle>
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
                    <Label htmlFor="montoAsignado">Monto Asignado (ARS)</Label>
                    <Input
                      id="montoAsignado"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.montoAsignado}
                      onChange={(e) => handleChange('montoAsignado', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="detalle">Detalle</Label>
                  <Textarea
                    id="detalle"
                    placeholder="Descripción detallada de la asignación presupuestaria"
                    value={formData.detalle}
                    onChange={(e) => handleChange('detalle', e.target.value)}
                    required
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Clasificación Presupuestaria</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tarea">Tarea</Label>
                    <Select value={formData.tarea} onValueChange={(value) => handleChange('tarea', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tarea" />
                      </SelectTrigger>
                      <SelectContent>
                        {jerarquiaPresupuestaria.tareas.map((tarea) => (
                          <SelectItem key={tarea} value={tarea}>{tarea}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="objetivo">Objetivo</Label>
                    <Select value={formData.objetivo} onValueChange={(value) => handleChange('objetivo', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar objetivo" />
                      </SelectTrigger>
                      <SelectContent>
                        {jerarquiaPresupuestaria.objetivos.map((objetivo) => (
                          <SelectItem key={objetivo} value={objetivo}>{objetivo}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="proyecto">Proyecto</Label>
                    <Select value={formData.proyecto} onValueChange={(value) => handleChange('proyecto', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar proyecto" />
                      </SelectTrigger>
                      <SelectContent>
                        {jerarquiaPresupuestaria.proyectos.map((proyecto) => (
                          <SelectItem key={proyecto} value={proyecto}>{proyecto}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="actividad">Actividad</Label>
                    <Select value={formData.actividad} onValueChange={(value) => handleChange('actividad', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar actividad" />
                      </SelectTrigger>
                      <SelectContent>
                        {jerarquiaPresupuestaria.actividades.map((actividad) => (
                          <SelectItem key={actividad} value={actividad}>{actividad}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="programa">Programa</Label>
                    <Select value={formData.programa} onValueChange={(value) => handleChange('programa', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar programa" />
                      </SelectTrigger>
                      <SelectContent>
                        {jerarquiaPresupuestaria.programas.map((programa) => (
                          <SelectItem key={programa} value={programa}>{programa}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="inciso">Inciso</Label>
                    <Select value={formData.inciso} onValueChange={(value) => handleChange('inciso', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar inciso" />
                      </SelectTrigger>
                      <SelectContent>
                        {jerarquiaPresupuestaria.incisos.map((inciso) => (
                          <SelectItem key={inciso} value={inciso}>{inciso}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                    Crear Asignación
                  </>
                )}
              </Button>
            </div>
          </form>
        </TabsContent>

        {/* Contenido de carga masiva */}
        <TabsContent value="masiva">
          <ExcelUploader 
            onDataProcessed={handleExcelDataProcessed}
            onClose={handleBack}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}