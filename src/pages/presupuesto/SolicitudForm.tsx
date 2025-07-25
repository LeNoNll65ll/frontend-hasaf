import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const SolicitudForm = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Nueva Solicitud Presupuestaria</h1>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Formulario de Solicitud Presupuestaria</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Formulario en desarrollo.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SolicitudForm;