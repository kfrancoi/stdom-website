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
  adapter: vercel(),
});
