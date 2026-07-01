# API Roadmap

OpenClaw Mission Control should become API-first only when product objects and safety boundaries are stable enough to justify a formal contract.

## Goals

- Keep UI state, gateway requests, worker jobs, and adapter events structured.
- Make integrations testable without relying on UI clicks.
- Support local-first operation before multi-user server features.
- Preserve human approval as a first-class object.

## Candidate Contracts

### Command Route Request

```json
{
  "workspaceId": "workspace-id",
  "actorId": "agent-or-human-id",
  "intent": "inspect repository status",
  "context": {
    "roomId": "local-bridge"
  }
}
```

### Command Route Result

```json
{
  "route": "safe-readonly",
  "riskClass": "safe",
  "requiresApproval": false,
  "reason": "Read-only workspace inspection is allowlisted."
}
```

### Approval Request

```json
{
  "title": "Run dependency install",
  "risk": "dependency",
  "target": "package manager",
  "operation": "install packages",
  "requesterId": "frontend-builder",
  "status": "pending"
}
```

### Activity Event

```json
{
  "actorId": "release-steward",
  "verb": "validated",
  "objectType": "build",
  "objectId": "local-static-build",
  "summary": "Static build completed successfully."
}
```

## Future Endpoints

For a local gateway or backend service, candidate endpoints include:

- `GET /workspace`
- `GET /rooms`
- `POST /commands/route`
- `POST /approvals`
- `POST /approvals/:id/decision`
- `POST /worker/jobs`
- `GET /activity`
- `POST /agent-platforms/:id/check`

Endpoint design should remain secondary to the local-first desktop boundary. The browser should still avoid direct privileged access.
