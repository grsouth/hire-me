# hire-me

Static resume/portfolio site built with Vite and React.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

The simplest deployment path is already wired up:

1. Push to `main`.
2. GitHub Actions builds the site.
3. GitHub Pages publishes the contents of `dist/`.
4. The custom domain is supplied by `CNAME`.

If you want a local preflight build, run:

```bash
./deployResume.sh
```

That script now just builds the site by default. It still supports the old
SSH copy flow if you ever need to deploy to a separate box manually:

```bash
./deployResume.sh -k <pem key file> -h <hostname>
```
