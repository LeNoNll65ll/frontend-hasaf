import { User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { mockAuthState } from "@/data/mockData";

export function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    mockAuthState.isAuthenticated = false;
    mockAuthState.currentUser = null;
    navigate("/login");
  };

  return (
    <header className="h-16 bg-gradient-header border-b border-border shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-white hover:bg-white/10" />
          <div className="text-white">
            <h1 className="text-xl font-semibold">HASAF</h1>
            <p className="text-xs text-white/80">Herramienta de Apoyo para los SAF</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Info del usuario actual */}
          {mockAuthState.currentUser && (
            <div className="text-right text-white/90 text-sm hidden sm:block">
              <p className="font-medium">{mockAuthState.currentUser.safName}</p>
              <p className="text-xs text-white/70">{mockAuthState.currentUser.username}</p>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}