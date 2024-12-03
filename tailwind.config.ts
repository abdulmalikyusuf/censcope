import type { Config } from "tailwindcss";

export default {
  plugins: [],
  theme: {
    extend: {
      margin: {
        'xs': '2%',
        'sm': '4%',
        'md': '6%',
        'lg': '8%',
        'xl': '10%',
        '2xl': '12%',
        '3xl': '14%',
        '4xl': '16%',
        '5xl': '18%',
        '6xl': '20%'
      },
      padding: {
        'xs': '2%',
        'sm': '4%',
        'md': '6%',
        'lg': '8%',
        'xl': '10%',
        '2xl': '12%',
        '3xl': '14%',
        '4xl': '16%',
        '5xl': '18%',
        '6xl': '20%'
      },
      backgroundImage: {
        'support': "url('/images/support.jpg')",
        'spiral': "url('/images/spiral-pattern.png')",
        'white-paper': "url('/images/white-paper.png')",
        'newsletter': "url('/images/newsletter-bg.svg')",
        "banner-slide-back": "url('/images/home-slider-2-bg-back.jpg')",
        "banner-slide-front": "url('/images/home-slider-2-bg-front.png')",
        "home-slider-maison-1": "url('/images/home-slider-2-maison_1.png')",
      },
      scale: {
        '200': '2',
        '300': '3',
        '400': '4'
      }
    },
  },
  content: ["./src/**/**/*.{js,ts,jsx,tsx,mdx}"],
} satisfies Config;