/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class', // Enable dark mode with a class (you can also use 'media' for system preference)
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#121212',
          secondaryBackground: '#1F1F1F',
          primaryText: '#E0E0E0',
          secondaryText: '#B0B0B0',
          primaryAccent: '#E1306C',
          secondaryAccent: '#F7B731',
          border: '#2C2C2C',
          buttonBackground: '#E1306C',
          buttonText: '#FFFFFF',
          linkColor: '#E1306C',
        },
        background:  '#F0F0F0',
        secondaryBackground: '#F5F5F5',
        primaryText: '#333333',
        secondaryText: '#666666',
        primaryAccent: '#E1306C',
        secondaryAccent: '#F7B731',
        border: '#DDDDDD',
        buttonBackground: '#E1306C',
        buttonText: '#FFFFFF',
        linkColor: '#E1306C',
      },
    },
  },
  plugins: [require('daisyui')],
};
