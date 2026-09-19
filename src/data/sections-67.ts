export interface StaffMember {
  totem: string;
  name: string;
  role?: string;
  phone?: string;
}

export interface Section {
  slug: string;
  name: string;
  type: 'lutins' | 'guides' | 'horizons';
  typeLabel: string;
  ageRange: string;
  description: string;
  contact: string;
  color: string;
  accentColor: string;
  staff: StaffMember[];
  photos: string[]; // placeholders — à remplacer avec vraies photos
}

export const sections67: Section[] = [
  // ── LUTINS (8–12 ans) ────────────────────────────────────────────────────
  {
    slug: 'farfadets',
    name: 'Les Farfadets',
    type: 'lutins',
    typeLabel: 'Ronde de Lutins',
    ageRange: '8 – 12 ans',
    description: "Les Farfadets, une ronde pleine d'énergie et de joie ! Chaque semaine, nos lutins explorent, créent, jouent et grandissent ensemble dans la bonne humeur.",
    contact: 'ronde.des.farfadets@gmail.com',
    color: 'guide-green',
    accentColor: 'guide-purple',
    staff: [
      { totem: 'Shiba', name: 'Nine COOREN', role: 'Cheftaine', phone: '0468 59 00 02' },
      { totem: 'Lynx', name: 'Manon DUPUIS', phone: '0493 83 13 48' },
      { totem: 'Patou', name: 'Emeline POELS', phone: '0498 01 76 91' },
      { totem: 'Mazalaai', name: 'Louise VANDERBORGHT', phone: '0493 96 82 72' },
      { totem: 'Gyra', name: 'Valentine ARNAUTS', phone: '0468 46 69 20' },
      { totem: 'Madoqua', name: 'Eleonore BUSLAIN', phone: '0491 75 35 74' },
      { totem: 'Pika', name: 'Emilie van DOORSELAER de ten RYEN', phone: '0493 02 79 84' },
    ],
    photos: [
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
    ],
  },
  {
    slug: 'gavroches',
    name: 'Les Gavroches',
    type: 'lutins',
    typeLabel: 'Ronde de Lutins',
    ageRange: '8 – 12 ans',
    description:
      'La ronde des Gavroches accueille les lutins dans un univers d\'aventure et de découverte. Au programme : jeux, bricolage, sorties nature et belles amitiés.',
    contact: 'rondegavroche.stdom@gmail.com',
    color: 'guide-green',
    accentColor: 'guide-purple',
    staff: [
      { totem: 'Cabri', name: 'Théodora LUYCKX', role: 'Cheftaine', phone: '0475 44 37 47' },
      { totem: 'Ourebi', name: 'Lucie VAN DEN SCHRIEK', phone: '0490 39 81 25' },
      { totem: 'Warrah', name: 'Emilie GERSDORFF', phone: '0493 39 91 33' },
      { totem: 'Estrella', name: 'Manon BRIMBOIS', phone: '0479 15 55 24' },
      { totem: 'Redunka', name: 'Célestine SERMEUS', phone: '0468 29 77 55' },
      { totem: 'Appaloosa', name: 'Soline LHOAS', phone: '0483 99 64 71' },
      { totem: 'Pajero', name: 'Agnes HEYMANS', phone: '0494 48 27 20' },
    ],
    photos: [
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
    ],
  },
  {
    slug: 'soleil-levant',
    name: 'Le Soleil Levant',
    type: 'lutins',
    typeLabel: 'Ronde de Lutins',
    ageRange: '8 – 12 ans',
    description:
      'La ronde du Soleil Levant brille par son enthousiasme ! Nos lutins s\'épanouissent à travers des activités créatives, sportives et spirituelles tout au long de l\'année.',
    contact: 'soleillevantstdom@gmail.com',
    color: 'guide-green',
    accentColor: 'guide-purple',
    staff: [
      { totem: 'Saïmiri', name: 'Gabrielle GENNART', role: 'Cheftaine', phone: '0470 79 30 26' },
      { totem: 'Daman', name: 'Marie JACOBS', phone: '0472 74 31 88' },
      { totem: 'Ouandji', name: 'Ombeline TRIEST', phone: '0499 84 11 78' },
      { totem: 'Wombat', name: 'Eléonore CASTELEIN', phone: '0456 15 07 16' },
      { totem: 'Souslik', name: 'Jeanne HUBLET', phone: '0471 86 85 58' },
      { totem: 'Caracal', name: 'Colombine PAQUOT', phone: '0479 11 20 55' },
      { totem: 'Okami', name: 'Joséphine WTTERWULGHE', phone: '0478 04 63 46' },
    ],
    photos: [
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
    ],
  },

  // ── GUIDES (12–16 ans) ───────────────────────────────────────────────────
  {
    slug: 'amazones',
    name: 'Les Amazones',
    type: 'guides',
    typeLabel: 'Compagnie de Guides',
    ageRange: '12 – 16 ans',
    description:
      'La compagnie des Amazones forge des jeunes femmes fortes, solidaires et créatives. Projets de patrouille, camps, service aux autres : les Amazones relèvent tous les défis !',
    contact: 'amazones67eme@stdom.be',
    color: 'guide-purple',
    accentColor: 'guide-green',
    staff: [
      { totem: 'Suni', name: 'Alicia BUSLAIN', role: 'Cheftaine', phone: '0496 07 24 00' },
      { totem: 'Tamia', name: 'Emilie LOSSON', phone: '0492 85 94 10' },
      { totem: 'Tamia', name: 'Valentine GERSDORFF', phone: '0489 23 60 01' },
      { totem: 'Manningi', name: 'Klara ROLAND', phone: '0496 75 51 78' },
      { totem: 'Aluco', name: 'Lisa Rose PEREZ', phone: '0473 83 39 01' },
      { totem: 'Klee Kai', name: 'Lucie BLANCHAERT', phone: '0476 35 81 38' },
      { totem: 'Corsac', name: 'Charlotte DE BRUYN', phone: '0470 89 53 32' },
    ],
    photos: [
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
    ],
  },
  {
    slug: 'durandal',
    name: 'Durandal',
    type: 'guides',
    typeLabel: 'Compagnie de Guides',
    ageRange: '12 – 16 ans',
    description:
      'La compagnie Durandal, du nom de l\'épée légendaire, incarne la force et la fidélité aux valeurs guides. Aventure, amitié et dépassement de soi sont au cœur de chaque réunion.',
    contact: 'compagniedurandal@gmail.com',
    color: 'guide-purple',
    accentColor: 'guide-green',
    staff: [
      { totem: 'Hyrax', name: 'Alicia VAN GELDER', role: 'Cheftaine', phone: '0474 90 24 35' },
      { totem: 'Wallaby', name: 'Laura LECOQ', phone: '0493 02 82 55' },
      { totem: 'Isatis', name: 'Alix-Anne KINT', phone: '0488 55 20 20' },
      { totem: 'Kinkajou', name: 'Hannah VANDOORNE', phone: '0468 28 73 34' },
      { totem: 'Irbis', name: 'Emilie BEYERMAN', phone: '0477 58 77 05' },
      { totem: 'Havana', name: 'Emilie THOMAS', phone: '0475 20 73 42' },
      { totem: 'Sokoke', name: 'Madeleine BEGAULT', phone: '0460 95 30 52' },
    ],
    photos: [
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
    ],
  },
  {
    slug: 'tarentelle',
    name: 'La Tarentelle',
    type: 'guides',
    typeLabel: 'Compagnie de Guides',
    ageRange: '12 – 16 ans',
    description:
      'La Tarentelle danse au rythme de la vie guide : des réunions dynamiques, des camps mémorables et une équipe soudée prête à se lancer dans toutes les aventures.',
    contact: 'tarentelle67@gmail.com',
    color: 'guide-purple',
    accentColor: 'guide-green',
    staff: [
      { totem: 'Choussingha', name: 'Alexia GERSDORFF', role: 'Cheftaine', phone: '0470 48 64 39' },
      { totem: 'Ourébi', name: 'Violette STROOBANTS', phone: '0470 09 04 54' },
      { totem: 'Quokka', name: 'Alix de BONHOME', phone: '0471 56 75 57' },
      { totem: 'Bagheera', name: 'Lea KOPP', phone: '0471 06 30 45' },
      { totem: 'Dingo', name: 'Elisa ROULIVE', phone: '0471 21 43 31' },
      { totem: 'Fanaloka', name: 'Victoire HERMANS', phone: '0472 49 04 76' },
      { totem: 'Manul', name: 'Marie-Astrid HEYMANS', phone: '0490 40 23 61' },
    ],
    photos: [
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
    ],
  },

  // ── GUIDES HORIZONS (16–17 ans) ──────────────────────────────────────────
  {
    slug: 'eldorado',
    name: 'Eldorado',
    type: 'horizons',
    typeLabel: 'Chaîne Guide Horizons',
    ageRange: '16 – 17 ans',
    description:
      'Eldorado, c\'est l\'aventure vers de nouveaux horizons. Les aînées de la 67ème s\'engagent dans des projets plus ambitieux, portées par des valeurs d\'entraide, de sens et de responsabilité.',
    contact: 'eldorado.stdom@gmail.com',
    color: 'guide-green',
    accentColor: 'guide-purple',
    staff: [
      { totem: 'Springer', name: 'Juliette GODIN', role: 'Cheftaine', phone: '0494 41 93 86' },
      { totem: 'Yearling', name: 'Elise CATTOOR', phone: '0478 49 66 58' },
      { totem: 'Burunduk', name: 'Noémie de BIOLLEY', phone: '0470 79 30 26' },
      { totem: 'Laurane', name: 'Laurane PEETERS', phone: '0476 78 07 49' },
    ],
    photos: [
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
    ],
  },
];
