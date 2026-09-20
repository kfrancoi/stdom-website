/**
 * Couche de lecture du contenu Keystatic (src/content/*).
 * Toutes les fonctions sont exécutées au build — le site reste 100% statique.
 */
import { createReader } from '@keystatic/core/reader';
import Markdoc from '@markdoc/markdoc';
import keystaticConfig from '../../keystatic.config';

export const reader = createReader(process.cwd(), keystaticConfig);

// ── Types (repris de src/data, conservés pour les pages) ─────────────────────

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
  date: string;
  endDate?: string;
  category: EventCategory;
  description?: string;
  unit?: '67' | '106' | 'both';
}

export interface StaffMember {
  totem: string;
  name: string;
  role?: string;
  phone?: string;
  email?: string;
}

export interface Section {
  slug: string;
  name: string;
  type: string;
  typeLabel: string;
  ageRange: string;
  description: string;
  contact: string;
  color: string;
  accentColor: string;
  staff: StaffMember[];
  photos: string[];
}

export interface Flash {
  slug: string;
  title: string;
  date: string;
  message: string;
  link?: string;
  linkLabel?: string;
}

// Libellés et couleurs des catégories d'événements (présentation → code)
export const categoryConfig: Record<
  EventCategory,
  { label: string; color: string; bg: string }
> = {
  reunion: { label: 'Réunion', color: 'text-guide-green', bg: 'bg-guide-green' },
  camp: { label: 'Camp', color: 'text-unit-red', bg: 'bg-unit-red' },
  'we-section': { label: 'WE de section', color: 'text-guide-purple', bg: 'bg-guide-purple' },
  'we-unite': { label: "WE d'unités", color: 'text-unit-gold', bg: 'bg-unit-gold' },
  formation: { label: 'Formation', color: 'text-blue-600', bg: 'bg-blue-600' },
  ferie: { label: 'Jour férié', color: 'text-gray-500', bg: 'bg-gray-400' },
  conge: { label: 'Congé scolaire', color: 'text-gray-400', bg: 'bg-gray-300' },
  special: { label: 'Événement spécial', color: 'text-orange-500', bg: 'bg-orange-500' },
};

// Couleurs des sections, dérivées du type (présentation → code)
const sectionColors: Record<string, { color: string; accentColor: string }> = {
  lutins: { color: 'guide-green', accentColor: 'guide-purple' },
  guides: { color: 'guide-purple', accentColor: 'guide-green' },
  horizons: { color: 'guide-green', accentColor: 'guide-purple' },
  baladins: { color: 'unit-red', accentColor: 'unit-gold' },
  louveteaux: { color: 'unit-red', accentColor: 'unit-gold' },
  eclaireurs: { color: 'unit-red', accentColor: 'unit-gold' },
  pionniers: { color: 'unit-red', accentColor: 'unit-gold' },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const clean = (s: string | null | undefined) => (s ? s : undefined);

// ── Événements ───────────────────────────────────────────────────────────────

export async function getEvents(): Promise<CalendarEvent[]> {
  const entries = await reader.collections.evenements.all();
  return entries
    .map(({ slug, entry }) => ({
      id: slug,
      title: entry.title,
      date: entry.date ?? '',
      endDate: clean(entry.endDate),
      category: entry.category as EventCategory,
      unit: (entry.unit ?? 'both') as CalendarEvent['unit'],
      description: clean(entry.description),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function getUpcomingEvents(count = 5): Promise<CalendarEvent[]> {
  const today = new Date().toISOString().split('T')[0];
  return (await getEvents()).filter((e) => e.date >= today).slice(0, count);
}

// ── Staffs ───────────────────────────────────────────────────────────────────

export async function getStaffs() {
  const s = await reader.singletons.staffs.read();
  const map = (arr: readonly StaffMember[] | undefined) =>
    (arr ?? []).map((m) => ({
      totem: m.totem,
      name: m.name,
      role: clean(m.role) ?? '',
      phone: clean(m.phone),
      email: clean(m.email),
    }));
  return {
    staff67: map(s?.staff67),
    staff106: map(s?.staff106),
    asblMembers: map(s?.asbl),
  };
}

// ── Sections ─────────────────────────────────────────────────────────────────

async function getSections(
  collection: 'sections67' | 'sections106'
): Promise<Section[]> {
  const entries = await reader.collections[collection].all();
  return entries
    .map(({ slug, entry }) => ({
      slug,
      name: entry.name,
      type: entry.type,
      typeLabel: entry.typeLabel,
      ageRange: entry.ageRange,
      description: entry.description,
      contact: entry.contact,
      order: entry.order ?? 0,
      ...(sectionColors[entry.type] ?? sectionColors.lutins),
      staff: entry.staff.map((m) => ({
        totem: m.totem,
        name: m.name,
        role: clean(m.role),
        phone: clean(m.phone),
        email: clean(m.email),
      })),
      // Pas de photo dans le CMS : liste vide, les vues affichent leur propre
      // visuel de remplacement (pas d'image fantôme à charger).
      photos: entry.photos.filter(Boolean) as string[],
    }))
    .sort((a, b) => a.order - b.order);
}

export const getSections67 = () => getSections('sections67');
export const getSections106 = () => getSections('sections106');

// ── Infos flash ──────────────────────────────────────────────────────────────

export async function getActiveFlashs(): Promise<Flash[]> {
  const today = new Date().toISOString().split('T')[0];
  const entries = await reader.collections.flashs.all();
  return entries
    .filter(({ entry }) => !entry.showUntil || entry.showUntil >= today)
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      date: entry.date ?? '',
      message: entry.message,
      link: clean(entry.link),
      linkLabel: clean(entry.linkLabel),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

// ── Documents & liens ────────────────────────────────────────────────────────

export async function getDocuments() {
  const entries = await reader.collections.documents.all();
  return entries
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      description: clean(entry.description),
      categorie: entry.categorie,
      file: entry.file,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export async function getLiens() {
  const entries = await reader.collections.liens.all();
  return entries
    .map(({ slug, entry }) => ({
      slug,
      label: entry.label,
      url: entry.url ?? '#',
      description: clean(entry.description),
      categorie: entry.categorie,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

// ── Pages de contenu (Markdoc → HTML) ────────────────────────────────────────

function markdocToHtml(content: unknown): string {
  const node =
    typeof content === 'string'
      ? Markdoc.parse(content)
      : ((content as { node?: unknown })?.node ?? content);
  const renderable = Markdoc.transform(node as Parameters<typeof Markdoc.transform>[0]);
  return Markdoc.renderers.html(renderable);
}

export interface ContentPage {
  title: string;
  intro?: string;
  html: string;
}

type PageSingleton = 'histoire' | 'presence' | 'grandCamp' | 'cotisations' | 'uniformes';

export async function getPage(name: PageSingleton): Promise<ContentPage | null> {
  const entry = await reader.singletons[name].read();
  if (!entry) return null;
  return {
    title: entry.title,
    intro: clean(entry.intro),
    html: markdocToHtml(await entry.content()),
  };
}

export async function getChartes() {
  const entries = await reader.collections.chartes.all();
  return Promise.all(
    entries.map(async ({ slug, entry }) => ({
      slug,
      title: entry.title,
      intro: clean(entry.intro),
      html: markdocToHtml(await entry.content()),
    }))
  );
}
