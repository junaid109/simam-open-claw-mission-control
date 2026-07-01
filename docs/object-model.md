# Object Model

OpenClaw Mission Control is organized around a small set of product objects that can work in browser-local state today and map cleanly to a desktop or API-backed runtime later.

## Workspace

A workspace is the top-level local project context. It owns rooms, boards, agents, documents, approvals, and activity history.

Core fields:

- `id`: stable local identifier.
- `name`: human-readable workspace name.
- `health`: summary status such as healthy, needs review, or blocked.
- `docs`: Project OS document references.
- `settings`: local feature flags and safety preferences.

## Project Room

A project room groups work around an operational objective such as Approval Layer, Local Bridge, Project OS, Agent Integrations, or Release Readiness.

Core fields:

- `id`, `name`, `summary`.
- `status`: idle, active, reviewing, blocked, or complete.
- `owner`: human or agent role responsible for coordination.
- `agentIds`: agents assigned to the room.
- `taskIds`: tasks visible in the room.
- `approvalIds`: approvals linked to the room.

## Board And Column

A board represents task flow. The default columns are Inbox, Assigned, In Progress, Review, and Done.

Columns should stay stable enough for activity logs and saved filters to remain meaningful.

## Task

A task is the smallest planned unit of product work.

Core fields:

- `id`, `title`, `summary`.
- `roomId`: project room container.
- `column`: current board phase.
- `assigneeId`: agent or human owner.
- `priority`: low, medium, high, or critical.
- `tags`: product area or risk labels.
- `dueLabel`: optional lightweight planning label.
- `riskClass`: safe, approval-required, or blocked.

## Agent

An agent represents a role that can read, propose, review, or execute work depending on capability boundaries.

Core fields:

- `id`, `name`, `role`.
- `status`: active, idle, reviewing, blocked.
- `capabilities`: read, propose, check, mutate, network, credentials.
- `platformId`: adapter or platform family.
- `assignedRoomIds`.

Agents are not granted authority by being listed. Authority comes from the approval policy and the local gateway.

## Agent Platform

A platform describes an integration family such as a local assistant, Hermes-style agent, OpenHands, AutoGen, or a future custom adapter.

Core fields:

- `id`, `name`, `type`.
- `runtime`: local, desktop-bridge, service, or manual.
- `capabilityCeiling`: maximum allowed behavior.
- `adapterStatus`: planned, mocked, read-only, approval-gated, or disabled.
- `notes`: setup and operational constraints.

## Approval

An approval records a human decision point before risky work proceeds.

Core fields:

- `id`, `title`, `reason`.
- `risk`: dependency, credential, destructive, production, external-account, broad-refactor.
- `requesterId`.
- `target`: file, command, integration, setting, or account.
- `status`: pending, approved, denied, revision-requested.
- `decisionLog`: timestamped decision notes.

## Activity Event

Activity events create the audit trail.

Core fields:

- `id`, `timestamp`, `actorId`.
- `verb`: created, routed, approved, denied, moved, reviewed, built, validated.
- `objectType`, `objectId`.
- `roomId`.
- `summary`.

## Project OS Document

Project OS documents define how the product is designed, governed, and shipped.

Examples include architecture, design, roadmap, workflows, known risks, release notes, and governance.

## Validation Check

A validation check records evidence that the app is safer or more stable after a change.

Core fields:

- `id`, `name`, `command`.
- `status`: pass, fail, skipped.
- `evidence`: output summary or artifact link.
- `runAt`.
