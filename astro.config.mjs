import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// Hébergement sur Vercel : les pages du site sont pré-générées (statiques),
// seules les routes de l'admin Keystatic (/keystatic) tournent en serverless.
export default defineConfig({
  integrations: [tailwind(), react(), keystatic()],
  site: 'https://stdom.be',
  adapter: vercel({
    // Les visuels viennent du CMS sous forme de chemins (« /images/… »), pas
    // d'imports statiques : Astro ne peut donc pas les optimiser à la
    // compilation. L'optimiseur de Vercel, lui, travaille par URL à la requête
    // (/_vercel/image), ce qui couvre aussi les photos qu'un staff déposera
    // plus tard dans Keystatic sans avoir à les recompresser à la main.
    imageService: true,
    imagesConfig: {
      // Largeurs autorisées. Toute largeur demandée par un composant est
      // arrondie à la plus proche de cette liste, d'où les petites valeurs
      // pour les vignettes de carte et de galerie.
      sizes: [320, 400, 640, 800, 1280, 1600, 1920],
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 60 * 60 * 24 * 30,
      domains: [],
    },
  }),
});
