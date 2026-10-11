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
      content: fields.markdoc({
        label: 'Contenu',
        // Sans ce réglage, Keystatic range les images à côté du fichier de la
        // page (src/content/…), dossier qui n'est pas publié : elles
        // s'afficheraient en 404 sur le site.
        options: {
          image: {
            directory: 'public/images/pages',
            publicPath: '/images/pages/',
          },
        },
      }),
    },
  });

// Images insérées dans un texte riche : rangées dans public/ pour être publiées
const markdocImages = (dir: string) => ({
  image: { directory: `public/images/${dir}`, publicPath: `/images/${dir}/` },
});

// Unité concernée par un contenu (événement, document, article d'uniforme…)
const uniteSelect = (label = 'Unité concernée') =>
  fields.select({
    label,
    options: [
      { label: 'Les deux unités', value: 'both' },
      { label: '67ème (Guides)', value: '67' },
      { label: '106ème (Scouts)', value: '106' },
    ],
    defaultValue: 'both',
  });

// Types de points de vente de l'uniforme (colonnes du tableau « où acheter quoi »)
const pointDeVenteOptions = [
  { label: 'Au local', value: 'local' },
  { label: 'Scouterie / boutique de la fédération', value: 'scouterie' },
  { label: 'En ligne', value: 'en-ligne' },
  { label: 'Seconde main', value: 'seconde-main' },
];

// Fiche d'une section (67ème ou 106ème). Chaque rubrique facultative laissée
// vide est simplement masquée sur la page de la section.
const sectionCollection = (
  label: string,
  dir: 'sections67' | 'sections106',
  typeOptions: { label: string; value: string }[]
) =>
  collection({
    label,
    slugField: 'name',
    path: `src/content/${dir}/*`,
    format: { data: 'json' },
    schema: {
      name: fields.slug({ name: { label: 'Nom de la section' } }),
      type: fields.select({
        label: 'Type',
        options: typeOptions,
        defaultValue: typeOptions[0].value,
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
        label: 'Email de contact (usage interne, non affiché sur le site)',
      }),
      order: fields.integer({
        label: "Ordre d'affichage",
        defaultValue: 0,
      }),
      blason: fields.image({
        label: 'Blason / logo de la section',
        directory: 'public/images/blasons',
        publicPath: '/images/blasons/',
      }),
      illustration: fields.image({
        label: 'Visuel de thème (affiché tant qu\'il n\'y a pas de photo)',
        directory: 'public/images/art_sections',
        publicPath: '/images/art_sections/',
      }),
      valeurs: fields.markdoc({
        label: 'Nos valeurs',
        options: markdocImages('sections'),
      }),
      staff: staffArray('Staff de la section'),
      equipes: fields.object(
        {
          titre: fields.text({
            label: 'Titre de la rubrique (ex : Les sizaines, Les patrouilles)',
          }),
          intro: fields.text({ label: 'Introduction', multiline: true }),
          liste: fields.array(
            fields.object({
              nom: fields.text({ label: 'Nom', validation: { isRequired: true } }),
              image: fields.image({
                label: 'Blason ou fanion (optionnel)',
                directory: 'public/images/sections',
                publicPath: '/images/sections/',
              }),
              description: fields.text({ label: 'Description', multiline: true }),
            }),
            {
              label: 'Patrouilles, sizaines, équipes…',
              itemLabel: (props) => props.fields.nom.value || 'Équipe',
            }
          ),
        },
        { label: 'Patrouilles, sizaines, équipes' }
      ),
      infosPratiques: fields.markdoc({
        label: 'Informations pratiques propres à la section',
        options: markdocImages('sections'),
      }),
      uniforme: fields.markdoc({
        label: 'Uniforme & matériel',
        options: markdocImages('sections'),
      }),
      photos: fields.array(
        fields.object({
          image: fields.image({
            label: 'Photo',
            directory: 'public/images/sections',
            publicPath: '/images/sections/',
            validation: { isRequired: true },
          }),
          legende: fields.text({ label: 'Légende (optionnelle)' }),
        }),
        {
          label: 'Photos « best of »',
          itemLabel: (props) => props.fields.legende.value || 'Photo',
        }
      ),
    },
  });

// ── Configuration ────────────────────────────────────────────────────────────

export default config({
  // En dev : édition directe des fichiers locaux, sans authentification.
  // En production (Vercel) : mode cloud — les éditeurs se connectent avec un
  // compte Keystatic Cloud (pas besoin de compte GitHub) et chaque sauvegarde
  // crée un commit sur le dépôt via keystatic.cloud.
  storage: import.meta.env.DEV ? { kind: 'local' } : { kind: 'cloud' },
  cloud: {
    // Doit correspondre à l'équipe/projet créés sur https://keystatic.cloud
    project: 'saint-dom/stdom-website',
  },
  ui: {
    brand: { name: 'Saint-Dom — Gestion du contenu' },
    navigation: {
      Actualités: ['flashs', 'evenements'],
      Unité: ['histoire', 'fonctionnement', 'chiffres', 'staffs', 'presence', 'soutiens'],
      Sections: ['sections67', 'sections106'],
      Activités: ['reunions', 'weekends', 'grandCamp', 'tempsForts'],
      'Bons plans & services': ['servicesPage', 'services'],
      Pratique: ['inscriptions', 'cotisations', 'uniformes'],
      Documents: ['documents', 'chartes', 'liens'],
      Contact: ['communication'],
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
        unit: uniteSelect(),
        description: fields.text({ label: 'Description', multiline: true }),
      },
    }),

    // ── Sections ────────────────────────────────────────────────────────────
    sections67: sectionCollection('Sections 67ème (Guides)', 'sections67', [
      { label: 'Ronde de Lutins (8-12 ans)', value: 'lutins' },
      { label: 'Compagnie de Guides (12-16 ans)', value: 'guides' },
      { label: 'Chaîne Guide Horizons (16-17 ans)', value: 'horizons' },
    ]),
    sections106: sectionCollection('Sections 106ème (Scouts)', 'sections106', [
      { label: 'Ribambelle de Baladins (6-8 ans)', value: 'baladins' },
      { label: 'Meute de Louveteaux (8-12 ans)', value: 'louveteaux' },
      { label: 'Troupe Scoute (12-16 ans)', value: 'eclaireurs' },
      { label: 'Poste Pionniers (16-17 ans)', value: 'pionniers' },
    ]),

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
            { label: "Droit à l'image", value: 'droit-image' },
            { label: 'Administratif', value: 'administratif' },
            { label: 'Techniques & outils', value: 'techniques' },
            { label: 'Malles & matériel', value: 'materiel' },
            { label: 'Autre', value: 'autre' },
          ],
          defaultValue: 'autre',
        }),
        unite: uniteSelect(
          'Unité concernée (fiche santé, autorisations et droit à l\'image : version propre à chaque unité)'
        ),
        file: fields.file({
          label: 'Fichier (PDF…)',
          directory: 'public/documents',
          publicPath: '/documents/',
          validation: { isRequired: true },
        }),
      },
    }),

    // ── Temps forts de l'année (page Activités) ─────────────────────────────
    tempsForts: collection({
      label: "Temps forts de l'année",
      slugField: 'title',
      path: 'src/content/temps-forts/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Titre' } }),
        periode: fields.text({ label: 'Période (ex : Septembre, Printemps…)' }),
        unite: uniteSelect(),
        description: fields.text({ label: 'Description', multiline: true }),
        image: fields.image({
          label: 'Photo (optionnelle)',
          directory: 'public/images/temps-forts',
          publicPath: '/images/temps-forts/',
        }),
        order: fields.integer({ label: "Ordre d'affichage", defaultValue: 0 }),
      },
    }),

    // ── Bons plans & services (Horizons, Pionniers…) ────────────────────────
    services: collection({
      label: 'Services & bons plans',
      slugField: 'title',
      path: 'src/content/services/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Titre' } }),
        type: fields.select({
          label: 'Type',
          options: [
            { label: 'Service proposé par les jeunes', value: 'service' },
            { label: 'Bon plan', value: 'bon-plan' },
          ],
          defaultValue: 'service',
        }),
        icone: fields.text({ label: 'Icône (un émoji, ex : 🌱)' }),
        proposePar: fields.text({ label: 'Proposé par (ex : Horizons & Pionniers)' }),
        description: fields.text({ label: 'Description', multiline: true }),
        lien: fields.url({ label: 'Lien (optionnel)' }),
        order: fields.integer({ label: "Ordre d'affichage", defaultValue: 0 }),
      },
    }),

    // ── Remerciements : subsides et soutiens ────────────────────────────────
    soutiens: collection({
      label: 'Soutiens & subsides (remerciements)',
      slugField: 'nom',
      path: 'src/content/soutiens/*',
      format: { data: 'json' },
      schema: {
        nom: fields.slug({ name: { label: 'Nom' } }),
        description: fields.text({ label: 'Ce que nous lui devons', multiline: true }),
        logo: fields.image({
          label: 'Logo (optionnel)',
          directory: 'public/images/soutiens',
          publicPath: '/images/soutiens/',
        }),
        lien: fields.url({ label: 'Site web (optionnel)' }),
        order: fields.integer({ label: "Ordre d'affichage", defaultValue: 0 }),
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
        content: fields.markdoc({
          label: 'Contenu',
          options: {
            image: {
              directory: 'public/images/chartes',
              publicPath: '/images/chartes/',
            },
          },
        }),
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

    // ── Inscriptions (page Pratique) ────────────────────────────────────────
    inscriptions: singleton({
      label: 'Inscriptions',
      path: 'src/content/inscriptions',
      format: { data: 'json' },
      schema: {
        open: fields.checkbox({
          label: 'Inscriptions ouvertes',
          description:
            "Décoché : les boutons d'inscription de la page Pratique sont grisés et non cliquables.",
          defaultValue: false,
        }),
        message: fields.text({
          label: "Message d'information (affiché au-dessus des boutons, vide = aucun message)",
          multiline: true,
        }),
      },
    }),

    // ── Chiffres clés (accueil et page L'Unité) ─────────────────────────────
    chiffres: singleton({
      label: 'Chiffres clés',
      path: 'src/content/chiffres',
      format: { data: 'json' },
      schema: {
        animes67: fields.integer({ label: 'Animées 67ème' }),
        animateurs67: fields.integer({ label: 'Animatrices 67ème' }),
        animes106: fields.integer({ label: 'Animés 106ème' }),
        animateurs106: fields.integer({ label: 'Animateurs 106ème' }),
      },
    }),

    // ── Pages de contenu ────────────────────────────────────────────────────
    histoire: contentPage("Histoire de l'unité", 'histoire'),
    fonctionnement: contentPage("Fonctionnement de l'unité", 'fonctionnement'),
    presence: contentPage('Présence & engagement', 'presence'),
    reunions: contentPage('Réunions', 'reunions'),
    weekends: contentPage('Week-ends & hikes', 'weekends'),
    grandCamp: contentPage('Grand camp', 'grand-camp'),
    communication: contentPage('Comment communiquons-nous ?', 'communication'),
    servicesPage: contentPage('Page Bons plans & services', 'services'),

    // Trois blocs de texte : le premier dans cotisations.mdoc, les deux autres
    // dans le dossier cotisations/ (assurance.mdoc, camp.mdoc).
    cotisations: singleton({
      label: 'Cotisations & assurances',
      path: 'src/content/pages/cotisations',
      format: { contentField: 'cotisation' },
      schema: {
        title: fields.text({ label: 'Titre', validation: { isRequired: true } }),
        intro: fields.text({ label: 'Introduction (affichée sous le titre)', multiline: true }),
        cotisation: fields.markdoc({
          label: 'Le prix de la cotisation',
          options: markdocImages('pages'),
        }),
        assurance: fields.markdoc({
          label: "L'assurance : ce qui est couvert",
          options: markdocImages('pages'),
        }),
        camp: fields.markdoc({
          label: 'Le coût du camp',
          options: markdocImages('pages'),
        }),
      },
    }),

    // Page Uniforme : chaque bloc est masqué tant qu'il est vide, et chaque
    // élément peut être réservé à une unité (onglets 67ème / 106ème).
    uniformes: singleton({
      label: 'Uniforme & équipement',
      path: 'src/content/pages/uniformes',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Titre', validation: { isRequired: true } }),
        intro: fields.text({ label: 'Introduction (affichée sous le titre)', multiline: true }),
        content: fields.markdoc({
          label: "L'uniforme en général (composition, conseils…)",
          options: markdocImages('uniforme'),
        }),
        pointsDeVente: fields.array(
          fields.object({
            nom: fields.text({ label: 'Nom', validation: { isRequired: true } }),
            type: fields.select({
              label: 'Type',
              options: pointDeVenteOptions,
              defaultValue: 'scouterie',
            }),
            unite: uniteSelect(),
            details: fields.text({ label: 'Adresse, horaires, remarques', multiline: true }),
            lien: fields.url({ label: 'Lien (optionnel)' }),
          }),
          {
            label: 'Points de vente',
            itemLabel: (props) => props.fields.nom.value || 'Point de vente',
          }
        ),
        articles: fields.array(
          fields.object({
            nom: fields.text({ label: 'Article', validation: { isRequired: true } }),
            unite: uniteSelect(),
            ou: fields.multiselect({
              label: 'Où le trouver ?',
              options: pointDeVenteOptions,
            }),
            remarque: fields.text({ label: 'Remarque (ex : stock limité)' }),
          }),
          {
            label: 'Articles (tableau « où acheter quoi »)',
            itemLabel: (props) => props.fields.nom.value || 'Article',
          }
        ),
        insignes: fields.array(
          fields.object({
            titre: fields.text({ label: 'Titre du groupe', validation: { isRequired: true } }),
            unite: uniteSelect(),
            description: fields.text({ label: 'Explication', multiline: true }),
            items: fields.array(
              fields.object({
                nom: fields.text({ label: 'Nom', validation: { isRequired: true } }),
                image: fields.image({
                  label: 'Image (optionnelle)',
                  directory: 'public/images/uniforme',
                  publicPath: '/images/uniforme/',
                }),
                legende: fields.text({ label: 'Légende (optionnelle)' }),
              }),
              { label: 'Insignes', itemLabel: (props) => props.fields.nom.value || 'Insigne' }
            ),
          }),
          {
            label: 'Insignes & écussons',
            itemLabel: (props) => props.fields.titre.value || 'Groupe',
          }
        ),
        placement: fields.array(
          fields.object({
            titre: fields.text({ label: 'Branche (ex : Louveteaux)', validation: { isRequired: true } }),
            unite: uniteSelect(),
            image: fields.image({
              label: 'Schéma ou photo',
              directory: 'public/images/uniforme',
              publicPath: '/images/uniforme/',
            }),
            texte: fields.text({ label: 'Explication', multiline: true }),
          }),
          {
            label: 'Placement des insignes',
            itemLabel: (props) => props.fields.titre.value || 'Branche',
          }
        ),
      },
    }),
  },
});
