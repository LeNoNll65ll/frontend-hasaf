import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CesionList = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cesiones</h1>
        <Button>Nueva Cesión</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lista de Cesiones</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No hay cesiones registradas.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CesionList;