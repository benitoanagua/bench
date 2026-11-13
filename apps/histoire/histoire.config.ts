import { defineConfig } from 'histoire';
import { HstVue } from '@histoire/plugin-vue';
import vue from '@vitejs/plugin-vue';

const basePath = process.env.BASE_PATH ?? '/bench/';

export default defineConfig({
  plugins: [HstVue()],
  storyMatch: ['src/**/*.story.vue'],
  setupFile: './histoire.setup.ts',
  routerMode: 'hash',
  // WSL con ~7.5 GiB de RAM: limitar hilos de recolección de stories.
  collectMaxThreads: 2,
  vite: {
    base: basePath,
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag: string) => tag.startsWith('bch-'),
          },
        },
      }),
    ],
  },
  theme: {
    title: 'Bench Design System',
    // El catálogo se sirve siempre bajo la subruta de GitHub Pages (/bench/).
    favicon: 'favicon.svg',
    logo: {
      square: './public/favicon.svg',
    },
    defaultColorScheme: 'light',
    storeColorScheme: true,
    darkClass: 'dark',
  },
  // Densidades y tamaños de pantalla disponibles desde la UI de Histoire.
  responsivePresets: [
    { label: 'Móvil', width: 360, height: 740 },
    { label: 'Tablet', width: 768, height: 1024 },
    { label: 'Laptop', width: 1024, height: 768 },
    { label: 'Desktop', width: 1280, height: 800 },
  ],
  backgroundPresets: [
    { label: 'Claro', color: '#ffffff', contrastColor: '#1b2430' },
    { label: 'Oscuro', color: '#171c21', contrastColor: '#e8ebee' },
    { label: 'Fondo claro (--bch-color-background)', color: '#e7eaee', contrastColor: '#1b2430' },
    { label: 'Fondo oscuro', color: '#0f1417', contrastColor: '#e8ebee' },
  ],
  autoApplyContrastColor: true,
  tree: {
    file: 'title',
    groups: [
      { title: 'Welcome', id: 'welcome', include: (f) => f.title === 'Welcome' },
      { title: 'Foundations', id: 'foundations', include: (f) => f.path[0] === 'Foundations' },
      { title: 'Components', id: 'components', include: (f) => f.path[0] === 'Components' },
      { title: 'Patterns', id: 'patterns', include: (f) => f.path[0] === 'Patterns' },
      { title: 'Showcase', id: 'showcase', include: (f) => f.path[0] === 'Showcase' },
    ],
    order: (() => {
      const ranked = ['Welcome', 'Foundations', 'Components', 'Patterns', 'Showcase'];
      return (a: string, b: string) => {
        const ia = ranked.indexOf(a);
        const ib = ranked.indexOf(b);
        if (ia === -1 && ib === -1) return a.localeCompare(b);
        if (ia === -1) return 1;
        if (ib === -1) return -1;
        return ia - ib;
      };
    })(),
  },
});
