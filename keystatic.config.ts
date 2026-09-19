import { config, fields, collection, singleton } from '@keystatic/core';

// ── Champs réutilisables ─────────────────────────────────────────────────────

const staffMemberFields = fields.object({
  totem: fields.text({ label: 'Totem', validation: { isRequired: true } }),
  name: fields.text({ label: 'Nom complet', validation: { isRequired: true } }),
  role: fields.text({ label: 'Rôle (optionnel)' }),
  phone: fields.text({ label: 'Téléphone (optionnel)' }),
  email: fields.text({ label: 'Email (optionnel)' }),
});

const staffArray = (label: string) =>
  fields.array(staffMemberFields, {
    label,
    itemLabel: (props) =>
      `${props.fields.totem.value} — ${props.fields.name.value}`,
  });

// Page de contenu libre (titre + texte riche)
const contentPage = (label: string, slug: string) =>
  singleton({
    label,
    path: `src/content/pages/${slug}`,
    format: { contentField: 'content' },
    schema: {
      title: fields.text({ label: 'Titre', validation: { isRequired: true } }),
      intro: fields.text({
        label: 'Introduction (affichée sous le titre)',
        multiline: true,
      }),
      content: fields.markdoc({ label: 'Contenu' }),
    },
  });

// ── Configuration ────────────────────────────────────────────────────────────

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'Saint-Dom — Gestion du contenu' },
    navigation: {
      Actualités: ['flashs', 'evenements'],
      Unité: ['staffs', 'histoire', 'presence'],
      Sections: ['sections67', 'sections106'],
      Pratique: ['grandCamp', 'cotisations', 'uniformes'],
      Documents: ['documents', 'chartes', 'liens'],
    },
  },

  collections: {
    // ── Infos flash (annonces en page d'accueil) ────────────────────────────
    flashs: collection({
      label: 'Infos flash',
      slugField: 'title',
      path: 'src/content/flashs/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Titre' } }),
        date: fields.date({
          label: 'Date de publication',
          validation: { isRequired: true },
        }),
        showUntil: fields.date({
          label: "Afficher jusqu'au (vide = toujours affiché)",
        }),
        message: fields.text({
          label: 'Message',
          multiline: true,
          validation: { isRequired: true },
        }),
        link: fields.url({ label: 'Lien (optionnel)' }),
        linkLabel: fields.text({ label: 'Texte du lien (optionnel)' }),
      },
    }),

    // ── Calendrier ──────────────────────────────────────────────────────────
    evenements: collection({
      label: 'Événements (calendrier)',
      slugField: 'title',
      path: 'src/content/evenements/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Titre' } }),
        date: fields.date({
          label: 'Date (ou 1er jour)',
          validation: { isRequired: true },
        }),
        endDate: fields.date({ label: 'Dernier jour (si plusieurs jours)' }),
        category: fields.select({
          label: 'Catégorie',
          options: [
            { label: 'Réunion', value: 'reunion' },
            { label: 'Camp', value: 'camp' },
            { label: 'WE de section', value: 'we-section' },
            { label: "WE d'unités", value: 'we-unite' },
            { label: 'Formation', value: 'formation' },
            { label: 'Jour férié', value: 'ferie' },
            { label: 'Congé scolaire', value: 'conge' },
            { label: 'Événement spécial', value: 'special' },
          ],
          defaultValue: 'reunion',
        }),
        unit: fields.select({
          label: 'Unité concernée',
          options: [
            { label: 'Les deux unités', value: 'both' },
            { label: '67ème (Guides)', value: '67' },
            { label: '106ème (Scouts)', value: '106' },
          ],
          defaultValue: 'both',
        }),
        description: fields.text({ label: 'Description', multiline: true }),
      },
    }),

    // ── Sections ────────────────────────────────────────────────────────────
    sections67: collection({
      label: 'Sections 67ème (Guides)',
      slugField: 'name',
      path: 'src/content/sections67/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Nom de la section' } }),
        type: fields.select({
          label: 'Type',
          options: [
            { label: 'Ronde de Lutins (8-12 ans)', value: 'lutins' },
            { label: 'Compagnie de Guides (12-16 ans)', value: 'guides' },
            { label: 'Chaîne Guide Horizons (16-17 ans)', value: 'horizons' },
          ],
          defaultValue: 'lutins',
        }),
        typeLabel: fields.text({
          label: 'Libellé du type (ex : Ronde de Lutins)',
          validation: { isRequired: true },
        }),
        ageRange: fields.text({
          label: "Tranche d'âge (ex : 8 – 12 ans)",
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          validation: { isRequired: true },
        }),
        contact: fields.text({
          label: 'Email de contact',
          validation: { isRequired: true },
        }),
        order: fields.integer({
          label: "Ordre d'affichage",
          defaultValue: 0,
        }),
        staff: staffArray('Staff de la section'),
        photos: fields.array(
          fields.image({
            label: 'Photo',
            directory: 'public/images/sections',
            publicPath: '/images/sections/',
          }),
          { label: 'Photos', itemLabel: () => 'Photo' }
        ),
      },
    }),

    sections106: collection({
      label: 'Sections 106ème (Scouts)',
      slugField: 'name',
      path: 'src/content/sections106/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Nom de la section' } }),
        type: fields.select({
          label: 'Type',
          options: [
            { label: 'Ribambelle de Baladins (6-8 ans)', value: 'baladins' },
            { label: 'Meute de Louveteaux (8-12 ans)', value: 'louveteaux' },
            { label: 'Troupe Scoute (12-16 ans)', value: 'eclaireurs' },
            { label: 'Poste Pionniers (15-17 ans)', value: 'pionniers' },
          ],
          defaultValue: 'louveteaux',
        }),
        typeLabel: fields.text({
          label: 'Libellé du type (ex : Meute de Louveteaux)',
          validation: { isRequired: true },
        }),
        ageRange: fields.text({
          label: "Tranche d'âge (ex : 8 – 12 ans)",
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          validation: { isRequired: true },
        }),
        contact: fields.text({
          label: 'Email de contact',
          validation: { isRequired: true },
        }),
        order: fields.integer({
          label: "Ordre d'affichage",
          defaultValue: 0,
        }),
        staff: staffArray('Staff de la section'),
        photos: fields.array(
          fields.image({
            label: 'Photo',
            directory: 'public/images/sections',
            publicPath: '/images/sections/',
          }),
          { label: 'Photos', itemLabel: () => 'Photo' }
        ),
      },
    }),

    // ── Documents téléchargeables ───────────────────────────────────────────
    documents: collection({
      label: 'Téléchargements',
      slugField: 'title',
      path: 'src/content/documents/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Titre du document' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        categorie: fields.select({
          label: 'Catégorie',
          options: [
            { label: 'Fiche santé', value: 'sante' },
            { label: 'Autorisations', value: 'autorisations' },
            { label: 'Administratif', value: 'administratif' },
            { label: 'Autre', value: 'autre' },
          ],
          defaultValue: 'autre',
        }),
        file: fields.file({
          label: 'Fichier (PDF…)',
          directory: 'public/documents',
          publicPath: '/documents/',
          validation: { isRequired: true },
        }),
      },
    }),

    // ── Chartes ─────────────────────────────────────────────────────────────
    chartes: collection({
      label: 'Chartes',
      slugField: 'title',
      path: 'src/content/chartes/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titre' } }),
        intro: fields.text({ label: 'Introduction', multiline: true }),
        content: fields.markdoc({ label: 'Contenu' }),
      },
    }),

    // ── Liens utiles ────────────────────────────────────────────────────────
    liens: collection({
      label: 'Liens utiles',
      slugField: 'label',
      path: 'src/content/liens/*',
      format: { data: 'json' },
      schema: {
        label: fields.slug({ name: { label: 'Nom du lien' } }),
        url: fields.url({ label: 'URL', validation: { isRequired: true } }),
        description: fields.text({ label: 'Description', multiline: true }),
        categorie: fields.select({
          label: 'Catégorie',
          options: [
            { label: 'Techniques & constructions', value: 'techniques' },
            { label: 'Malles & matériel', value: 'materiel' },
            { label: 'Réseaux des sections', value: 'reseaux' },
            { label: 'Fédérations', value: 'federations' },
            { label: 'Autre', value: 'autre' },
          ],
          defaultValue: 'autre',
        }),
      },
    }),
  },

  singletons: {
    // ── Staffs d'unité & ASBL ───────────────────────────────────────────────
    staffs: singleton({
      label: "Staffs d'unité & ASBL",
      path: 'src/content/staffs',
      format: { data: 'json' },
      schema: {
        staff67: staffArray("Staff d'unité 67ème (Guides)"),
        staff106: staffArray("Staff d'unité 106ème (Scouts)"),
        asbl: staffArray("Conseil d'administration de l'ASBL"),
      },
    }),

    // ── Pages de contenu ────────────────────────────────────────────────────
    histoire: contentPage("Histoire de l'unité", 'histoire'),
    presence: contentPage('Présence & engagement', 'presence'),
    grandCamp: contentPage('Grand camp', 'grand-camp'),
    cotisations: contentPage('Cotisations & assurance', 'cotisations'),
    uniformes: contentPage('Uniformes & scouterie', 'uniformes'),
  },
});
