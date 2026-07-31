import { EventItem, Participant } from "../types";

export const mockEvents: EventItem[] = [
  {
    id: "evt-1",
    title: "Nuit de la Tech Dakar",
    date: "2026-09-12",
    location: "King Fahd Palace, Dakar",
    category: "Conférence",
    status: "publie",
    capacity: 300,
    registeredCount: 214,
    coverColor: "#4F46E5",
  },
  {
    id: "evt-2",
    title: "Atelier Design UI/UX",
    date: "2026-08-03",
    location: "Coworking Sencentre",
    category: "Atelier",
    status: "publie",
    capacity: 60,
    registeredCount: 58,
    coverColor: "#F5A623",
  },
  {
    id: "evt-3",
    title: "Hackathon Étudiants 2026",
    date: "2026-10-21",
    location: "ESP Dakar",
    category: "Compétition",
    status: "brouillon",
    capacity: 150,
    registeredCount: 12,
    coverColor: "#16A34A",
  },
  {
    id: "evt-4",
    title: "Soirée Networking Startups",
    date: "2026-06-14",
    location: "CTIC Dakar",
    category: "Networking",
    status: "termine",
    capacity: 120,
    registeredCount: 120,
    coverColor: "#DC2626",
  },
];

export const mockParticipants: Participant[] = [
  { id: "p-1", name: "Awa Diop", email: "awa.diop@mail.com", eventId: "evt-1", registeredAt: "2026-07-01", status: "confirme" },
  { id: "p-2", name: "Mamadou Fall", email: "m.fall@mail.com", eventId: "evt-1", registeredAt: "2026-07-02", status: "confirme" },
  { id: "p-3", name: "Fatou Sarr", email: "fatou.sarr@mail.com", eventId: "evt-1", registeredAt: "2026-07-05", status: "en_attente" },
  { id: "p-4", name: "Ibrahima Ndiaye", email: "i.ndiaye@mail.com", eventId: "evt-2", registeredAt: "2026-06-20", status: "confirme" },
  { id: "p-5", name: "Aissatou Ba", email: "a.ba@mail.com", eventId: "evt-2", registeredAt: "2026-06-22", status: "annule" },
  { id: "p-6", name: "Ousmane Sy", email: "o.sy@mail.com", eventId: "evt-3", registeredAt: "2026-07-10", status: "en_attente" },
];
