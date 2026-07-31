import { useState } from 'react';

export default function Auth() {
  // Mode de l'écran : connexion, inscription ou récupération
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      try {
        const response = await fetch('http://localhost:3000/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (response.ok) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', email);
          alert('Connexion réussie ! Redirection vers le Dashboard...');
          window.location.href = '/dashboard';
        } else {
          alert("Identifiants incorrects ou erreur de connexion.");
        }
      } catch (error) {
        console.error('Erreur réseau:', error);
        alert('Impossible de contacter le serveur backend.');
      }
    } else if (mode === 'register') {
      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        });

        if (response.ok) {
          alert('Compte créé avec succès dans la base de données ! Vous pouvez maintenant vous connecter.');
          setMode('login');
        } else {
          alert("Erreur lors de l'inscription.");
        }
      } catch (error) {
        console.error('Erreur réseau:', error);
        alert('Impossible de contacter le serveur backend.');
      }
    } else {
      alert("Un e-mail de réinitialisation de mot de passe vous a été envoyé.");
      setMode('login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-slate-950 text-slate-100">
      <div className="w-full max-w-md p-8 border shadow-xl bg-slate-900 rounded-2xl border-slate-800">
        
        {/* Branding & Titre Dynamique */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text">
            Ansoumanesylla 
          </h2>
          <p className="mt-2 text-slate-400">
            {mode === 'login' && "Connexion à votre espace gestionnaire"}
            {mode === 'register' && "Créez votre compte pour gérer vos événements"}
            {mode === 'forgot' && "Récupération de votre accès"}
          </p>
        </div>

        {/* Formulaire Unique Adaptatif */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'register' && (
            <div>
              <label className="block mb-1 text-sm font-medium text-slate-300">Nom complet</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 text-white transition-colors border rounded-lg bg-slate-950 border-slate-800 focus:outline-none focus:border-indigo-500"
                placeholder="Ansoumane Sylla"
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium text-slate-300">Adresse Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-white transition-colors border rounded-lg bg-slate-950 border-slate-800 focus:outline-none focus:border-indigo-500"
              placeholder="votre@email.com"
            />
          </div>

          {mode !== 'forgot' && (
            <div>
              <label className="block mb-1 text-sm font-medium text-slate-300">Mot de passe</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 text-white transition-colors border rounded-lg bg-slate-950 border-slate-800 focus:outline-none focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>
          )}

          {mode === 'login' && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => setMode('forgot')}
                className="text-xs text-indigo-400 transition-colors hover:underline"
              >
                Mot de passe oublié ?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white transition-colors bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 shadow-indigo-500/25"
          >
            {mode === 'login' && "Se connecter"}
            {mode === 'register' && "S'inscrire"}
            {mode === 'forgot' && "Réinitialiser mon mot de passe"}
          </button>
        </form>

        {/* Liens de bascule de mode (Modèle Figma) */}
        <div className="mt-6 text-sm text-center text-slate-400">
          {mode === 'login' && (
            <p>
              Pas encore de compte ?{" "}
              <button onClick={() => setMode('register')} className="font-medium text-indigo-400 hover:underline">
                S'inscrire
              </button>
            </p>
          )}
          {mode !== 'login' && (
            <button onClick={() => setMode('login')} className="font-medium text-indigo-400 hover:underline">
              Retour à l'écran de connexion
            </button>
          )}
        </div>

      </div>
    </div>
  );
}