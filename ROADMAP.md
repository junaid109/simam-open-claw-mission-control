# Roadmap

OpenClaw Mission Control should grow in deliberate slices: first make local product state useful, then add a desktop bridge, then add read-only automation, and only then allow approval-gated execution.

## Phase 1: Real Local Product State

Status: in progress

Purpose: make the dashboard operational instead of static.

Scope:

- Persistent local state for approvals, workflow phases, command history, selected Project OS document, and audit log.
- Approval decisions: approve, deny, request revision.
- Workflow status editing.
- Command history and routing evidence.
- Local reset for demo and recovery.

Exit criteria:

- A user can make decisions and refresh without losing state.
- Every meaningful local action leaves an audit entry.
- No shell command execution exists in the browser.

## Phase 2: Project OS Workspace

Status: in progress

Purpose: make the repo's operating doctrine visible inside the product.

Scope:

- In-app document reader for `GOVERNANCE.md`, `DESIGN.md`, `ARCHITECTURE.md`, `WORKFLOWS.md`, `KNOWN_RISKS.md`, `CHANGELOG.md`, and `RELEASE_NOTES.md`.
- Branch notes and implementation notes surface.
- Risk and release note creation flow.
- Project health checklist.

Exit criteria:

- The operator can inspect project doctrine without leaving Mission Control.
- Release discipline, agent safety rules, and known risks are part of the main workflow.

## Phase 3: Agent Platform Registry

Status: next

Purpose: support real agent platforms without giving them unsafe authority too early.

Scope:

- Registry for Core Assistant, Hermes-style local agents, OpenHands, AutoGen, and future adapters.
- Capability profiles: read-only, propose edits, run checks, mutate files, external network, credentials.
- Safety boundary per platform.
- Adapter readiness checklist.
- Room assignment model: which agent can participate in which project room.

Exit criteria:

- Agent platforms can be represented, planned, and reviewed.
- No external agent can mutate files or execute commands without an approval-gated bridge.

## Phase 4: Tauri Desktop Shell

Status: start after Phases 1 and 2 feel stable

Purpose: convert the web UI into a local desktop app with secure native capabilities.

Why Tauri:

- Tauri is a desktop app framework.
- The UI remains web-based HTML/CSS/JS.
- The native shell is Rust, which exposes explicit commands to the frontend.
- It is lighter than Electron and gives better control over local permissions.

Initial Tauri scope:

- Wrap the current UI in a desktop shell.
- Add read-only commands for workspace inspection.
- Read file tree, package metadata, docs, and project config.
- Store durable app data in an app data directory.
- Keep command execution disabled by default.

Exit criteria:

- Mission Control runs as a desktop app.
- The frontend can ask the native layer for read-only project facts.
- Native commands are allowlisted and audited.

## Phase 5: Python Worker Layer

Status: start after Tauri read-only bridge exists

Purpose: use Python for repo analysis, agent adapters, local model helpers, and automation that is better outside the browser.

Scope:

- Python worker process launched by the Tauri backend or a local bridge.
- Read-only repository analysis.
- Structured summaries of files, docs, risks, and possible tasks.
- Agent adapter experiments for Hermes/OpenHands/AutoGen-style integrations.
- JSON request/response protocol with timeouts and logs.

Exit criteria:

- Python can inspect the repo and return structured results.
- Worker calls are logged.
- Mutating operations still require explicit approval.

## Phase 6: Project Rooms and Workflows

Status: after agent registry

Purpose: organize agent work around objectives instead of one flat dashboard.

Scope:

- Create rooms for workstreams such as `Approval Layer`, `Local Bridge`, `Project OS`, `Release Readiness`.
- Assign agents, approvals, commands, docs, tasks, and logs to rooms.
- Track human review status per room.
- Add room-level audit timeline.

Exit criteria:

- Multi-agent work has a clear operational container.
- Rooms make work reviewable by a non-technical stakeholder.

## Phase 7: Approval-Gated Local Execution

Status: later, after Tauri and Python foundations

Purpose: allow carefully controlled local commands.

Scope:

- Command allowlist.
- Dry-run previews.
- Path containment checks.
- Approval request before mutation.
- Execution log with stdout/stderr capture.
- No credential, production, billing, or destructive actions without elevated review.

Exit criteria:

- Safe read-only commands can run directly.
- Risky commands are proposed, reviewed, approved, and audited before execution.
- Blocked commands remain blocked.

## Phase 8: Provider and Local Model Integrations

Status: later

Purpose: add model choice without binding the product to one provider.

Scope:

- Provider adapter interface.
- Local model option registry.
- Fallback logic.
- Cost and privacy labels.
- Per-agent model assignment.

Exit criteria:

- Provider choice is explicit and auditable.
- Local-first behavior remains the default.

## Recommended Immediate Sequence

1. Finish Phase 1 and Phase 2 polish.
2. Add Phase 3 agent registry detail and room assignment.
3. Start Phase 4 Tauri shell as soon as the local UI state feels stable.
4. Add Python only after Tauri can safely broker read-only local access.

## Engineering Standard

Use pragmatic full-stack discipline:

- Keep browser code unable to execute shell commands.
- Put native capabilities behind explicit Tauri commands.
- Keep Python workers isolated, timeout-bound, and JSON-speaking.
- Log all local actions.
- Prefer validation checks and smoke checks over heavy process for early prototype work.
- Keep every integration reversible until it is proven safe.



