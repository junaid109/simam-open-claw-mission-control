# Contributing

Thanks for helping improve OpenClaw Mission Control.

## Development Principles

- Keep the project local-first by default.
- Do not add command execution without approval gates and audit logging.
- Keep browser code unable to mutate local files or run shell commands.
- Treat assistant or automation output as proposed work until reviewed by a maintainer.
- Prefer small, reversible changes with clear validation evidence.

## Local Workflow

```bash
npm run check
npm run build
npm run dev
```

The current app is dependency-free. Do not add dependencies unless they are necessary and documented in the pull request.

## Pull Request Checklist

- Describe what changed and why.
- Note any safety implications.
- Run validation checks.
- Update `ROADMAP.md`, `ARCHITECTURE.md`, `CHANGELOG.md`, or related docs if behavior or direction changed.
- Do not include credentials, production settings, or local machine secrets.
