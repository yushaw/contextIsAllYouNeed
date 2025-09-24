# Context is All You Need

A bilingual (English/中文) landing page that captures a context-engineering playbook for LLM agents. Built with React + Vite and styled with Tailwind.

## Local development

```bash
npm install
npm run dev
```

The dev server lives at <http://localhost:5173/> by default.

## Build locally

```bash
npm run build
npm run preview   # optional: serve the production build locally
```

## GitHub repository setup

1. Create a new repository on GitHub (for example `your-username/context-is-all-you-need`).
2. From this project folder run:
   ```bash
   git branch -M main
   git remote add origin git@github.com:your-username/your-repo.git
   git add .
   git commit -m "Initial site"
   git push -u origin main
   ```
   Replace `your-username/your-repo` with the actual path.

## Deploying with GitHub Pages

This project ships with a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically publishes the `dist/` build to GitHub Pages on every push to `main`.

After pushing to GitHub:

1. In the GitHub repo, open **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** (the workflow in this repo handles the rest).
3. Wait for the **Deploy to GitHub Pages** workflow to finish (check the **Actions** tab).
4. Your site will be live at `https://<username>.github.io/<repository>/`.

Because the `vite.config.js` automatically derives the correct base path when building on GitHub Actions, no extra configuration is necessary. Local builds continue to use the default `/` base.

## Useful scripts

- `npm run lint` – add if you decide to wire up ESLint/prettier later.
- `npm run build` – produces the static site in `dist/` for deployment.
- `npm run preview` – serves the production build locally for spot checks.

## Project structure

```
src/
  App.jsx         # page layout and components
  data/content.js # English + Chinese copy
  index.css       # Tailwind-powered custom styles
```

Feel free to adjust the GitHub workflow (e.g., schedule deployments, build on tags) depending on how you plan to iterate on the playbook.
