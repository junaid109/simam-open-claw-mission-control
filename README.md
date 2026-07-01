# OpenClaw Mission Control

OpenClaw Mission Control is a local-first mission-control interface for safe AI-agent-assisted product engineering. It is built around agent supervision, project rooms, approval gates, command routing, Project OS documentation, live audit history, and future desktop/local-worker integration.

The current app is dependency-free: native HTML, CSS, JavaScript, and Node scripts. This keeps the prototype easy to run, inspect, and publish as an open-source project.

## Features

- Agent roster with roles, capabilities, status, and adapter direction.
- Project Rooms kanban board for Approval Layer, Local Bridge, Project OS, Agent Integrations, and Release Readiness.
- Persistent browser-local state using `localStorage`.
- Task movement across Inbox, Assigned, In Progress, Review, and Done.
- Approval queue with approve, revise, and deny decisions.
- Deterministic command routing demo with blocked/approval/intake classifications.
- Project OS workspace for docs, architecture, roadmap, risks, and release notes.
- Live feed powered by audit-log events.
- Open-source metadata, issue templates, PR template, and GitHub Actions validation workflow.

## Running Locally

```bash
npm run dev
```

Open `http://127.0.0.1:5173`.

## Validation

```bash
npm run check
npm run build
```

`npm run check` validates JavaScript syntax. `npm run build` copies the static app to a timestamped folder under `build-output/`.

## Safety Model

- The browser app does not execute shell commands.
- Command routing is demonstrative and audit-logged.
- Destructive, credential, production, dependency, billing, and external-account actions are treated as approval-gated or blocked.
- Tauri and Python worker integrations are planned but not enabled yet.

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the phased plan:

1. Real local product state.
2. Project OS workspace.
3. Agent platform registry and project rooms.
4. Tauri desktop shell.
5. Python worker layer.
6. Approval-gated local execution.
7. Provider and local model integrations.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md).

## License

MIT. See [LICENSE](LICENSE).
