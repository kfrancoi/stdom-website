import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Couleur d'accent du site (boutons, liens, menu actif…) : la changer
        // ici suffit à recolorer tout le site. Le rouge du logo vaut #C41E3A.
        accent: {
          DEFAULT: '#8C2F39', // bordeaux
          dark: '#6E242C', // survol des boutons
        },
        // Identité commune de l'unité (logo)
        'unit-gold': '#F5B800',
        'unit-dark': '#1A1A1A',
        // 67ème Guides (foulard vert & mauve)
        'guide-green': '#2E7D52',
        'guide-green-light': '#4CAF7D',
        'guide-purple': '#7B3F8C',
        'guide-purple-light': '#A05BB5',
        // 106ème Scouts (foulard noir & blanc)
        'scout-black': '#1A1A1A',
        'scout-white': '#F8F8F8',
        'scout-accent': '#C41E3A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Georgia', 'serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-bg.jpg')",
      },
    },
  },
  plugins: [typography],
};
