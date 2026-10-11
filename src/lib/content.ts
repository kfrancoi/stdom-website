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
  contact?: string;
  color: string;
  accentColor: string;
  staff: StaffMember[];
  blason?: string;
  illustration?: string;
  // Rubriques facultatives : HTML vide = rubrique masquée
  valeurs: string;
  infosPratiques: string;
  uniforme: string;
  equipes: {
    titre?: string;
    intro?: string;
    liste: { nom: string; image?: string; description?: string }[];
  };
  photos: { src: string; legende?: string }[];
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
  camp: { label: 'Camp', color: 'text-accent', bg: 'bg-accent' },
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
  baladins: { color: 'accent', accentColor: 'unit-gold' },
  louveteaux: { color: 'accent', accentColor: 'unit-gold' },
  eclaireurs: { color: 'accent', accentColor: 'unit-gold' },
  pionniers: { color: 'accent', accentColor: 'unit-gold' },
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
  const sections = await Promise.all(
    entries.map(async ({ slug, entry }) => ({
      slug,
      name: entry.name,
      type: entry.type,
      typeLabel: entry.typeLabel,
      ageRange: entry.ageRange,
      description: entry.description,
      contact: clean(entry.contact),
      order: entry.order ?? 0,
      ...(sectionColors[entry.type] ?? sectionColors.lutins),
      staff: entry.staff.map((m) => ({
        totem: m.totem,
        name: m.name,
        role: clean(m.role),
        phone: clean(m.phone),
        email: clean(m.email),
      })),
      blason: clean(entry.blason),
      // Visuel de thème de la section, affiché tant qu'il n'y a pas de photos.
      illustration: clean(entry.illustration),
      valeurs: markdocToHtml(await entry.valeurs()),
      infosPratiques: markdocToHtml(await entry.infosPratiques()),
      uniforme: markdocToHtml(await entry.uniforme()),
      equipes: {
        titre: clean(entry.equipes.titre),
        intro: clean(entry.equipes.intro),
        liste: entry.equipes.liste.map((e) => ({
          nom: e.nom,
          image: clean(e.image),
          description: clean(e.description),
        })),
      },
      // Pas de photo dans le CMS : liste vide, les vues affichent leur propre
      // visuel de remplacement (pas d'image fantôme à charger).
      photos: entry.photos
        .filter((p) => p.image)
        .map((p) => ({ src: p.image as string, legende: clean(p.legende) })),
    }))
  );
  return sections.sort((a, b) => a.order - b.order);
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

// ── Inscriptions ─────────────────────────────────────────────────────────────

export async function getInscriptions() {
  const entry = await reader.singletons.inscriptions.read();
  return {
    open: entry?.open ?? false,
    message: clean(entry?.message?.trim()),
  };
}

// ── Documents & liens ────────────────────────────────────────────────────────

export type Unite = 'both' | '67' | '106';

// Documents propres à chaque unité, regroupés dans « Documents à remplir »
export const adminDocCategories = ['sante', 'autorisations', 'droit-image'];

export async function getDocuments() {
  const entries = await reader.collections.documents.all();
  return entries
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      description: clean(entry.description),
      categorie: entry.categorie,
      unite: (entry.unite ?? 'both') as Unite,
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

type PageSingleton =
  | 'histoire'
  | 'fonctionnement'
  | 'presence'
  | 'reunions'
  | 'weekends'
  | 'grandCamp'
  | 'communication'
  | 'servicesPage'
  | 'uniformes';

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

export async function getCotisations() {
  const entry = await reader.singletons.cotisations.read();
  if (!entry) return null;
  return {
    title: entry.title,
    intro: clean(entry.intro),
    cotisation: markdocToHtml(await entry.cotisation()),
    assurance: markdocToHtml(await entry.assurance()),
    camp: markdocToHtml(await entry.camp()),
  };
}

// ── Uniforme ─────────────────────────────────────────────────────────────────

export const pointDeVenteLabels: Record<string, string> = {
  local: 'Au local',
  scouterie: 'Scouterie',
  'en-ligne': 'En ligne',
  'seconde-main': 'Seconde main',
};

export async function getUniforme() {
  const entry = await reader.singletons.uniformes.read();
  if (!entry) return null;
  return {
    title: entry.title,
    intro: clean(entry.intro),
    html: markdocToHtml(await entry.content()),
    pointsDeVente: entry.pointsDeVente.map((p) => ({
      nom: p.nom,
      type: p.type,
      unite: p.unite as Unite,
      details: clean(p.details),
      lien: clean(p.lien),
    })),
    articles: entry.articles.map((a) => ({
      nom: a.nom,
      unite: a.unite as Unite,
      ou: [...a.ou],
      remarque: clean(a.remarque),
    })),
    insignes: entry.insignes.map((g) => ({
      titre: g.titre,
      unite: g.unite as Unite,
      description: clean(g.description),
      items: g.items.map((i) => ({
        nom: i.nom,
        image: clean(i.image),
        legende: clean(i.legende),
      })),
    })),
    placement: entry.placement.map((p) => ({
      titre: p.titre,
      unite: p.unite as Unite,
      image: clean(p.image),
      texte: clean(p.texte),
    })),
  };
}

// ── Temps forts ──────────────────────────────────────────────────────────────

export async function getTempsForts() {
  const entries = await reader.collections.tempsForts.all();
  return entries
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      periode: clean(entry.periode),
      unite: entry.unite as Unite,
      description: clean(entry.description),
      image: clean(entry.image),
      order: entry.order ?? 0,
    }))
    .sort((a, b) => a.order - b.order);
}

// ── Chiffres clés ────────────────────────────────────────────────────────────

// Animés et animateurs : saisis dans le CMS. Sections : comptées dans les
// collections, pour rester à jour sans y penser.
export async function getChiffres() {
  const c = await reader.singletons.chiffres.read();
  const [s67, s106] = await Promise.all([getSections67(), getSections106()]);
  const countByType = (list: Section[]) =>
    list.reduce<Record<string, number>>((acc, s) => {
      acc[s.type] = (acc[s.type] ?? 0) + 1;
      return acc;
    }, {});
  const unit67 = {
    animes: c?.animes67 ?? null,
    animateurs: c?.animateurs67 ?? null,
    sections: s67.length,
    parType: countByType(s67),
  };
  const unit106 = {
    animes: c?.animes106 ?? null,
    animateurs: c?.animateurs106 ?? null,
    sections: s106.length,
    parType: countByType(s106),
  };
  const sum = (a: number | null, b: number | null) => (a === null || b === null ? null : a + b);
  return {
    unit67,
    unit106,
    total: {
      animes: sum(unit67.animes, unit106.animes),
      animateurs: sum(unit67.animateurs, unit106.animateurs),
      sections: unit67.sections + unit106.sections,
    },
  };
}

// ── Bons plans & services ────────────────────────────────────────────────────

export async function getServices() {
  const entries = await reader.collections.services.all();
  return entries
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      type: entry.type,
      icone: clean(entry.icone),
      proposePar: clean(entry.proposePar),
      description: clean(entry.description),
      lien: clean(entry.lien),
      order: entry.order ?? 0,
    }))
    .sort((a, b) => a.order - b.order);
}

// ── Soutiens (remerciements) ─────────────────────────────────────────────────

export async function getSoutiens() {
  const entries = await reader.collections.soutiens.all();
  return entries
    .map(({ slug, entry }) => ({
      slug,
      nom: entry.nom,
      description: clean(entry.description),
      logo: clean(entry.logo),
      lien: clean(entry.lien),
      order: entry.order ?? 0,
    }))
    .sort((a, b) => a.order - b.order);
}
