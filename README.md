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

## Project structure

```
src/
  App.jsx         # page layout and components
  data/content.js # English + Chinese copy
  index.css       # Tailwind-powered custom styles
```

Feel free to adjust the GitHub workflow (e.g., schedule deployments, build on tags) depending on how you plan to iterate on the playbook.