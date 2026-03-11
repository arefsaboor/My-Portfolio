/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'live-pulse': 'live-pulse 4s ease-in-out infinite',
        'dot-pulse': 'dot-pulse 4s ease-in-out infinite',
      },
      keyframes: {
        'live-pulse': {
          '0%': { 
            borderColor: 'rgb(134 239 172)',
            boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.7)',
            transform: 'scale(1)',
          },
          '12.5%': { 
            borderColor: 'rgb(134 239 172)',
            boxShadow: '0 0 0 6px rgba(34, 197, 94, 0)',
            transform: 'scale(1.05)',
          },
          '25%': { 
            borderColor: 'rgb(134 239 172)',
            boxShadow: '0 0 0 0 rgba(34, 197, 94, 0)',
            transform: 'scale(1)',
          },
          '50%': { 
            borderColor: 'rgb(251 146 60)',
            boxShadow: '0 0 0 0 rgba(251, 146, 60, 0.7)',
            transform: 'scale(1)',
          },
          '62.5%': { 
            borderColor: 'rgb(251 146 60)',
            boxShadow: '0 0 0 6px rgba(251, 146, 60, 0)',
            transform: 'scale(1.05)',
          },
          '75%': { 
            borderColor: 'rgb(251 146 60)',
            boxShadow: '0 0 0 0 rgba(251, 146, 60, 0)',
            transform: 'scale(1)',
          },
          '100%': { 
            borderColor: 'rgb(134 239 172)',
            boxShadow: '0 0 0 0 rgba(34, 197, 94, 0)',
            transform: 'scale(1)',
          },
        },
        'dot-pulse': {
          '0%, 25%': { 
            backgroundColor: 'rgb(34 197 94)',
          },
          '50%, 75%': { 
            backgroundColor: 'rgb(251 146 60)',
          },
          '100%': { 
            backgroundColor: 'rgb(34 197 94)',
          },
        },
      },
    },
  },
  plugins: [],
}
