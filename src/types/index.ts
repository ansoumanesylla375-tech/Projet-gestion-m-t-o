export type EventStatus = "brouillon" | "publie" | "termine";

export interface EventItem {
  id: string;
  title: string;
  date: string; // ISO date
  location: string;
  category: string;
  status: EventStatus;
  capacity: number;
  registeredCount: number;
  coverColor: string; // couleur d'accent pour la carte
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  eventId: string;
  registeredAt: string; // ISO date
  status: "confirme" | "en_attente" | "annule";
}
