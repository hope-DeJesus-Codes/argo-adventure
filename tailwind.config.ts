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
        metal: ['var(--font-metal-mania)'],
        courier: ['var(--font-courier-prime)'],
      },
    },
  },
  plugins: [],
};
export default config;