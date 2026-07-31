const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  name: string;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

async function handleResponse(response: Response): Promise<AuthResponse> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = Array.isArray(body?.message) ? body.message.join(", ") : body?.message;
    throw new Error(message || `Erreur (${response.status})`);
  }
  return response.json();
}

export async function loginRequest(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
}

export async function registerRequest(
  email: string,
  password: string,
  name: string
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });
  return handleResponse(response);
}
