import { defineConfig } from 'histoire';
import { HstVue } from '@histoire/plugin-vue';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [HstVue()],
  storyMatch: ['src/**/*.story.vue'],
  setupFile: './histoire.setup.ts',
  routerMode: 'hash',
  vite: {
    base: process.env.BASE_PATH ?? '/bench/',
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
    favicon: './public/favicon.svg',
  },
  tree: {
    file: 'title',
    order: (a: string, b: string) => {
      const order = ['Welcome', 'Foundations', 'Components', 'Patterns', 'Showcase'];
      const ia = order.indexOf(a);
      const ib = order.indexOf(b);
      if (ia === -1 && ib === -1) return a.localeCompare(b);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    },
  },
});
