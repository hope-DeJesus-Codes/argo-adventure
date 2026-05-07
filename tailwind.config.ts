//tailwind.congig.ts  
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inknut: ['var(--font-inknut)', 'serif'],
        zen: ['var(--font-zen)', 'serif'],
        goudy: ['var(--font-goudy)', 'serif'],

        /* mapping the old fonts to the new ones */
        metal: ['var(--font-inknut)'],
        courier: ['var(--font-goudy)'],
      },
    },
  },
  plugins: [],
};
export default config;