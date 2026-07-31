import { ReactNode } from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import { EventItem } from "../types";

interface CardProps {
  children: ReactNode;
  className?: string;
}

/** Carte générique, base de tous les blocs du dashboard. */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-card bg-white shadow-card p-5 ${className}`}>
      {children}
    </div>
  );
}

const statusLabel: Record<EventItem["status"], string> = {
  brouillon: "Brouillon",
  publie: "Publié",
  termine: "Terminé",
};

const statusStyle: Record<EventItem["status"], string> = {
  brouillon: "bg-canvas text-ink-muted",
  publie: "bg-ticket-soft text-ticket",
  termine: "bg-line text-ink-muted",
};

interface EventCardProps {
  event: EventItem;
  onViewParticipants: (event: EventItem) => void;
}

/**
 * Carte événement — élément signature du dashboard : la partie gauche
 * (couleur + date) fait office de "souche de billet", séparée du corps
 * par une ligne perforée, avec une encoche demi-cercle de chaque côté.
 */
export function EventCard({ event, onViewParticipants }: EventCardProps) {
  const fillRate = Math.round((event.registeredCount / event.capacity) * 100);
  const dateFormatted = new Date(event.date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="relative flex overflow-hidden rounded-card bg-white shadow-card">
      <div
        className="relative flex w-24 flex-shrink-0 flex-col items-center justify-center gap-1 text-white ticket-notch"
        style={{ backgroundColor: event.coverColor, ["--notch-bg" as any]: "#F6F7FB" }}
      >
        <span className="font-mono text-xs opacity-90">{event.category}</span>
        <span className="font-display text-lg font-semibold leading-tight text-center px-1">
          {dateFormatted}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 border-l border-dashed border-line/0 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-semibold text-ink">{event.title}</h3>
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[event.status]}`}>
            {statusLabel[event.status]}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-muted">
          <span className="inline-flex items-center gap-1">
            <MapPin size={13} /> {event.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar size={13} /> {dateFormatted}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-canvas">
            <div
              className="h-1.5 rounded-full bg-spotlight"
              style={{ width: `${Math.min(fillRate, 100)}%` }}
            />
          </div>
          <span className="whitespace-nowrap font-mono text-xs text-ink-muted">
            {event.registeredCount}/{event.capacity}
          </span>
        </div>

        <button
          onClick={() => onViewParticipants(event)}
          className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-spotlight hover:text-spotlight-dark"
        >
          <Users size={15} /> Voir participants
        </button>
      </div>
    </div>
  );
}
