import { NavLink, useLocation } from "react-router-dom";
import { 
  Building2, 
  Calculator, 
  CreditCard, 
  BarChart3, 
  FileText, 
  Receipt, 
  Banknote,
  Shield,
  ChevronDown,
  Menu
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const menuItems = [
  {
    title: "Presupuesto",
    icon: Calculator,
    items: [
      { title: "Asignaciones de Crédito", url: "/app/presupuesto/asignaciones/listar", icon: CreditCard },
      { title: "Nueva Asignación", url: "/app/presupuesto/asignaciones/nueva", icon: FileText },
      { title: "Pedidos de Cuota", url: "/app/presupuesto/pedidos/listar", icon: Receipt },
      { title: "Nuevo Pedido", url: "/app/presupuesto/pedidos/nuevo", icon: FileText },
    ]
  },
  {
    title: "Ejecución",
    icon: CreditCard,
    items: [
      { title: "Compromisos", url: "/app/ejecucion/compromisos/listar", icon: FileText },
      { title: "Nuevo Compromiso", url: "/app/ejecucion/compromisos/nuevo", icon: FileText },
      { title: "Devengados", url: "/app/ejecucion/devengados/listar", icon: Receipt },
      { title: "Nuevo Devengado", url: "/app/ejecucion/devengados/nuevo", icon: FileText },
      { title: "Pagos", url: "/app/ejecucion/pagos/listar", icon: Banknote },
      { title: "Nuevo Pago", url: "/app/ejecucion/pagos/nuevo", icon: FileText },
    ]
  },
  {
    title: "Panel de Control",
    icon: BarChart3,
    url: "/app/panel"
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<string[]>(['Presupuesto', 'Ejecución']);
  const collapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;
  const isGroupActive = (items: any[]) => items.some(item => isActive(item.url));

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups(prev => 
      prev.includes(groupTitle) 
        ? prev.filter(g => g !== groupTitle)
        : [...prev, groupTitle]
    );
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <div className="border-b border-sidebar-border p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-accent" />
            <div>
              <h2 className="text-lg font-bold text-sidebar-foreground">HASAF</h2>
              <p className="text-xs text-sidebar-foreground/80">Sistema SAF</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center">
            <Shield className="h-8 w-8 text-accent" />
          </div>
        )}
      </div>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarMenu className="space-y-1">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.items ? (
                  <Collapsible 
                    open={openGroups.includes(item.title)} 
                    onOpenChange={() => toggleGroup(item.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <div 
                        className={`w-full flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                          isGroupActive(item.items) ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                        </div>
                        {!collapsed && (
                          <ChevronDown className={`h-4 w-4 transition-transform ${
                            openGroups.includes(item.title) ? 'rotate-180' : ''
                          }`} />
                        )}
                      </div>
                    </CollapsibleTrigger>
                    {!collapsed && (
                      <CollapsibleContent className="space-y-1 mt-1">
                        {item.items.map((subItem) => (
                          <SidebarMenuButton key={subItem.url} asChild>
                            <NavLink 
                              to={subItem.url}
                              className={({ isActive }) => `
                                flex items-center gap-2 pl-8 py-2 rounded text-sm transition-colors
                                ${isActive 
                                  ? 'bg-primary text-primary-foreground font-medium' 
                                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                                }
                              `}
                            >
                              <subItem.icon className="h-3 w-3" />
                              <span>{subItem.title}</span>
                            </NavLink>
                          </SidebarMenuButton>
                        ))}
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                ) : (
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url!}
                      className={({ isActive }) => `
                        flex items-center gap-2 py-2 px-3 rounded transition-colors
                        ${isActive 
                          ? 'bg-primary text-primary-foreground font-medium' 
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                        }
                      `}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}