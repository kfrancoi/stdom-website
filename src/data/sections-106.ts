import type { StaffMember } from './sections-67';

export interface Section106 {
  slug: string;
  name: string;
  type: 'baladins' | 'louveteaux' | 'eclaireurs' | 'pionniers';
  typeLabel: string;
  ageRange: string;
  description: string;
  contact: string;
  staff: StaffMember[];
  photos: string[];
}

export const sections106: Section106[] = [
  // ── BALADINS (6–8 ans, mixte) ────────────────────────────────────────────
  {
    slug: 'merlin',
    name: 'Merlin',
    type: 'baladins',
    typeLabel: 'Ribambelle de Baladins',
    ageRange: '6 – 8 ans',
    description:
      'La ribambelle Merlin ouvre les portes du scoutisme aux plus jeunes ! Dans un univers enchanté, nos baladins découvrent la nature, la vie en groupe et les premières valeurs scouts, en s\'amusant à fond.',
    contact: 'baladinsdemerlin@gmail.com',
    staff: [
      { totem: 'Merlin', name: 'Juliette BERGHMAN', role: 'Grande chef', phone: '0468 43 76 93' },
      { totem: 'Freya', name: 'Emma MOFFROID', phone: '0492 41 45 69' },
      { totem: 'Pellinore', name: 'Romane PONCE', phone: '0467 09 05 21' },
      { totem: 'Kay', name: 'Florentin VAN BASTELAER', phone: '0484 45 44 98' },
      { totem: 'Iseldir', name: 'Romane CHABEAU', phone: '0488 37 03 73' },
      { totem: 'Perceval', name: 'Eloi COUVREUR', phone: '0471 03 01 04' },
      { totem: 'Aithusa', name: 'Fanny WILLEMS', phone: '0460 96 90 27' },
      { totem: 'Sefa', name: 'Louise HOARAU', phone: '0455 11 35 68' },
    ],
    photos: [
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
    ],
  },
  {
    slug: 'mickey',
    name: 'Mickey',
    type: 'baladins',
    typeLabel: 'Ribambelle de Baladins',
    ageRange: '6 – 8 ans',
    description:
      'La ribambelle Mickey emmène les tout-petits dans une ribambelle d\'aventures ! Jeux, chants, bricolages et premières nuits en plein air : le début d\'une longue histoire avec le scoutisme.',
    contact: 'baladinsmickey@gmail.com',
    staff: [
      { totem: 'Mickey', name: 'Anli MICHEL', role: 'Grande chef', phone: '0483 14 76 22' },
      { totem: 'Lucky', name: 'Géraldine BEYERMAN', phone: '0478 08 84 06' },
      { totem: 'Djali', name: 'Octave DE SMET', phone: '0474 06 60 47' },
      { totem: 'Faloo', name: 'Isabel DE PAU', phone: '0479 04 92 97' },
      { totem: 'Koda', name: 'Guillaume COLARD', phone: '0460 96 47 87' },
      { totem: 'Copper', name: 'Valentina GERZANICH', phone: '0498 73 09 39' },
      { totem: 'Sirhiss', name: 'Basil DEJONG', phone: '0478 08 06 13' },
      { totem: 'Timon', name: 'Anne-Catherine PEAUTAURIT', phone: '0496 87 34 25' },
      { totem: 'Froufrou', name: 'Satya RODALL', phone: '0495 19 43 98' },
    ],
    photos: [
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
    ],
  },
  {
    slug: 'serengeti',
    name: 'Serengeti',
    type: 'baladins',
    typeLabel: 'Ribambelle de Baladins',
    ageRange: '6 – 8 ans',
    description:
      'Dans la savane Serengeti, les jeunes baladins partent à la découverte du monde qui les entoure. Curiosité, joie et partage sont les maîtres mots de cette ribambelle pleine de vie.',
    contact: 'serengeti106e@gmail.com',
    staff: [
      { totem: 'Mufasa', name: 'Gregory HOMANS', role: 'Grand chef', phone: '0478 01 98 97' },
      { totem: 'Zazu', name: 'Matis VANDENDAEL', phone: '0473 22 34 12' },
      { totem: 'Mohatu', name: 'Jean-Pierre DECKERS', phone: '0483 07 74 65' },
      { totem: 'Nala', name: 'Pauline HENNAU', phone: '0478 82 31 55' },
      { totem: 'Rafiki', name: 'Jeanne PLASSCHAERT', phone: '0485 80 27 14' },
      { totem: 'Sarafina', name: 'Athéna VAN LIPPEVELDE', phone: '0476 38 68 64' },
    ],
    photos: [
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
    ],
  },

  // ── LOUVETEAUX (8–12 ans) ────────────────────────────────────────────────
  {
    slug: 'abeilles',
    name: 'Les Abeilles',
    type: 'louveteaux',
    typeLabel: 'Meute de Louveteaux',
    ageRange: '8 – 12 ans',
    description:
      'La meute des Abeilles bourdonne d\'activités ! Nos louveteaux apprennent à vivre en meute : loyauté, débrouillardise et sens du service sont les piliers de leur progression scoute.',
    contact: 'abeilles@stdom.be',
    staff: [
      { totem: 'Akela', name: 'Ilhan GULBAKAN', role: 'Grand chef', phone: '0486 20 99 11' },
      { totem: 'Rama', name: 'Victor WITTAMER', phone: '0485 75 01 12' },
      { totem: 'Hathi', name: 'Sam BOUMEDMED ZURSTRASSEN', phone: '0477 70 43 84' },
      { totem: 'Kaa', name: 'Grégoire HEYMANS', phone: '0494 48 28 05' },
      { totem: 'Toomaï', name: 'Arthur VANDERVAEREN', phone: '0485 75 01 12' },
      { totem: 'Wontolla', name: 'Arthur MANSVELT', phone: '0468 57 66 75' },
      { totem: 'Mang', name: 'Jules COOREN', phone: '0465 03 54 53' },
    ],
    photos: [
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
    ],
  },
  {
    slug: 'dhak',
    name: 'Dhak',
    type: 'louveteaux',
    typeLabel: 'Meute de Louveteaux',
    ageRange: '8 – 12 ans',
    description:
      'La meute Dhak forge ses louveteaux dans l\'esprit du Livre de la Jungle : entraide, courage et respect de la nature guident chaque réunion et chaque camp.',
    contact: 'dhak.stdom@gmail.com',
    staff: [
      { totem: 'Akela', name: 'Sacha VANDERREYDT', role: 'Grand chef', phone: '0499 91 81 24' },
      { totem: 'Ziggy', name: 'Corentin BOONEN', phone: '0499 50 90 09' },
      { totem: 'Mysa', name: 'Céleste DEGAND', phone: '0460 96 40 25' },
      { totem: 'Calimico', name: 'Xavier HOBBELEN', phone: '0471 60 20 66' },
      { totem: 'Ourébi', name: 'Maxime BRION', phone: '0470 11 56 75' },
      { totem: 'Kotick', name: 'Alexine MOYERSOEN', phone: '0468 24 44 77' },
      { totem: 'Sona', name: 'Chloé KOPP', phone: '0471 06 30 24' },
    ],
    photos: [
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
    ],
  },
  {
    slug: 'rocher',
    name: 'Le Rocher',
    type: 'louveteaux',
    typeLabel: 'Meute de Louveteaux',
    ageRange: '8 – 12 ans',
    description:
      'Solide comme un roc, la meute du Rocher construit des louveteaux déterminés et créatifs. Avec leurs chefs, ils apprennent à relever des défis et à grandir ensemble.',
    contact: 'rocher106@gmail.com',
    staff: [
      { totem: 'Akela', name: 'Stanislas VERVENNE', role: 'Grand chef', phone: '0479 03 47 68' },
      { totem: 'Bagheera', name: 'Nathan PITANCE', phone: '0493 82 23 44' },
      { totem: 'Kaa', name: 'Harold MICHAUX', phone: '0483 14 77 52' },
      { totem: 'Hathi', name: 'Arturo COMENGE', phone: '0474 07 41 25' },
      { totem: 'Rama', name: 'Diego BEGASSE', phone: '0490 43 52 38' },
      { totem: 'Baloo', name: 'Edouard VERSCHUERE', phone: '0472 79 10 10' },
    ],
    photos: [
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
    ],
  },

  // ── ÉCLAIREURS (12–16 ans) ───────────────────────────────────────────────
  {
    slug: 'aigles',
    name: 'Les Aigles',
    type: 'eclaireurs',
    typeLabel: 'Troupe Scoute',
    ageRange: '12 – 16 ans',
    description:
      'La troupe des Aigles vole haut ! Nos éclaireurs développent leur autonomie, leur sens du dépassement et leurs compétences techniques à travers projets de patrouille et grands camps.',
    contact: 'troupedesaigles@gmail.com',
    staff: [
      { totem: 'Azores', name: 'Alexandre PIRMEZ', role: 'Grand chef', phone: '0479 82 58 24' },
      { totem: 'Mustang', name: 'Louis GOOSSENS', phone: '0456 02 43 25' },
      { totem: 'Basenji', name: 'Charles PICARD', phone: '0456 07 08 15' },
      { totem: 'Alezan', name: 'Tristan van den WOUWER', phone: '0492 20 01 87' },
      { totem: 'Irbis', name: 'Théo de KERCKHOVE', phone: '0478 81 80 19' },
      { totem: 'Wapiti', name: 'Benjamin PIRMEZ', phone: '0470 03 88 77' },
    ],
    photos: [
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
    ],
  },
  {
    slug: 'chevalerie',
    name: 'La Chevalerie',
    type: 'eclaireurs',
    typeLabel: 'Troupe Scoute',
    ageRange: '12 – 16 ans',
    description:
      'Fidèle à l\'idéal chevaleresque, la troupe de la Chevalerie forge des scouts droits, courageux et au service des autres. Honneur, fraternité et aventure au programme !',
    contact: 'chevalerie106@hotmail.com',
    staff: [
      { totem: 'Grivet', name: 'Raphaël DELVAUX', role: 'Grand chef', phone: '0492 82 25 25' },
      { totem: 'Axis', name: 'Louis TIETARD', phone: '0478 74 56 01' },
      { totem: 'Caracal', name: 'Guillaume le MAISTRE d\'ANSTAING', phone: '0493 47 34 54' },
      { totem: 'Chinook', name: 'Lucas FORTON', phone: '0485 25 06 10' },
      { totem: 'Douc', name: 'Pierre VANDEPUTTE', phone: '0493 94 47 86' },
      { totem: 'Koudou', name: 'Marin VANDOORNE', phone: '0484 28 51 43' },
    ],
    photos: [
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
    ],
  },

  // ── PIONNIERS (15–17 ans) ────────────────────────────────────────────────
  {
    slug: 'clinfoc',
    name: 'Clinfoc',
    type: 'pionniers',
    typeLabel: 'Poste Pionnier',
    ageRange: '15 – 17 ans',
    description:
      'Le poste Clinfoc rassemble les pionniers qui s\'engagent pleinement dans des projets de grande envergure, portés par des valeurs profondes et une amitié scoute durable.',
    contact: 'administration106@stdom.be',
    staff: [
      { totem: 'Ourson', name: 'Noé SAUVAGE', role: 'Grand chef', phone: '0470 67 81 08' },
      { totem: 'Brumby', name: 'Victor van DOORSLAER', phone: '0477 04 71 21' },
      { totem: 'Akita', name: 'Amaury de CROMBRUGGHE', phone: '0491 63 38 39' },
      { totem: 'Shetland', name: 'Antoine WITTAMER', phone: '0487 12 56 15' },
      { totem: 'Fennec', name: 'Julien VAN DROOGENBROECK', phone: '0498 59 37 64' },
    ],
    photos: [
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
    ],
  },
  {
    slug: 'cor-an',
    name: 'Cor-An',
    type: 'pionniers',
    typeLabel: 'Poste Pionnier',
    ageRange: '15 – 17 ans',
    description:
      'Le poste Cor-An réunit des pionniers engagés, prêts à aller au bout d\'eux-mêmes pour construire un monde meilleur. Service, engagement et fraternité définissent leur aventure.',
    contact: 'administration106@stdom.be',
    staff: [
      { totem: 'Oonaï', name: 'Henry VAN DEN SCHRIECK', role: 'Grand chef', phone: '0485 22 12 87' },
      { totem: 'Rikki', name: 'Alexandre DIEU', phone: '0471 59 07 82' },
      { totem: 'Sona', name: 'Alexandre DEFOSSE', phone: '0493 02 82 12' },
      { totem: 'Jacala', name: 'Vincent DE VAUCLEROY', phone: '0473 96 06 17' },
    ],
    photos: [
      '/images/placeholder-section.jpg',
      '/images/placeholder-section.jpg',
    ],
  },
];
