import { useState, useEffect } from 'react';

interface TechEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  participants: number;
}

const DEFAULT_EVENTS: TechEvent[] = [
  { id: 1, title: "Conférence IA & Futur du Web", date: "2026-10-15", location: "Paris & En ligne", category: "Intelligence Artificielle", participants: 142 },
  { id: 2, title: "Workshop Masterclass React & Tailwind v4", date: "2026-10-22", location: "En distanciel", category: "Développement Web", participants: 89 },
  { id: 3, title: "Hackathon Cybersécurité & Blockchain", date: "2026-11-05", location: "Dakar Tech Hub", category: "Sécurité", participants: 64 }
];

export default function Dashboard() {
  const [events, setEvents] = useState<TechEvent[]>([]);
  
  // États pour le formulaire de création
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Intelligence Artificielle');

  // API Mock : Charger depuis le localStorage au démarrage
  useEffect(() => {
    const saved = localStorage.getItem('tech_events');
    if (saved) {
      setEvents(JSON.parse(saved));
    } else {
      setEvents(DEFAULT_EVENTS);
      localStorage.setItem('tech_events', JSON.stringify(DEFAULT_EVENTS));
    }
  }, []);

  // Action : Créer un événement (CRUD)
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: TechEvent = {
      id: Date.now(),
      title,
      date,
      location,
      category,
      participants: 0 // Nouveau donc 0 participant au début
    };
    const updated = [newEvent, ...events];
    setEvents(updated);
    localStorage.setItem('tech_events', JSON.stringify(updated));
    
    // Réinitialiser les champs
    setTitle('');
    setDate('');
    setLocation('');
  };

  // Action : Supprimer un événement (CRUD)
  const handleDeleteEvent = (id: number) => {
    const updated = events.filter(event => event.id !== id);
    setEvents(updated);
    localStorage.setItem('tech_events', JSON.stringify(updated));
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
  };

  // Calcul des statistiques pour le modèle Figma
  const totalEvents = events.length;
  const totalParticipants = events.reduce((sum, e) => sum + e.participants, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar de navigation gauche (Style Dashboard Figma) */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-8">
            Dashboard Tech
          </h2>
          <nav className="space-y-2">
            <div className="bg-indigo-600/10 text-indigo-400 px-4 py-2.5 rounded-lg font-medium text-sm">
              📊 Vue générale
            </div>
          </nav>
        </div>
        <button 
          onClick={handleLogout}
          className="mt-8 w-full bg-slate-950 hover:bg-red-950/30 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-900/50 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Déconnexion
        </button>
      </aside>

      {/* Contenu principal */}
      <main className="flex-grow p-4 sm:p-8 max-w-7xl mx-auto w-full">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <p className="text-sm text-slate-400 font-medium">Total Événements</p>
            <p className="text-3xl font-bold text-white mt-1">{totalEvents}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <p className="text-sm text-slate-400 font-medium">Total Participants cumulés</p>
            <p className="text-3xl font-bold text-emerald-400 mt-1">{totalParticipants}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire de création (CRUD) */}
          <div className="lg:col-span-1 bg-slate-900 border border-slate-800 p-6 rounded-xl h-fit">
            <h3 className="text-lg font-bold text-white mb-4">Créer un atelier</h3>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Titre de l'événement</label>
                <input
                  type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Ex: Conférence Docker"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Date</label>
                <input
                  type="date" required value={date} onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Lieu</label>
                <input
                  type="text" required value={location} onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Ex: En ligne ou Salle A"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Catégorie</label>
                <select
                  value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Intelligence Artificielle">Intelligence Artificielle</option>
                  <option value="Développement Web">Développement Web</option>
                  <option value="Sécurité">Sécurité</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg text-sm transition-colors shadow-lg shadow-indigo-500/20">
                Ajouter à la liste
              </button>
            </form>
          </div>

          {/* Liste de gestion des événements créés */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Événements enregistrés</h3>
            </div>
            
            <div className="divide-y divide-slate-800 overflow-x-auto">
              {events.length === 0 ? (
                <p className="text-slate-500 text-center py-8 text-sm">Aucun événement pour le moment.</p>
              ) : (
                events.map((event) => (
                  <div key={event.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-white text-base">{event.title}</h4>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 mt-1">
                        <span>📅 {event.date}</span>
                        <span>📍 {event.location}</span>
                        <span className="text-indigo-400 font-medium">🏷️ {event.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="text-right">
                        <span className="block text-sm font-bold text-slate-200">{event.participants}</span>
                        <span className="text-xxs text-slate-500 uppercase tracking-wider">Participants</span>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-slate-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-950/20 transition-colors text-sm"
                        title="Supprimer l'événement"
                      >
                        🗑️ Supprimer
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}