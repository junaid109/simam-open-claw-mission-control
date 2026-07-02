# Vercel Deployment

OpenClaw Mission Control can be deployed to Vercel as a static site.

## Project Settings

Recommended Vercel settings:

- Framework preset: Other
- Build command: `npm run build`
- Output directory: `public-dist`
- Install command: `npm install`

These settings are also captured in `vercel.json`.

## CLI Deployment

```bash
npx vercel login
npx vercel --prod --yes
```

If the CLI reports an invalid token, log in again before deploying.

## GitHub Deployment

The repository can also be imported from GitHub in the Vercel dashboard. After import, Vercel should read `vercel.json` and use the same build settings.

## Useful Vercel Capabilities

### Recommended Now

- GitHub preview deployments for every pull request.
- Production deployment from `main` after validation passes.
- Security headers from `vercel.json`.
- Vercel Analytics or Speed Insights if public usage feedback becomes useful.

### Worth Considering Later

- AI Gateway for model routing, budgets, usage monitoring, and provider fallback once the app has a backend or desktop gateway.
- AI SDK for real agent workflows after the command, approval, and audit contracts are stable.
- Vercel Workflows for cloud-hosted long-running agent tasks if the product intentionally adds a cloud mode.
- Vercel MCP for deployment and project operations from compatible agent tools.

### Not Recommended Yet

- Moving local execution into cloud functions before the local gateway exists.
- Sending private workspace or repository content to model providers by default.
- Adding cloud-hosted agent actions that bypass the approval model.

OpenClaw should remain local-first. Vercel is useful for public demos, documentation, preview deployments, and future optional cloud capabilities.
