import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        'dark': "#09090B",
        'primary': '#8B5CF6',
        'secundary': '#10B981', 
        'error': "#cf6679"
      },
      animation: {
        flip: "flip 0.8s ease",
      },
      keyframes: {
        flip: {
          '0%': { transform: "rotateX(0)" },
          "100%": { transform: "rotateX(180deg)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
