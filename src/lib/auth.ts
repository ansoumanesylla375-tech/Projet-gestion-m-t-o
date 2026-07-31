/**
 * Service d'authentification minimal.
 *
 * ⚠️ À REMPLACER : ceci simule un token pour que le Dashboard et les
 * routes protégées soient testables indépendamment de l'écran de login
 * (fait par un autre membre de l'équipe). Quand la page Login sera prête,
 * elle doit juste appeler `setToken(token)` après un login réussi, et
 * `logout()` doit être appelé sur le bouton "Déconnexion".
 */

const TOKEN_KEY = "scena_auth_token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/** Helper temporaire pour tester le dashboard sans passer par le vrai login. */
export function devLogin(): void {
  setToken("dev-token-" + Date.now());
}
