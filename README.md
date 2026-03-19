# Aref Saboor Portfolio (React + Vite)

This is Aref Saboor's personal portfolio site built with React and Vite, styled with Tailwind CSS and deployed on Vercel.

## Features
- Responsive single-page layout with sections for Home, Projects, About, and Contact
- Project data and screenshots managed via JSON and static assets
- Resume preview modal (PDF and mobile-friendly image)
- Contact form wired to a simple backend endpoint

## Environment Variables

Environment variables must be prefixed with `VITE_` to be exposed to the client.

Provided variable:

```bash
VITE_SITE_TITLE="Your Portfolio Title"
```

Setup:
1. Copy `.env.example` to `.env`
2. Adjust values
3. Do not commit `.env` (already in `.gitignore`)

Access in code:

```js
const siteTitle = import.meta.env.VITE_SITE_TITLE;
```

## Scripts

```bash
npm install       # install dependencies
npm run dev       # start development server (http://localhost:5173)
npm run build     # production build to dist/
npm run preview   # preview built app locally
npm run lint      # run ESLint
```

## Deployment (Vercel)

### Option 1: GitHub Integration
1. Push the repository to GitHub.
2. Go to Vercel and import the project.
3. Vercel auto-detects Vite: Build Command `npm run build`, Output Directory `dist`.
4. Add environment variables in the Vercel dashboard matching those in `.env`.
5. Deploy. Subsequent pushes to `main` trigger automatic redeploys.

### Option 2: Vercel CLI

```bash
npm install -g vercel   # or: npx vercel
vercel login
vercel        # first (preview) deploy
vercel --prod # production deploy
```

During first run you can set Build Command `npm run build` and Output Directory `dist`.

### Routing

`vercel.json` is configured so SPA routing falls back to `index.html`.

## Tech Stack
- React 19
- Vite
- Tailwind CSS
- ESLint
- Deployment: Vercel

## Possible Future Work
- Add dark mode toggle
- Optional: move project data to a headless CMS

