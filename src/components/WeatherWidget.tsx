import { useEffect, useState } from "react";
import { CloudSun, RefreshCw } from "lucide-react";
import { Card } from "./Card";
import { fetchWeather, WeatherData } from "../lib/weather";

interface WeatherWidgetProps {
  city?: string;
}

/**
 * Widget météo consommant l'API externe OpenWeather via le backend NestJS
 * (endpoint protégé GET /weather?city=...). Nécessite VITE_API_URL dans
 * .env (par défaut http://localhost:3000) et que le backend tourne.
 */
export default function WeatherWidget({ city = "Dakar" }: WeatherWidgetProps) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    setError(null);
    fetchWeather(city)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  return (
    <Card className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-spotlight/10 text-spotlight">
          <CloudSun size={22} />
        </div>
        <div>
          {loading && <p className="text-sm text-ink-muted">Chargement météo...</p>}
          {error && <p className="text-sm text-danger">{error}</p>}
          {data && !loading && !error && (
            <>
              <p className="font-display text-lg font-semibold text-ink">
                {data.temperature}°C — {data.city}
              </p>
              <p className="text-xs capitalize text-ink-muted">
                {data.description} · ressenti {data.feelsLike}°C · humidité {data.humidity}%
              </p>
            </>
          )}
        </div>
      </div>
      <button
        onClick={load}
        aria-label="Rafraîchir la météo"
        className="rounded-md p-2 text-ink-muted hover:bg-canvas hover:text-ink"
      >
        <RefreshCw size={16} />
      </button>
    </Card>
  );
}
