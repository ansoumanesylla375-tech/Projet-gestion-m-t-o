import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { Card, EventCard } from "../components/Card";
import Table, { Column } from "../components/Table";
import WeatherWidget from "../components/WeatherWidget";
import { mockEvents, mockParticipants } from "../data/mockData";
import { EventItem, Participant } from "../types";

const participantStatusLabel: Record<Participant["status"], string> = {
  confirme: "Confirmé",
  en_attente: "En attente",
  annule: "Annulé",
};

const participantStatusStyle: Record<Participant["status"], string> = {
  confirme: "bg-green-50 text-success",
  en_attente: "bg-ticket-soft text-ticket",
  annule: "bg-red-50 text-danger",
};

export default function Dashboard() {
  const [events, setEvents] = useState<EventItem[]>(mockEvents);
  const [search, setSearch] = useState("");
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const filteredEvents = useMemo(
    () => events.filter((e) => e.title.toLowerCase().includes(search.toLowerCase())),
    [events, search]
  );

  const participantsForSelected = useMemo(
    () => mockParticipants.filter((p) => p.eventId === selectedEvent?.id),
    [selectedEvent]
  );

  const columns: Column<Participant>[] = [
    { key: "name", header: "Nom", render: (p) => <span className="font-medium">{p.name}</span> },
    { key: "email", header: "Email", render: (p) => p.email },
    {
      key: "registeredAt",
      header: "Inscrit le",
      render: (p) => new Date(p.registeredAt).toLocaleDateString("fr-FR"),
    },
    {
      key: "status",
      header: "Statut",
      render: (p) => (
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${participantStatusStyle[p.status]}`}>
          {participantStatusLabel[p.status]}
        </span>
      ),
    },
  ];

  function handleCreateEvent() {
    if (!newTitle || !newDate || !newLocation) return;

    const created: EventItem = {
      id: `evt-${Date.now()}`,
      title: newTitle,
      date: newDate,
      location: newLocation,
      category: "Nouveau",
      status: "brouillon",
      capacity: 100,
      registeredCount: 0,
      coverColor: "#4F46E5",
    };

    setEvents((prev) => [created, ...prev]);
    setNewTitle("");
    setNewDate("");
    setNewLocation("");
    setCreateOpen(false);
  }

  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />

      <main className="flex-1 px-8 py-8">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink">Mes événements</h1>
            <p className="text-sm text-ink-muted">
              {events.length} événement{events.length > 1 ? "s" : ""} au total
            </p>
          </div>
          <Button icon={<Plus size={16} />} onClick={() => setCreateOpen(true)}>
            Créer événement
          </Button>
        </header>

        <div className="mb-6 max-w-sm">
          <WeatherWidget city="Dakar" />
        </div>

        <div className="mb-6 max-w-sm">
          <Input
            placeholder="Rechercher un événement..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <section className="mb-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} onViewParticipants={setSelectedEvent} />
          ))}
        </section>

        {selectedEvent && (
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">
                Participants — {selectedEvent.title}
              </h2>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-sm text-ink-muted hover:text-ink"
              >
                Fermer
              </button>
            </div>
            <Table
              columns={columns}
              data={participantsForSelected}
              rowKey={(p) => p.id}
              emptyMessage="Aucun participant inscrit pour cet événement"
            />
          </Card>
        )}
      </main>

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setCreateOpen(false)}
        title="Créer un événement"
        footer={
          <>
            <Button variant="secondary" onClick={() => setCreateOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateEvent}>Créer</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Titre de l'événement"
            placeholder="Ex : Soirée Networking Startups"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Input
            label="Date"
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <Input
            label="Lieu"
            placeholder="Ex : CTIC Dakar"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
}
