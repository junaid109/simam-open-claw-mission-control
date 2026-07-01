# Local Gateway

The local gateway is the planned boundary between the browser interface and any capability that can inspect files, run analysis, launch workers, or eventually execute approved commands.

The browser UI should remain unable to execute shell commands directly.

## Principles

- Default to read-only capabilities.
- Require explicit allowlists for every native command.
- Keep path access contained to the selected workspace.
- Record every native request as an activity event.
- Treat credentials, production settings, billing, external accounts, and destructive operations as blocked unless an elevated workflow is explicitly designed.

## Staged Plan

### Phase 0: Browser Prototype

Current state.

- Static UI served locally.
- Browser-local state in `localStorage`.
- Command routing is demonstrative only.
- No shell execution.

### Phase 1: Tauri Read-Only Bridge

Add a desktop shell and expose read-only commands.

Candidate commands:

- `workspace.read_manifest`
- `workspace.read_docs_index`
- `workspace.read_file_tree`
- `workspace.read_package_metadata`
- `workspace.read_git_status`

All commands must return structured JSON and include an audit envelope.

### Phase 2: Python Worker Read-Only Analysis

Launch a bounded local worker through the native bridge.

Candidate jobs:

- repository inventory
- documentation summaries
- risk classification
- task proposal generation
- dependency metadata inspection

Worker calls should have timeouts, size limits, and JSON request/response schemas.

### Phase 3: Approval-Gated Local Commands

Introduce command proposals before execution.

Required flow:

1. Route command intent.
2. Classify risk.
3. Build a dry-run preview when possible.
4. Request human approval for mutating commands.
5. Execute only allowlisted commands.
6. Store stdout, stderr, exit code, duration, and actor.

### Phase 4: Adapter Runtime

Allow agent platforms to connect through explicit adapter interfaces.

Adapters should declare:

- supported capabilities
- required permissions
- expected input/output schema
- timeout behavior
- failure modes
- audit event mapping

## Blocked Operations

The first native bridge should reject:

- credential edits
- production deployment changes
- billing or external account changes
- recursive delete, force reset, force push, database wipe, or cleanup scripts
- arbitrary shell strings from the browser
- commands outside the workspace path

## Audit Envelope

Every native result should include:

```json
{
  "requestId": "local-request-id",
  "workspaceId": "workspace-id",
  "actorId": "human-or-agent-id",
  "command": "workspace.read_git_status",
  "riskClass": "safe",
  "status": "ok",
  "startedAt": "2026-07-01T00:00:00.000Z",
  "finishedAt": "2026-07-01T00:00:00.000Z"
}
```
