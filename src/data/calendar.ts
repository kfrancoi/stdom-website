export type EventCategory =
  | 'reunion'
  | 'camp'
  | 'we-section'
  | 'we-unite'
  | 'formation'
  | 'ferie'
  | 'conge'
  | 'special';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;       // ISO date YYYY-MM-DD
  endDate?: string;   // for multi-day events
  category: EventCategory;
  description?: string;
  unit?: '67' | '106' | 'both';
}

// Catégories avec leurs libellés et couleurs Tailwind
export const categoryConfig: Record<EventCategory, { label: string; color: string; bg: string }> = {
  reunion:    { label: 'Réunion',           color: 'text-guide-green',  bg: 'bg-guide-green' },
  camp:       { label: 'Camp',              color: 'text-unit-red',     bg: 'bg-unit-red' },
  'we-section': { label: 'WE de section',   color: 'text-guide-purple', bg: 'bg-guide-purple' },
  'we-unite': { label: "WE d'unités",       color: 'text-unit-gold',    bg: 'bg-unit-gold' },
  formation:  { label: 'Formation',         color: 'text-blue-600',     bg: 'bg-blue-600' },
  ferie:      { label: 'Jour férié',        color: 'text-gray-500',     bg: 'bg-gray-400' },
  conge:      { label: 'Congé scolaire',    color: 'text-gray-400',     bg: 'bg-gray-300' },
  special:    { label: 'Événement spécial', color: 'text-orange-500',   bg: 'bg-orange-500' },
};

export const events: CalendarEvent[] = [
  // ── SEPTEMBRE 2025 ──────────────────────────────────────────────────────
  {
    id: 'sep-formation',
    title: 'WE Formation cheffes',
    date: '2025-09-19',
    endDate: '2025-09-20',
    category: 'formation',
    unit: '67',
    description: 'Week-end de formation pour les animatrices de la 67ème.',
  },
  {
    id: 'sep-reunion-passage',
    title: 'Réunion de passage',
    date: '2025-09-21',
    category: 'reunion',
    unit: 'both',
    description: 'Réunion de rentrée et de passage entre sections.',
  },
  {
    id: 'sep-reunion-parents',
    title: 'Réunion + Réunion parents (20h15)',
    date: '2025-09-28',
    category: 'reunion',
    unit: 'both',
    description: 'Réunion des sections suivie d\'une réunion parents à 20h15.',
  },

  // ── OCTOBRE 2025 ────────────────────────────────────────────────────────
  {
    id: 'oct-we-sections',
    title: 'WE de sections',
    date: '2025-10-10',
    endDate: '2025-10-12',
    category: 'we-section',
    unit: 'both',
    description: 'Week-end de sections — premier grand week-end de l\'année !',
  },
  {
    id: 'oct-toussaint',
    title: 'Vacances de Toussaint',
    date: '2025-10-27',
    endDate: '2025-11-03',
    category: 'conge',
  },

  // ── NOVEMBRE 2025 ────────────────────────────────────────────────────────
  {
    id: 'nov-armistice',
    title: 'Armistice',
    date: '2025-11-11',
    category: 'ferie',
  },
  {
    id: 'nov-reunion-9',
    title: 'Réunion',
    date: '2025-11-09',
    category: 'reunion',
    unit: 'both',
  },
  {
    id: 'nov-we-sections',
    title: 'WE de sections',
    date: '2025-11-14',
    endDate: '2025-11-16',
    category: 'we-section',
    unit: 'both',
  },
  {
    id: 'nov-reunion-23',
    title: 'Réunion',
    date: '2025-11-23',
    category: 'reunion',
    unit: 'both',
  },

  // ── DÉCEMBRE 2025 ────────────────────────────────────────────────────────
  {
    id: 'dec-veillees',
    title: 'Veillées de Noël',
    date: '2025-12-29',
    endDate: '2025-12-30',
    category: 'special',
    unit: 'both',
    description: 'Veillées de Noël — un moment de spiritualité et de fraternité pour clôturer l\'année.',
  },

  // ── JANVIER 2026 ─────────────────────────────────────────────────────────
  {
    id: 'jan-reunion-8',
    title: 'Réunion',
    date: '2026-01-08',
    category: 'reunion',
    unit: 'both',
  },

  // ── FÉVRIER 2026 ─────────────────────────────────────────────────────────
  {
    id: 'fev-we-patrouilles',
    title: 'WE patrouilles guides',
    date: '2026-02-24',
    endDate: '2026-02-25',
    category: 'we-section',
    unit: '67',
    description: 'Week-end autonome en patrouille pour les guides.',
  },

  // ── MARS 2026 ────────────────────────────────────────────────────────────
  {
    id: 'mar-reunion-1',
    title: 'Réunion',
    date: '2026-03-01',
    category: 'reunion',
    unit: 'both',
  },
  {
    id: 'mar-24h-velo',
    title: '24h vélo / 5h VTT',
    date: '2026-03-28',
    category: 'special',
    unit: 'both',
    description: 'Participation à la grande course cycliste — moment de convivialité et de service.',
  },
  {
    id: 'mar-reunion-29',
    title: 'Réunion',
    date: '2026-03-29',
    category: 'reunion',
    unit: 'both',
  },

  // ── AVRIL 2026 ───────────────────────────────────────────────────────────
  {
    id: 'avr-paques',
    title: 'Vacances de Pâques',
    date: '2026-04-06',
    endDate: '2026-04-18',
    category: 'conge',
  },
  {
    id: 'avr-reunion-15',
    title: 'Réunion',
    date: '2026-04-15',
    category: 'reunion',
    unit: 'both',
  },
  {
    id: 'avr-we-unite',
    title: "WE d'Unités",
    date: '2026-04-17',
    endDate: '2026-04-19',
    category: 'we-unite',
    unit: 'both',
    description: 'Grand week-end commun 67ème & 106ème avec le Clan. Retrouvailles de toute l\'unité !',
  },
  {
    id: 'avr-reunion-26',
    title: 'Réunion',
    date: '2026-04-26',
    category: 'reunion',
    unit: 'both',
  },

  // ── MAI 2026 ─────────────────────────────────────────────────────────────
  {
    id: 'mai-fete-travail',
    title: 'Fête du Travail',
    date: '2026-05-01',
    category: 'ferie',
  },
  {
    id: 'mai-ascension',
    title: 'Ascension',
    date: '2026-05-14',
    category: 'ferie',
  },
  {
    id: 'mai-pentecote',
    title: 'Pentecôte',
    date: '2026-05-25',
    category: 'ferie',
  },

  // ── JUIN 2026 ────────────────────────────────────────────────────────────
  {
    id: 'jun-we-patrouille',
    title: 'WE patrouille / sizaine',
    date: '2026-06-13',
    endDate: '2026-06-14',
    category: 'we-section',
    unit: 'both',
    description: 'Moment autonome en patrouille ou sizaine avant le grand camp.',
  },

  // ── JUILLET 2026 ─────────────────────────────────────────────────────────
  {
    id: 'jul-camp-guide',
    title: 'Camp Guides',
    date: '2026-07-15',
    endDate: '2026-07-29',
    category: 'camp',
    unit: '67',
    description: 'Grand camp annuel de la 67ème. Dates exactes à confirmer.',
  },
  {
    id: 'jul-pré-camp-guide',
    title: 'Pré-camp Guides',
    date: '2026-07-13',
    endDate: '2026-07-14',
    category: 'camp',
    unit: '67',
    description: 'Pré-camp pour les guides. Dates à confirmer.',
  },
  {
    id: 'jul-camp-guidho',
    title: 'Camp Guide Horizons',
    date: '2026-07-05',
    endDate: '2026-07-18',
    category: 'camp',
    unit: '67',
    description: 'Camp des Guide Horizons. Dates à confirmer.',
  },
  {
    id: 'jul-pré-camp-lutins',
    title: 'Pré-camp Lutins',
    date: '2026-07-17',
    endDate: '2026-07-18',
    category: 'camp',
    unit: '67',
    description: 'Pré-camp pour les lutins. Dates à confirmer.',
  },
  {
    id: 'jul-camp-lutins',
    title: 'Camp Lutins',
    date: '2026-07-19',
    endDate: '2026-07-29',
    category: 'camp',
    unit: '67',
    description: 'Grand camp des lutins. Dates à confirmer.',
  },
];

// Renvoie les prochains événements à partir d'aujourd'hui
export function getUpcomingEvents(count = 5): CalendarEvent[] {
  const today = new Date().toISOString().split('T')[0];
  return events
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, count);
}

// Renvoie les événements d'un mois donné (YYYY-MM)
export function getEventsByMonth(yearMonth: string): CalendarEvent[] {
  return events
    .filter((e) => e.date.startsWith(yearMonth))
    .sort((a, b) => a.date.localeCompare(b.date));
}
