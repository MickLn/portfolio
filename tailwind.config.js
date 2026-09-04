/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F4F3EF',
        'paper-dark': '#121212',
        'surface-dark': '#1A1A1A',
        carbon: '#1A1A1A',
        'carbon-muted': '#666664',
        'border-sharp': '#D5D4CE',
        'border-sharp-dark': '#2A2A2A',
        'border-dark': '#2E2E2E',
        'footer-bg': '#141414',
        'footer-purple': '#61286C',
        'accent-green': '#10B981',
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Space Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
