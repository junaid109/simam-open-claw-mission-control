# Product Design

## Positioning

OpenClaw Mission Control is an operating console for local-first, AI-assisted product engineering. It should feel calm, serious, and usable by a non-technical stakeholder while still exposing the evidence an engineer needs: commands, approvals, agent outputs, tests, risks, and release state.

## Design Principles

- **Local-first confidence:** Show what is happening on the local machine before introducing cloud or provider assumptions.
- **Human authority:** Make approvals, review state, and safety boundaries visible.
- **Operational clarity:** Prioritize scan-friendly dashboards, dense information, and direct actions over marketing sections.
- **Deterministic before conversational:** Known commands should route to known handlers before general chat.
- **Every major change leaves a trail:** Logs, notes, test results, risks, and release entries should be visible.

## Core Screens

### Mission Cockpit

The first screen summarizes project health: active phase, safety posture, agent activity, pending approvals, smoke-test state, command routing health, and release readiness.

### Agent Command Center

Shows agent roles, permissions, current assignments, recent outputs, confidence level, and review status. It must make clear that agents propose work and humans accept work.

### Approval Layer

Displays requested actions with risk category, command or change summary, affected files or systems, approval reason, and decision state. The UI should support approve, deny, and request revision states in the product model.

### Workflow Board

Represents the path from prototype to stable application: map, repair, extend, integrate, test, release. Each stage should show objectives, status, owners, blockers, and evidence.

### Local Execution Console

Demonstrates deterministic command routing. Known commands are classified and routed to specific handlers. Unknown or ambiguous commands fall back to intake, not direct execution.

### Quality Surface

Summarizes smoke tests, regression checks, user-flow tests, known risks, limitations, release notes, and follow-up work.

## Visual Direction

The app should look like a modern operations product: restrained, crisp, information-rich, and trustworthy. Use a dark neutral base with contrasting status colors, white-space discipline, small-radius panels, readable tables, and icon-led controls. Avoid decorative hero pages and empty marketing composition.

## First-Version Data

The initial version can use local mock data if the models are structured as real product state:

- Projects
- Rooms
- Agents
- Workflows
- Actions
- Approvals
- Commands
- Test runs
- Risks
- Releases

## Accessibility

Use semantic HTML, visible focus states, sufficient contrast, button labels, and layout constraints that prevent text overlap at desktop and mobile sizes.
