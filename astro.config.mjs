import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://pureedgelk.github.io',
  base: '/prism-ai',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: true,
    },
  },
});
