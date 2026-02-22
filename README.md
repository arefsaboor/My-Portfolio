# Portfolio Site (React + Vite)

This is Aref Saboor's portfolio site built with React and Vite. It supports fast HMR development, TailwindCSS styling, and is configured for deployment on Vercel.

## Environment Variables

Environment variables must be prefixed with `VITE_` to be exposed to the client.

Provided variables:

```
VITE_SITE_TITLE="Your Portfolio Title"
```

1. Copy `.env.example` to `.env`
2. Adjust values
3. Never commit `.env` (it's in `.gitignore`)

Access inside code via:

```js
const siteTitle = import.meta.env.VITE_SITE_TITLE;
```

## Development

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Build

```bash
npm run build
```

Outputs static assets to `dist/`.

## Deployment (Vercel)

### Option 1: GitHub Integration
1. Push repository to GitHub (already present).
2. Go to [Vercel](https://vercel.com) and import the project.
3. Vercel auto-detects Vite: Build Command `npm run build`, Output Directory `dist`.
4. Add Environment Variables in the Vercel dashboard (Project Settings → Environment Variables) matching those in `.env`.
5. Deploy. Subsequent pushes to `main` trigger automatic redeploys.

### Option 2: Vercel CLI
```bash
npm install -g vercel   # or: npx vercel
vercel login
vercel        # first (preview) deploy
vercel --prod # production deploy
```
During first run you can set: Build Command `npm run build`, Output Directory `dist`.

### Routing
`vercel.json` ensures SPA routing falls back to `index.html`.

## Linting

```bash
npm run lint
```

## Tech Stack
- React 19
- Vite
- TailwindCSS
- ESLint
- Deployment: Vercel

## Future Improvements
- Add project data via JSON or CMS
- Dark mode toggle
- Contact form backend integration

