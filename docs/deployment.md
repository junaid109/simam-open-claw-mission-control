# Deployment

OpenClaw Mission Control currently ships as a static local web application. The deployment path should stay simple until native capabilities are introduced.

## Local Development

```bash
npm run dev
```

Open `http://127.0.0.1:5173`.

## Validation

```bash
npm run validate
```

This runs JavaScript syntax checks and builds a static output folder.

## Static Build

```bash
npm run build
```

The build script copies `index.html`, `src/`, and public documentation assets into `build-output/`.

## GitHub Pages

A static GitHub Pages deployment is possible once the project is ready for public demos.

Recommended approach:

1. Run `npm run validate` locally.
2. Add a GitHub Actions workflow that builds the static output.
3. Publish only static assets.
4. Do not include `.env`, local logs, temporary build files, or private workspace data.

## Desktop Packaging Roadmap

The planned desktop path is Tauri.

Initial desktop scope:

- wrap the existing UI
- expose read-only workspace inspection commands
- store app state in an application data directory
- keep command execution disabled by default
- log every native request

Native execution should not be added until the local gateway, approval policy, and audit model are stable.

## Container Roadmap

A Docker or Compose setup may be useful later if the project grows a backend service or local gateway process. It is not necessary for the current static prototype.

If introduced, container configuration should avoid mounting broad host paths and should not bake secrets into images.
