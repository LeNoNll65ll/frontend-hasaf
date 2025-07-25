import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AprobacionList = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Aprobaciones Presupuestarias</h1>
        <Button>Nueva Aprobación</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lista de Aprobaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No hay aprobaciones pendientes.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AprobacionList;