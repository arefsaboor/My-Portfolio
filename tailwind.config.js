/** @type {import('tailwindcss').Config} */

/* The sampled palette now lives entirely in plain CSS — src/index.css defines
   the tokens, and each page's own stylesheet (homepage.css, about.css,
   contact.css, projects.css, utility.css) consumes them. Nothing reads a
   colour, shadow or max-width from this file any more, so those keys were
   removed: a Tailwind config is not hot-reloaded by a running Vite dev server,
   which made it a standing trap for stale styles.

   fontFamily stays: `font-mono` is still used (CVPreviewModal's Esc key), and
   Tailwind's preflight reads fontFamily.sans for the document default. */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Epilogue', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
