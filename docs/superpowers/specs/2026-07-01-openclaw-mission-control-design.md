# OpenClaw Mission Control Design Spec

## Goal

Build a production-leaning, local-first Mission Control app that demonstrates safe AI-agent-assisted product engineering, with a polished core experience suitable for the AI Product Engineer application context.

## Context

The workspace begins empty and is not yet a git repository. The job description calls for a founding-engineer style role: product architecture, implementation, testing, release discipline, and AI-agent supervision. The first build should show those capabilities directly through the product.

## Scope

The first version includes:

- React and TypeScript frontend.
- Local structured data for projects, agents, approvals, workflows, commands, tests, risks, and releases.
- Deterministic command routing demonstration.
- Approval queue and safety policy demonstration.
- Project OS documentation: `AGENTS.md`, `DESIGN.md`, `ARCHITECTURE.md`, `WORKFLOWS.md`, `RELEASE_NOTES.md`, and `KNOWN_RISKS.md`.
- Basic automated checks for core domain behavior.

The first version excludes:

- Real shell command execution.
- Production credentials.
- Cloud provider calls.
- External account mutation.
- Desktop IPC implementation.

## Product Surfaces

### Mission Cockpit

Shows project health, active phase, safety posture, agent activity, pending approvals, command routing health, test status, and release readiness.

### Agent Command Center

Shows agent roles, permissions, current task, last output, review status, and safety boundary.

### Approval Layer

Shows risky proposed actions with risk category, rationale, target, proposed command or operation, and decision state.

### Workflow Board

Shows prototype-to-stable phases with objectives, status, owner, blockers, and evidence.

### Local Execution Console

Classifies known commands into safe route, approval required, intake required, or blocked. It records routing explanations and fallback behavior.

### Quality Surface

Shows smoke tests, regression checks, user-flow checks, known risks, limitations, release notes, and follow-up work.

## Architecture

Use Vite, React, TypeScript, and Vitest. Keep domain logic independent of React so routing and approval policy can be tested directly. Store first-version state in local fixture modules and pass it into UI features through typed data structures.

## Safety

The app must never execute local shell commands in the browser. Commands are demonstrations of routing policy only. Risky actions are shown as approval records and decision states.

## Testing

Minimum checks:

- Command router classifies safe, risky, ambiguous, and blocked commands.
- Approval policy flags destructive, credential, production, and external-account operations.
- Build succeeds.
- UI renders core surfaces without runtime errors.

## Success Criteria

- A user can open the app and understand what OpenClaw Mission Control does within 30 seconds.
- The interface demonstrates agent supervision, approvals, workflows, routing, quality, and release discipline.
- The docs explain how agents should work safely in this repo.
- The codebase has clear boundaries for future local execution, IPC, provider integrations, and persistence.
