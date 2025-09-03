import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AsignacionesList from "./pages/presupuesto/AsignacionesList";
import AsignacionForm from "./pages/presupuesto/AsignacionForm";
import PedidosList from "./pages/presupuesto/PedidosList";
import PedidoForm from "./pages/presupuesto/PedidoForm";
import CompromisosList from "./pages/ejecucion/CompromisosList";
import CompromisoForm from "./pages/ejecucion/CompromisoForm";
import DevengadosList from "./pages/ejecucion/DevengadosList";
import DevengadoForm from "./pages/ejecucion/DevengadoForm";
import PagosList from "./pages/ejecucion/PagosList";
import PagoForm from "./pages/ejecucion/PagoForm";
import ControlPanel from "./pages/ControlPanel";
import NotFound from "./pages/NotFound";
import ReasignacionList from "./pages/presupuesto/ReasignacionList";
import ReprogramacionList from "./pages/presupuesto/ReprogramacionList";
import RetraccionList from "./pages/presupuesto/RetraccionList";
import CesionList from "./pages/presupuesto/CesionList";
import SolicitudForm from "./pages/presupuesto/SolicitudForm";
import AprobacionList from "./pages/presupuesto/AprobacionList";
import SolicitudList from "./pages/presupuesto/SolicitudList";
import { AuthProvider, useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient();

// Componente para proteger rutas utilizando el estado de autenticación real
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          {/* Redirección inicial */}
          <Route path="/" element={<Navigate to="/app" replace />} />
          
          {/* Login */}
          <Route path="/login" element={<Login />} />
          
          {/* Rutas protegidas */}
          <Route 
            path="/app" 
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* Dashboard */}
            <Route index element={<Dashboard />} />
            
            {/* Módulo Presupuesto */}
            <Route path="presupuesto/asignaciones/listar" element={<AsignacionesList />} />
            <Route path="presupuesto/asignaciones/nueva" element={<AsignacionForm />} />
            <Route path="presupuesto/pedidos/listar" element={<PedidosList />} />
            <Route path="presupuesto/pedidos/nuevo" element={<PedidoForm />} />
            <Route path="presupuesto/reasignacion/listar" element={<ReasignacionList />} />
            <Route path="presupuesto/reprogramacion/listar" element={<ReprogramacionList />} />
            <Route path="presupuesto/retraccion/listar" element={<RetraccionList />} />
            <Route path="presupuesto/cesion/listar" element={<CesionList />} />
            <Route path="presupuesto/solicitud/nueva" element={<SolicitudForm />} />
            <Route path="presupuesto/listar" element={<SolicitudList />} />
            <Route path="presupuesto/aprobacion/listar" element={<AprobacionList />} />
            
            {/* Módulo Ejecución */}
            <Route path="ejecucion/compromisos/listar" element={<CompromisosList />} />
            <Route path="ejecucion/compromisos/nuevo" element={<CompromisoForm />} />
            <Route path="ejecucion/devengados/listar" element={<DevengadosList />} />
            <Route path="ejecucion/devengados/nuevo" element={<DevengadoForm />} />
            <Route path="ejecucion/pagos/listar" element={<PagosList />} />
            <Route path="ejecucion/pagos/nuevo" element={<PagoForm />} />
            
            {/* Panel de Control */}
            <Route path="panel" element={<ControlPanel />} />
          </Route>
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
