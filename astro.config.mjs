import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://pureedgelk.github.io',
  base: '/prism-ai',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
