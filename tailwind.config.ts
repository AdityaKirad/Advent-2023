import type { Config } from 'tailwindcss';

export default {
  content: ['./src/app.html', './src/**/*.svelte'],
  theme: {
    extend: {}
  },
  plugins: []
} satisfies Config;
