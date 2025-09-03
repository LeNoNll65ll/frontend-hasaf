import { getToken, logout } from '@/lib/auth';

/**
 * Cliente HTTP basado en fetch con soporte para JWT.
 */
export async function apiFetch(url: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    logout();
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error de red');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  get: (url: string) => apiFetch(url, { method: 'GET' }),
  post: (url: string, data: unknown) => apiFetch(url, { method: 'POST', body: JSON.stringify(data) }),
  put: (url: string, data: unknown) => apiFetch(url, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (url: string) => apiFetch(url, { method: 'DELETE' }),
};

export default api;
