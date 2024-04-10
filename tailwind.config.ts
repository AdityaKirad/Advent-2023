import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/app.html',
    './src/**/*.svelte',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    screens: {
      sm: '40em',
      md: '48em',
      lg: '64em',
      xl: '80em',
      '2xl': '96em'
    },
    extend: {}
  },
  plugins: [require('flowbite/plugin')]
} satisfies Config;
