import { getToken } from "./auth";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
}

/**
 * Appelle GET /weather?city=... sur le backend NestJS de Mamadou.
 * Nécessite d'être connecté (token JWT envoyé en Bearer).
 */
export async function fetchWeather(city: string): Promise<WeatherData> {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/weather?city=${encodeURIComponent(city)}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || `Erreur météo (${response.status})`);
  }

  return response.json();
}
