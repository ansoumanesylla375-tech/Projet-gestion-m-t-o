import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="border-b border-slate-900 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo cliquable pour revenir à l'accueil */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white">
            <span className="text-indigo-500">📅</span> Ansoumanesylla tech
          </Link>

          {/* Bouton Connexion relié à la page d'authentification */}
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-md shadow-indigo-500/10"
            >
              Connexion
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )
}