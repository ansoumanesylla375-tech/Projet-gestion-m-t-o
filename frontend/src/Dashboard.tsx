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
  import { useState, useEffect } from 'react';

interface TechEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  participants: number;
}

export default function Dashboard() {
  const [events, setEvents] = useState<TechEvent[]>([]);

  // États pour le formulaire de création
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Intelligence Artificielle');

  // Charger les événements depuis le backend NestJS au démarrage
  useEffect(() => {
    fetch('http://localhost:3000/events')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEvents(data);
        }
      })
      .catch((err) => console.error("Erreur lors du chargement des événements :", err));
  }, []);

  // Fonction pour créer un événement via le backend
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          date,
          location,
          category,
          participants: 0,
        }),
      });

      if (response.ok) {
        const newEvent = await response.json();
        setEvents([...events, newEvent]);
        setTitle('');
        setDate('');
        setLocation('');
        alert('Événement créé avec succès !');
      } else {
        alert("Erreur lors de la création de l'événement.");
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
  };

  return (
    <div className="p-6 mx-auto max-w-7xl">
      <h1 className="mb-6 text-3xl font-bold">Tableau de Bord - Gestion d'Événements</h1>

      {/* Formulaire de création */}
      <form onSubmit={handleCreateEvent} className="grid grid-cols-1 gap-4 p-6 mb-8 bg-white rounded-lg shadow-md md:grid-cols-4">
        <input
          type="text"
          placeholder="Titre de l'événement"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Lieu"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="Intelligence Artificielle">Intelligence Artificielle</option>
          <option value="Développement Web">Développement Web</option>
          <option value="Cybersécurité">Cybersécurité</option>
        </select>
        <button
          type="submit"
          className="p-2 text-white transition bg-blue-600 rounded md:col-span-4 hover:bg-blue-700"
        >
          Ajouter l'événement
        </button>
      </form>

      {/* Liste des événements */}
      <h2 className="mb-4 text-2xl font-semibold">Événements enregistrés</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {events.map((ev) => (
          <div key={ev.id} className="p-4 bg-white border rounded-lg shadow">
            <h3 className="text-lg font-bold text-blue-600">{ev.title}</h3>
            <p className="mt-1 text-sm text-gray-600">📅 {ev.date}</p>
            <p className="text-sm text-gray-600">📍 {ev.location}</p>
            <span className="inline-block px-2 py-1 mt-3 text-xs text-gray-800 bg-gray-100 rounded">
              {ev.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

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
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 md:flex-row">
      
      {/* Sidebar de navigation gauche (Style Dashboard Figma) */}
      <aside className="flex flex-col justify-between w-full p-6 border-b md:w-64 bg-slate-900 md:border-b-0 md:border-r border-slate-800">
        <div>
          <h2 className="mb-8 text-xl font-bold text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text">
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
          className="w-full py-2 mt-8 text-sm font-medium transition-colors border rounded-lg bg-slate-950 hover:bg-red-950/30 text-slate-400 hover:text-red-400 border-slate-800 hover:border-red-900/50"
        >
          Déconnexion
        </button>
      </aside>

      {/* Contenu principal */}
      <main className="flex-grow w-full p-4 mx-auto sm:p-8 max-w-7xl">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2">
          <div className="p-6 border bg-slate-900 border-slate-800 rounded-xl">
            <p className="text-sm font-medium text-slate-400">Total Événements</p>
            <p className="mt-1 text-3xl font-bold text-white">{totalEvents}</p>
          </div>
          <div className="p-6 border bg-slate-900 border-slate-800 rounded-xl">
            <p className="text-sm font-medium text-slate-400">Total Participants cumulés</p>
            <p className="mt-1 text-3xl font-bold text-emerald-400">{totalParticipants}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Formulaire de création (CRUD) */}
          <div className="p-6 border lg:col-span-1 bg-slate-900 border-slate-800 rounded-xl h-fit">
            <h3 className="mb-4 text-lg font-bold text-white">Créer un atelier</h3>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-400">Titre de l'événement</label>
                <input
                  type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm text-white border rounded-lg bg-slate-950 border-slate-800 focus:outline-none focus:border-indigo-500"
                  placeholder="Ex: Conférence Docker"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-400">Date</label>
                <input
                  type="date" required value={date} onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm text-white border rounded-lg bg-slate-950 border-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-400">Lieu</label>
                <input
                  type="text" required value={location} onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 text-sm text-white border rounded-lg bg-slate-950 border-slate-800 focus:outline-none focus:border-indigo-500"
                  placeholder="Ex: En ligne ou Salle A"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-400">Catégorie</label>
                <select
                  value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm text-white border rounded-lg bg-slate-950 border-slate-800 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Intelligence Artificielle">Intelligence Artificielle</option>
                  <option value="Développement Web">Développement Web</option>
                  <option value="Sécurité">Sécurité</option>
                </select>
              </div>
              <button type="submit" className="w-full py-2 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 shadow-indigo-500/20">
                Ajouter à la liste
              </button>
            </form>
          </div>

          {/* Liste de gestion des événements créés */}
          <div className="overflow-hidden border lg:col-span-2 bg-slate-900 border-slate-800 rounded-xl">
            <div className="px-6 py-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Événements enregistrés</h3>
            </div>
            
            <div className="overflow-x-auto divide-y divide-slate-800">
              {events.length === 0 ? (
                <p className="py-8 text-sm text-center text-slate-500">Aucun événement pour le moment.</p>
              ) : (
                events.map((event) => (
                  <div key={event.id} className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
                    <div>
                      <h4 className="text-base font-semibold text-white">{event.title}</h4>
                      <div className="flex flex-wrap mt-1 text-xs gap-x-4 gap-y-1 text-slate-400">
                        <span>📅 {event.date}</span>
                        <span>📍 {event.location}</span>
                        <span className="font-medium text-indigo-400">🏷️ {event.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-6 sm:justify-end">
                      <div className="text-right">
                        <span className="block text-sm font-bold text-slate-200">{event.participants}</span>
                        <span className="tracking-wider uppercase text-xxs text-slate-500">Participants</span>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-2 text-sm transition-colors rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/20"
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