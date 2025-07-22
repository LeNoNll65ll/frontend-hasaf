import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileSpreadsheet, CheckCircle, XCircle, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';

// Interfaz para los datos del Excel procesados
interface ExcelData {
  fecha: string;
  detalle: string;
  montoAsignado: number;
  tarea: string;
  objetivo: string;
  proyecto: string;
  actividad: string;
  programa: string;
  inciso: string;
  fila: number; // Para tracking de errores
}

// Interfaz para errores de validación
interface ValidationError {
  fila: number;
  campo: string;
  error: string;
}

interface ExcelUploaderProps {
  onDataProcessed: (data: ExcelData[]) => void;
  onClose: () => void;
}

export default function ExcelUploader({ onDataProcessed, onClose }: ExcelUploaderProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [excelData, setExcelData] = useState<ExcelData[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  // Función para descargar plantilla de Excel
  const downloadTemplate = () => {
    const templateData = [
      {
        'Fecha (YYYY-MM-DD)': '2024-01-15',
        'Detalle': 'Ejemplo de asignación presupuestaria',
        'Monto Asignado': 1000000,
        'Tarea': 'T001',
        'Objetivo': 'OBJ001',
        'Proyecto': 'PROY001',
        'Actividad': 'ACT001',
        'Programa': 'PROG001',
        'Inciso': 'INC001'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Plantilla Asignaciones');
    XLSX.writeFile(wb, 'plantilla_asignaciones.xlsx');

    toast({
      title: "Plantilla descargada",
      description: "Se ha descargado la plantilla de Excel con el formato correcto",
    });
  };

  // Función para validar una fila de datos
  const validateRow = (row: any, rowIndex: number): { data: ExcelData | null; errors: ValidationError[] } => {
    const errors: ValidationError[] = [];
    
    // Validar fecha
    const fecha = row['Fecha (YYYY-MM-DD)'];
    if (!fecha) {
      errors.push({ fila: rowIndex, campo: 'Fecha', error: 'Campo requerido' });
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      errors.push({ fila: rowIndex, campo: 'Fecha', error: 'Formato inválido (use YYYY-MM-DD)' });
    }

    // Validar detalle
    const detalle = row['Detalle'];
    if (!detalle || detalle.trim().length === 0) {
      errors.push({ fila: rowIndex, campo: 'Detalle', error: 'Campo requerido' });
    }

    // Validar monto
    const monto = parseFloat(row['Monto Asignado']);
    if (!monto || isNaN(monto) || monto <= 0) {
      errors.push({ fila: rowIndex, campo: 'Monto Asignado', error: 'Debe ser un número mayor a 0' });
    }

    // Validar campos de clasificación presupuestaria
    const camposRequeridos = ['Tarea', 'Objetivo', 'Proyecto', 'Actividad', 'Programa', 'Inciso'];
    camposRequeridos.forEach(campo => {
      if (!row[campo] || row[campo].trim().length === 0) {
        errors.push({ fila: rowIndex, campo, error: 'Campo requerido' });
      }
    });

    if (errors.length === 0) {
      return {
        data: {
          fecha: fecha,
          detalle: detalle.trim(),
          montoAsignado: monto,
          tarea: row['Tarea'],
          objetivo: row['Objetivo'],
          proyecto: row['Proyecto'],
          actividad: row['Actividad'],
          programa: row['Programa'],
          inciso: row['Inciso'],
          fila: rowIndex
        },
        errors: []
      };
    }

    return { data: null, errors };
  };

  // Función para procesar el archivo Excel
  const processExcelFile = (file: File) => {
    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Obtener la primera hoja
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        
        // Convertir a JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        if (jsonData.length === 0) {
          toast({
            title: "Error",
            description: "El archivo Excel está vacío",
            variant: "destructive",
          });
          setIsProcessing(false);
          return;
        }

        // Validar y procesar cada fila
        const processedData: ExcelData[] = [];
        const allErrors: ValidationError[] = [];

        jsonData.forEach((row, index) => {
          const { data, errors } = validateRow(row, index + 2); // +2 porque Excel empieza en 1 y tiene header
          if (data) {
            processedData.push(data);
          }
          allErrors.push(...errors);
        });

        setExcelData(processedData);
        setValidationErrors(allErrors);
        setShowPreview(true);

        if (allErrors.length === 0) {
          toast({
            title: "Archivo procesado exitosamente",
            description: `Se procesaron ${processedData.length} registros sin errores`,
          });
        } else {
          toast({
            title: "Archivo procesado con errores",
            description: `${allErrors.length} errores encontrados en ${processedData.length} registros válidos`,
            variant: "destructive",
          });
        }

      } catch (error) {
        toast({
          title: "Error al procesar archivo",
          description: "Verifique que el archivo sea un Excel válido",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // Manejar selección de archivo
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && 
          file.type !== 'application/vnd.ms-excel') {
        toast({
          title: "Tipo de archivo inválido",
          description: "Por favor seleccione un archivo Excel (.xlsx o .xls)",
          variant: "destructive",
        });
        return;
      }
      processExcelFile(file);
    }
  };

  // Confirmar procesamiento de datos
  const handleConfirmData = () => {
    if (validationErrors.length > 0) {
      toast({
        title: "No se puede procesar",
        description: "Corrija los errores antes de continuar",
        variant: "destructive",
      });
      return;
    }

    onDataProcessed(excelData);
    toast({
      title: "Datos cargados exitosamente",
      description: `Se procesaron ${excelData.length} asignaciones de crédito`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Carga Masiva por Excel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showPreview ? (
            <>
              <Alert>
                <AlertDescription>
                  Descargue la plantilla de Excel, complete los datos y súbala para procesamiento automático.
                </AlertDescription>
              </Alert>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={downloadTemplate}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Descargar Plantilla
                </Button>

                <Button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {isProcessing ? 'Procesando...' : 'Subir Excel'}
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileSelect}
                className="hidden"
              />
            </>
          ) : (
            <div className="space-y-4">
              {/* Resumen de validación */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span>{excelData.length} registros válidos</span>
                </div>
                {validationErrors.length > 0 && (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="h-5 w-5" />
                    <span>{validationErrors.length} errores</span>
                  </div>
                )}
              </div>

              {/* Lista de errores */}
              {validationErrors.length > 0 && (
                <Alert variant="destructive">
                  <AlertDescription>
                    <div className="space-y-1">
                      <strong>Errores encontrados:</strong>
                      {validationErrors.slice(0, 5).map((error, index) => (
                        <div key={index} className="text-sm">
                          Fila {error.fila}, {error.campo}: {error.error}
                        </div>
                      ))}
                      {validationErrors.length > 5 && (
                        <div className="text-sm">... y {validationErrors.length - 5} errores más</div>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Vista previa de datos válidos */}
              {excelData.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold">Vista Previa de Datos Válidos:</h4>
                  <div className="max-h-64 overflow-auto border rounded">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Detalle</TableHead>
                          <TableHead>Monto</TableHead>
                          <TableHead>Tarea</TableHead>
                          <TableHead>Proyecto</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {excelData.slice(0, 5).map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.fecha}</TableCell>
                            <TableCell className="max-w-40 truncate">{item.detalle}</TableCell>
                            <TableCell>${item.montoAsignado.toLocaleString()}</TableCell>
                            <TableCell>{item.tarea}</TableCell>
                            <TableCell>{item.proyecto}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {excelData.length > 5 && (
                      <div className="p-2 text-center text-sm text-muted-foreground">
                        ... y {excelData.length - 5} registros más
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Botones de acción */}
              <div className="flex justify-end gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowPreview(false);
                    setExcelData([]);
                    setValidationErrors([]);
                  }}
                >
                  Cargar Otro Archivo
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                >
                  Cancelar
                </Button>
                <Button 
                  type="button" 
                  onClick={handleConfirmData}
                  disabled={validationErrors.length > 0}
                >
                  Procesar {excelData.length} Registros
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}