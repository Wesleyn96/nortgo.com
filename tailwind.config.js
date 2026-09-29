export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  important: '.nortgo-landing',
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        'landing-bg': '#0B0B0D', 'landing-panel': '#1C1C1E',
        'landing-accent': '#C6632A', 'landing-copper': '#EDAA7E',
        'landing-paper': '#F5F2ED', 'landing-muted': '#A5A3A0',
        'landing-ink': '#20201F', 'landing-line': '#343230',
      },
      fontFamily: {
        landing: ['NortGo Landing Inter', 'Arial', 'sans-serif'],
        'landing-display': ['NortGo Landing Barlow', 'Arial Narrow', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

