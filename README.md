# Balpop Instal

Website for Balpop Instal SRL — tamplarie PVC si aluminiu, ferestre termopan, usi si inchideri balcoane.

Live at: https://balpopinstal.ro

## Local development

```bash
npm start
```

This starts a local server at `http://localhost:3000` using `npx serve`.

## Deployment

The site deploys automatically via GitHub Actions. Every push to `main` triggers the workflow (`.github/workflows/publish.yaml`) which:

1. Runs `yarn run build` — copies static files into a `build/` folder
2. Deploys the `build/` folder to the `gh-pages` branch using `peaceiris/actions-gh-pages`
3. GitHub Pages serves the `gh-pages` branch at https://balpopinstal.ro
