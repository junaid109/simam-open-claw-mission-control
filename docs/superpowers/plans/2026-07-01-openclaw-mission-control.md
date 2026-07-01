# OpenClaw Mission Control Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first local-first OpenClaw Mission Control app with a polished cockpit, agent supervision, approval policy, command routing, workflow tracking, quality status, and professional project docs.

**Architecture:** Create a Vite React TypeScript app. Keep product state and safety logic in `src/domain`, keep reusable UI in `src/components`, and keep each product surface in `src/features`. The browser app demonstrates local execution routing but does not execute shell commands.

**Tech Stack:** Vite, React, TypeScript, Vitest, CSS modules/global CSS, local fixture data.

---

## File Structure

- `package.json`: scripts and dependencies.
- `index.html`: Vite app entry document.
- `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`: TypeScript and build configuration.
- `src/main.tsx`: React bootstrap.
- `src/App.tsx`: application shell and feature composition.
- `src/styles.css`: global tokens, layout, responsive styling.
- `src/domain/types.ts`: project, agent, approval, workflow, command, quality, risk, and release types.
- `src/domain/fixtures.ts`: first-version local product data.
- `src/domain/commandRouter.ts`: deterministic command classification.
- `src/domain/approvalPolicy.ts`: risk classification for proposed actions.
- `src/domain/commandRouter.test.ts`: command routing tests.
- `src/domain/approvalPolicy.test.ts`: approval policy tests.
- `src/components/MetricCard.tsx`: small status metric component.
- `src/components/StatusPill.tsx`: status label component.
- `src/features/MissionCockpit.tsx`: project health overview.
- `src/features/AgentCommandCenter.tsx`: agent role and review surface.
- `src/features/ApprovalQueue.tsx`: approval-gated actions.
- `src/features/WorkflowBoard.tsx`: phase and evidence board.
- `src/features/ExecutionConsole.tsx`: command routing demo.
- `src/features/QualityRelease.tsx`: tests, risks, release readiness.

## Tasks

### Task 1: Scaffold Vite React App

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles.css`

- [ ] **Step 1: Create package and config files**

Create `package.json` with scripts:

```json
{
  "name": "openclaw-mission-control",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "tsc && vite build",
    "preview": "vite preview --host 127.0.0.1",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.5",
    "typescript": "^5.7.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.468.0"
  },
  "devDependencies": {
    "vitest": "^2.1.8",
    "@types/react": "^19.0.1",
    "@types/react-dom": "^19.0.2",
    "jsdom": "^25.0.1"
  }
}
```

- [ ] **Step 2: Create Vite entry files**

Create `index.html`, `src/main.tsx`, and a temporary `src/App.tsx` that renders the product name.

- [ ] **Step 3: Create global CSS**

Create `src/styles.css` with base tokens, dark operations-product styling, responsive grid helpers, focus styles, and button styles.

- [ ] **Step 4: Run install**

Run: `npm install`

Expected: dependencies install and `package-lock.json` is created.

- [ ] **Step 5: Run build**

Run: `npm run build`

Expected: TypeScript and Vite build pass.

### Task 2: Add Domain Models and Fixture Data

**Files:**
- Create: `src/domain/types.ts`
- Create: `src/domain/fixtures.ts`
- Modify: `src/App.tsx`

- [ ] **Step 1: Define product types**

Create TypeScript interfaces for project health, agents, approvals, workflow phases, command routes, test runs, risks, and release notes.

- [ ] **Step 2: Add realistic fixture data**

Create local data that reflects the job description: founding-engineer workflow, Codex supervision, approval gates, local-first execution, smoke tests, release notes, and known risks.

- [ ] **Step 3: Wire app state**

Import fixtures into `src/App.tsx` and pass them to placeholder feature sections.

- [ ] **Step 4: Run typecheck build**

Run: `npm run build`

Expected: build passes with no TypeScript errors.

### Task 3: Implement Command Router and Approval Policy

**Files:**
- Create: `src/domain/commandRouter.ts`
- Create: `src/domain/approvalPolicy.ts`
- Create: `src/domain/commandRouter.test.ts`
- Create: `src/domain/approvalPolicy.test.ts`

- [ ] **Step 1: Write command router tests**

Test that `status`, `open approvals`, and `run smoke tests` are safe known routes; `delete`, `reset`, and `force push` require approval or block; unknown free-form requests go to intake.

- [ ] **Step 2: Write approval policy tests**

Test that credential, production, dependency, destructive, and external-account actions require approval.

- [ ] **Step 3: Implement router and policy**

Add deterministic keyword and command matching that returns a typed decision with route, risk, explanation, and recommended next step.

- [ ] **Step 4: Run tests**

Run: `npm test`

Expected: all domain tests pass.

### Task 4: Build Reusable UI Components

**Files:**
- Create: `src/components/MetricCard.tsx`
- Create: `src/components/StatusPill.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Add status component**

Create a `StatusPill` component that maps statuses to color classes and accessible labels.

- [ ] **Step 2: Add metric card component**

Create a `MetricCard` component for cockpit metrics with icon slot, title, value, label, and tone.

- [ ] **Step 3: Style reusable components**

Add CSS classes for compact cards, status pills, icon buttons, and panel headers.

- [ ] **Step 4: Run build**

Run: `npm run build`

Expected: build passes.

### Task 5: Build Product Surfaces

**Files:**
- Create: `src/features/MissionCockpit.tsx`
- Create: `src/features/AgentCommandCenter.tsx`
- Create: `src/features/ApprovalQueue.tsx`
- Create: `src/features/WorkflowBoard.tsx`
- Create: `src/features/ExecutionConsole.tsx`
- Create: `src/features/QualityRelease.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Build mission cockpit**

Render project status, safety posture, active phase, pending approvals, command routing health, and smoke-test summary.

- [ ] **Step 2: Build agent command center**

Render agent cards with role, permissions, current task, last output, and review status.

- [ ] **Step 3: Build approval queue**

Render approval records with risk, target, rationale, proposed command, and decision actions.

- [ ] **Step 4: Build workflow board**

Render workflow phases with owner, status, blockers, and evidence.

- [ ] **Step 5: Build execution console**

Provide a local input that classifies command text through `routeCommand` and shows the route decision without executing it.

- [ ] **Step 6: Build quality and release surface**

Render smoke tests, regression checks, risks, limitations, and release readiness.

- [ ] **Step 7: Run build**

Run: `npm run build`

Expected: build passes and Vite emits production assets.

### Task 6: Verify and Document

**Files:**
- Modify: `README.md`
- Modify: `RELEASE_NOTES.md`
- Create: `IMPLEMENTATION_LOG.md`
- Optional Create: `.gitignore`

- [ ] **Step 1: Add usage instructions**

Update `README.md` with install, dev, test, and build commands.

- [ ] **Step 2: Add implementation log**

Create `IMPLEMENTATION_LOG.md` with date, scope, checks run, known limitations, and next steps.

- [ ] **Step 3: Add git ignore**

Create `.gitignore` for `node_modules`, `dist`, `.env`, `.superpowers`, and logs.

- [ ] **Step 4: Run final checks**

Run: `npm test`

Expected: all tests pass.

Run: `npm run build`

Expected: production build passes.

- [ ] **Step 5: Start dev server**

Run: `npm run dev`

Expected: Vite serves the app at a local URL.

## Self-Review

- Spec coverage: cockpit, agents, approvals, workflows, command routing, quality, release docs, and agent workflow docs are covered.
- Placeholder scan: no planned requirement is left undefined.
- Type consistency: product state, router decisions, and approval policy outputs are centralized in `src/domain/types.ts`.

## Forward Roadmap Addendum

The original implementation plan described a Vite/React path. Package-manager installs repeatedly timed out in this environment, so the shipped prototype is currently dependency-free HTML/CSS/JavaScript with Node scripts. Future planning should follow `ROADMAP.md` as the source of truth.

Next workstreams:

- Phase 1: finish real local product state.
- Phase 2: expand the Project OS workspace.
- Phase 3: add agent platform registry details for Codex, Hermes-style local agents, OpenHands, AutoGen, and future adapters.
- Phase 4: start Tauri conversion once the UI state model is stable.
- Phase 5: add Python workers after Tauri can broker read-only native access.
- Phase 6: add project rooms for agent workstreams.
- Phase 7: add approval-gated local command execution.
- Phase 8: add provider and local model integrations.

Validation approach:

- Use syntax checks, build checks, UI smoke checks, path containment checks, and manual workflow validation.
- Do not introduce heavy test-driven workflow unless a risky subsystem needs it.
- Keep command execution disabled until the Tauri approval bridge and audit log are both present.
