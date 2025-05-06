/** @type {import('tailwindcss').Config} */
export default { // Use export default se estiver usando modules (template Vite React)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Importante! Escaneia todos os arquivos em src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}