import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { setToken, devLogin } from "../lib/auth";
import { loginRequest, registerRequest } from "../lib/authApi";

/**
 * ⚠️ STUB TEMPORAIRE — page de test pour l'intégration backend (auth JWT).
 * À remplacer par la vraie page Login (maquette Figma auth) une fois que
 * le membre en charge de la Landing/Auth aura fait le design définitif.
 *
 * Elle appelle réellement POST /auth/login et /auth/register sur le
 * backend NestJS de Mamadou. Un bouton "connexion rapide (sans backend)"
 * reste disponible pour tester le dashboard seul si l'API ne tourne pas.
 */
export default function LoginStub() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || "/dashboard";

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError(null);
    setLoading(true);
    try {
      const result =
        mode === "login"
          ? await loginRequest(email, password)
          : await registerRequest(email, password, name);

      setToken(result.accessToken);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  }

  function handleQuickLogin() {
    devLogin();
    navigate(from, { replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-sm rounded-card bg-white p-8 shadow-card">
        <h1 className="mb-1 font-display text-xl font-semibold text-ink">
          {mode === "login" ? "Connexion" : "Inscription"}
        </h1>
        <p className="mb-6 text-sm text-ink-muted">
          Page de test — appelle le vrai backend NestJS (JWT).
        </p>

        <div className="flex flex-col gap-4">
          {mode === "register" && (
            <Input label="Nom" value={name} onChange={(e) => setName(e.target.value)} />
          )}
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-sm text-danger">{error}</p>}

          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? "Chargement..." : mode === "login" ? "Se connecter" : "S'inscrire"}
          </Button>

          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-sm text-spotlight hover:text-spotlight-dark"
          >
            {mode === "login" ? "Pas de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
          </button>

          <hr className="border-line" />

          <button
            onClick={handleQuickLogin}
            className="text-xs text-ink-muted hover:text-ink"
          >
            Connexion rapide sans backend (test dashboard uniquement)
          </button>
        </div>
      </div>
    </div>
  );
}
