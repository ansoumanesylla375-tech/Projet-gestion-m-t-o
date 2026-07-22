import { useState } from 'react';

export default function Auth() {
  // Mode de l'écran : connexion, inscription ou récupération
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      // Simulation API Mock / LocalStorage demandée par la consigne
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      alert('Connexion réussie ! Redirection vers le Dashboard...');
      window.location.href = '/dashboard';
    } else if (mode === 'register') {
      alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
      setMode('login');
    } else {
      alert('Un e-mail de réinitialisation de mot de passe vous a été envoyé.');
      setMode('login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-slate-100">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-xl">
        
        {/* Branding & Titre Dynamique */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Ansoumanesylla tech
          </h2>
          <p className="text-slate-400 mt-2">
            {mode === 'login' && "Connexion à votre espace gestionnaire"}
            {mode === 'register' && "Créez votre compte pour gérer vos événements"}
            {mode === 'forgot' && "Récupération de votre accès"}
          </p>
        </div>

        {/* Formulaire Unique Adaptatif */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Nom complet</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Ansoumane Sylla"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Adresse Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="votre@email.com"
            />
          </div>

          {mode !== 'forgot' && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Mot de passe</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
          )}

          {mode === 'login' && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => setMode('forgot')}
                className="text-xs text-indigo-400 hover:underline transition-colors"
              >
                Mot de passe oublié ?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-lg shadow-indigo-500/25"
          >
            {mode === 'login' && "Se connecter"}
            {mode === 'register' && "S'inscrire"}
            {mode === 'forgot' && "Réinitialiser mon mot de passe"}
          </button>
        </form>

        {/* Liens de bascule de mode (Modèle Figma) */}
        <div className="mt-6 text-center text-sm text-slate-400">
          {mode === 'login' && (
            <p>
              Pas encore de compte ?{" "}
              <button onClick={() => setMode('register')} className="text-indigo-400 hover:underline font-medium">
                S'inscrire
              </button>
            </p>
          )}
          {mode !== 'login' && (
            <button onClick={() => setMode('login')} className="text-indigo-400 hover:underline font-medium">
              Retour à l'écran de connexion
            </button>
          )}
        </div>

      </div>
    </div>
  );
}