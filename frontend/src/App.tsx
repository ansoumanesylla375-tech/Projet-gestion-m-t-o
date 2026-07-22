import { useState } from 'react'
import Navbar from './Navbar'
import EventCard from './EventCard'

const EVENTS_DATA = [
  {
    id: 1,
    title: "Conférence IA & Futur du Web",
    date: "15 Octobre 2026 à 14:00",
    location: "Paris & En ligne",
    category: "Intelligence Artificielle",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Workshop Masterclass React & Tailwind v4",
    date: "22 Octobre 2026 à 09:30",
    location: "En distanciel",
    category: "Développement Web",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Hackathon Cybersécurité & Blockchain",
    date: "05 Novembre 2026 à 18:00",
    location: "Dakar Tech Hub",
    category: "Sécurité",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80"
  }
];

function App() {
  // Ce state va stocker la catégorie sélectionnée ("Tous", "Sécurité", etc.)
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  // Liste des catégories pour générer les boutons automatiquement
  const categories = ["Tous", "Intelligence Artificielle", "Développement Web", "Sécurité"];

  // On filtre les événements selon le bouton cliqué
  const filteredEvents = selectedCategory === "Tous"
    ? EVENTS_DATA
    : EVENTS_DATA.filter(event => event.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main className="w-full px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 grow">
        {/* Header principal */}
        <div className="mt-8 mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text">
            Gestion d'Événements Tech
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400">
            Découvrez, planifiez et gérez vos ateliers technologiques en toute simplicité.
          </p>
        </div>

        {/* Barre de boutons de filtrage */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105"
                  : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Section Titre Dynamique */}
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-slate-800">
          <h2 className="text-2xl font-bold text-white">
            {selectedCategory === "Tous" ? "Événements à la une" : selectedCategory}
          </h2>
          <span className="text-sm font-medium text-indigo-400">
            {filteredEvents.length} {filteredEvents.length > 1 ? "ateliers disponibles" : "atelier disponible"}
          </span>
        </div>

        {/* Grille d'événements filtrés */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard 
                key={event.id}
                title={event.title}
                date={event.date}
                location={event.location}
                category={event.category}
                image={event.image}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center border bg-slate-900/50 rounded-xl border-slate-800">
            <p className="text-slate-400">Aucun événement trouvé dans cette catégorie.</p>
          </div>
        )}
      </main>

      <footer className="py-6 text-sm text-center border-t border-slate-900 bg-slate-950 text-slate-500">
        © 2026 Ansoumanesylla tech. Tous droits réservés.
      </footer>
    </div>
  )
}

export default App