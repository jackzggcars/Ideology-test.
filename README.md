# Political Compass Hub

A single site with five political and philosophical self-assessment tests — Political Compass, Vote Compass, 12 Axes, NeoValues, and PhiloSorter — each scored (or branched) client-side against a database of 12 political parties, 47 ideological traditions, 36 NeoValues archetypes, and 96 philosophical schools. Nothing is sent to a server; every test runs entirely in the browser.

Built with React 19, TypeScript, Vite, and Tailwind CSS 4.

## Running locally

Requires Node.js 18.18+ (Node 20 LTS recommended).

```bash
npm install
npm run dev
```

This starts a dev server, printed in the terminal (defaults to `http://localhost:5173`).

Other scripts:

```bash
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

## Putting this on GitHub

1. Create a new, empty repository on GitHub (don't initialize it with a README/.gitignore — you already have both here).
2. From this project folder:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

3. **Double-check `node_modules/` never gets committed.** The included `.gitignore` already excludes it, along with `dist/`, `.vercel/`, `.env*`, and editor/log files. If you ever accidentally commit `node_modules`, remove it with `git rm -r --cached node_modules` and commit again.

### What's in `.gitignore` and why

| Entry | Reason |
|---|---|
| `node_modules/` | Installed dependencies — huge, and reproducible from `package.json` + lockfile |
| `dist/`, `build/` | Build output — regenerated on every deploy, shouldn't be versioned |
| `.vercel/` | Local Vercel CLI project link/config — machine-specific, not source |
| `.env`, `.env.local`, `.env.*.local` | Secrets/environment config — this project doesn't currently need any, but never commit them if you add some later |
| `.vite/`, `vite.config.*.timestamp-*` | Vite's internal cache files |
| `logs/`, `*.log`, `npm-debug.log*` | Local log noise |
| `.DS_Store` | macOS Finder metadata |
| `*.tsbuildinfo` | TypeScript incremental build cache |

## Deploying to Vercel

**Option A — via the Vercel dashboard (easiest):**

1. Push the repo to GitHub (see above).
2. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repository.
3. Vercel auto-detects Vite. Confirm these settings (they're also pinned in `vercel.json` in this repo, so you shouldn't need to touch them):
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Click **Deploy**. Every subsequent push to `main` auto-deploys; pushes to other branches get their own preview URL.

**Option B — via the Vercel CLI:**

```bash
npm install -g vercel
vercel login
vercel          # deploys a preview
vercel --prod   # deploys to production
```

The CLI will create a local `.vercel/` folder to remember the project link — this is already gitignored.

No environment variables are required for this project to build or run.

## Project structure

```
index.html          Static HTML shell
src/main.tsx         React entry point
src/App.tsx           Home page / test picker
src/TestRunner.tsx     Question-by-question test flow (keyboard shortcuts: 1–5, Enter, ←/→)
src/Results.tsx        Results screens (compass plot, party/ideology match, axis bars)
src/CompassViz.tsx     2D political-compass SVG visualization
src/AxesViz.tsx        Multi-axis bar visualization (12 Axes / NeoValues)
src/data.ts            Questions, scoring, party + ideology databases
src/index.css          Theme tokens (colors/fonts) + global styles
src/PhilosorterRunner.tsx    PhiloSorter: branching flowchart quiz (home → quiz → result / browse)
src/PhilosorterEmblem.tsx    Generative SVG "emblem" for each philosophical school
src/philosorterPhilosophies.ts  The 96 philosophical schools (quote, thinker, blurb, colors)
src/philosorterQuiz.ts        The branching question tree PhiloSorter walks through
```

## Adding or editing content

- **Questions & scoring:** edit the arrays in `src/data.ts` (`politicalCompassQuestions`, `voteCompassQuestions`, `twelveAxesQuestions`, `neoValuesQuestions`). Each question maps to one or more `axes` keys with a weight from -2 to 2.
- **Parties:** edit `partyPositions` in `src/data.ts` — used by the Vote Compass test.
- **Ideology database:** edit `ideologyPositions` in `src/data.ts` — used to find the closest ideological match on the Political Compass test.
- **NeoValues archetypes:** edit `neoValuesArchetypes` in `src/data.ts` — each has a 5-axis target vector, a color, and a `lucide-react` icon key (see `ArchetypeIcon.tsx`).
- **PhiloSorter schools/questions:** edit `philosophies` in `src/philosorterPhilosophies.ts` and the question tree in `src/philosorterQuiz.ts` — each `r:<name>` leaf in the question tree must match a key in `philosophies` exactly.
- **New test:** add an entry to `TESTS` in `src/data.ts`, a question array, and wire it up in `getQuestions()` in `src/App.tsx`.
