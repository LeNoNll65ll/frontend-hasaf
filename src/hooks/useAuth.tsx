import { createContext, useContext, useState } from 'react';
import { api } from '@/lib/api';
import { parseJwt, setToken, removeToken, getToken } from '@/lib/auth';
import { mockUsers } from '@/data/mockData';

interface UserInfo {
  roles: string[];
  safId?: string;
}

interface AuthContextValue {
  token: string | null;
  user: UserInfo | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(getToken());
  const [user, setUser] = useState<UserInfo | null>(() => {
    const t = getToken();
    if (!t) return null;
    const payload = parseJwt(t);
    return { roles: payload.roles || [], safId: payload.safId };
  });

  const login = async (username: string, password: string) => {
    try {
      const data = await api.post('/auth/login', { username, password });
      const receivedToken = data.token as string;
      setToken(receivedToken);
      setTokenState(receivedToken);
      const payload = parseJwt(receivedToken);
      setUser({ roles: payload.roles || [], safId: payload.safId });
    } catch (error) {
      // Fallback a datos mock en caso de no tener backend disponible
      const mock = mockUsers.find(
        (u) => u.username === username && u.password === password
      );
      if (!mock) {
        throw new Error('Credenciales inválidas');
      }
      setToken('mock-token');
      setTokenState('mock-token');
      setUser({ roles: [mock.role], safId: mock.safId });
    }
  };

  const logout = () => {
    removeToken();
    setTokenState(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
