# Security Model

OpenClaw Mission Control is designed as a local-first product with explicit boundaries between planning, approval, and execution.

## Current Trust Boundary

The current app runs in the browser and stores state in `localStorage`.

Allowed today:

- display project rooms, tasks, agents, approvals, and activity events
- persist local UI state
- simulate command routing decisions
- record local audit entries

Not allowed today:

- execute shell commands
- read arbitrary local files from browser code
- edit credentials or environment files
- call external services with private workspace data
- mutate production settings or external accounts

## Risk Classes

### Safe

Read-only or local UI actions with no external side effects.

Examples:

- moving a task between columns
- selecting a Project OS document
- reviewing local command-routing output
- recording an activity event

### Approval Required

Actions that can change project state, dependencies, machine state, or external configuration.

Examples:

- installing dependencies
- writing files through a native bridge
- launching a worker with repository access
- changing provider configuration
- running build, deploy, or migration commands

### Blocked

Actions that should not run through ordinary agent workflows.

Examples:

- credential edits
- force push
- recursive delete
- production configuration changes
- billing or external account updates
- destructive database operations

## Future Desktop Boundary

A Tauri shell can expose native commands, but only through explicit Rust handlers. The frontend should never send arbitrary shell strings to the native layer.

Every native command should define:

- name
- input schema
- output schema
- risk class
- path containment rules
- audit event fields
- timeout
- failure behavior

## Local Storage Limits

`localStorage` is useful for a prototype but is not a durable product database.

Limitations:

- data is browser-profile scoped
- data can be cleared by the user or browser
- no multi-user access control
- no encrypted-at-rest project store
- no reliable audit immutability

A desktop version should move important state into an app data store with export and backup support.

## Private Data Handling

Until a secure gateway and provider boundary exists, private repository content should not be sent to external services by default. Any future provider integration should make data flow visible and configurable.
