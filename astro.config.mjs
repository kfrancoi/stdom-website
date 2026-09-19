import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

// Keystatic (interface d'édition sur /keystatic) n'est actif qu'en dev.
// Le build de production (SKIP_KEYSTATIC=true, voir package.json) reste
// 100% statique et se déploie tel quel via deploy.sh.
const skipKeystatic = Boolean(process.env.SKIP_KEYSTATIC);

export default defineConfig({
  integrations: [tailwind(), react(), ...(skipKeystatic ? [] : [keystatic()])],
  site: 'https://stdom.be',
  output: skipKeystatic ? 'static' : 'hybrid',
});
