import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReasignacionList = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reasignaciones</h1>
        <Button>Nueva Reasignación</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lista de Reasignaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No hay reasignaciones registradas.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReasignacionList;