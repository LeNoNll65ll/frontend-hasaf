import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RetraccionList = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Retracciones</h1>
        <Button>Nueva Retracción</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lista de Retracciones</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No hay retracciones registradas.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RetraccionList;