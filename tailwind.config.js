/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FDF6E3',
        parchment: '#F5ECD7',
        'warm-sand': '#E8D5B7',
        amber: '#D4A853',
        'amber-deep': '#B8923E',
        terracotta: '#C4654A',
        'terracotta-dark': '#A34E35',
        ochre: '#C4933F',
        'mango-green': '#4A6741',
        'mango-green-dark': '#3A5233',
        bark: '#6B4C3B',
        'bark-light': '#8B6F5E',
        charcoal: '#2C2417',
        'desert-dust': '#D4A574',
        'sunset-rose': '#D4866B',
        'lotus-pink': '#E8A598',
        'raj-red': '#A8423F',
        'pure-white': '#FFFFFF',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        'source-serif': ['"Source Serif 4"', 'serif'],
        inter: ['Inter', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'warm-card': '0 12px 40px rgba(44,36,23,0.12)',
        'warm-lg': '0 20px 60px rgba(44,36,23,0.15)',
        'amber-glow': '0 8px 24px rgba(212,168,83,0.3)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "bob": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        "pulse-glow": {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(212,168,83,0.4)" },
          "50%": { transform: "scale(1.05)", boxShadow: "0 0 40px rgba(212,168,83,0.4)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "bob": "bob 2s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
