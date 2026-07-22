import { Calendar, MapPin, Tag } from 'lucide-react';

// Ici on définit ce qu'une carte a besoin de recevoir comme informations
interface EventCardProps {
  title: string;
  date: string;
  location: string;
  category: string;
  image: string;
}

export default function EventCard({ title, date, location, category, image }: EventCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:scale-[1.02] hover:border-slate-700 transition-all duration-300 shadow-lg flex flex-col">
      {/* Image de l'événement */}
      <div className="h-48 w-full overflow-hidden relative">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          <Tag className="h-3 w-3" />
          {category}
        </span>
      </div>

      {/* Corps de la carte */}
      <div className="p-5 flex flex-col grow">
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{title}</h3>
        
        <div className="space-y-2 text-slate-400 text-sm mb-5">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-indigo-400" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-indigo-400" />
            <span>{location}</span>
          </div>
        </div>

        {/* Bouton d'action */}
        <button className="mt-auto w-full bg-slate-800 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg transition-colors border border-slate-700 hover:border-indigo-500">
          Voir les détails
        </button>
      </div>
    </div>
  );
}