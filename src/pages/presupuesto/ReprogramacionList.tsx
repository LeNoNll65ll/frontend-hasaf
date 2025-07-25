import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReprogramacionList = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reprogramaciones</h1>
        <Button>Nueva Reprogramación</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lista de Reprogramaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No hay reprogramaciones registradas.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReprogramacionList;