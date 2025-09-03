import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';

type Rol = 'ADMIN' | 'USER' | 'VIEWER' | string;

interface RoleGateProps {
  roles: Rol[];
  children: ReactNode;
}

/**
 * Muestra los children solo si el usuario posee alguno de los roles indicados.
 */
export function RoleGate({ roles, children }: RoleGateProps) {
  const { user } = useAuth();
  if (!user) return null;
  const hasRole = user.roles.some((r) => roles.includes(r));
  return hasRole ? <>{children}</> : null;
}
