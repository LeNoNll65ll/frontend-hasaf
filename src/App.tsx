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
import { mockAuthState } from "./data/mockData";

const queryClient = new QueryClient();

// Componente para proteger rutas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return mockAuthState.isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const App = () => (
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
);

export default App;
