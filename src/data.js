export const projectHealth = { name: "OpenClaw Mission Control", branch: "feature/local-first-foundation", environment: "Local", lastSync: "2m ago", posture: "Safe local-first", activePhase: "Implement", overallStatus: "Healthy", completedTasks: 42, totalTasks: 58, activeAgents: 5, totalAgents: 6, pendingApprovals: 3, testsPassing: 184, totalTests: 201, estimatedCompletion: "2h 14m" };
export const agents = [
  { id: "product", name: "Product Lead", icon: "PL", role: "Coordinates roadmap and project-room priorities", status: "active", tone: "orange", tasks: 3, platform: "Core", capability: "Plan, critique, scope" },
  { id: "dev", name: "Dev", icon: "DV", role: "Builds UI, local state, bridge surfaces", status: "active", tone: "blue", tasks: 4, platform: "Core", capability: "Propose edits, run checks" },
  { id: "safety", name: "Safety", icon: "SF", role: "Reviews approvals, credentials, destructive actions", status: "active", tone: "green", tasks: 2, platform: "Policy", capability: "Approve, deny, block" },
  { id: "bridge", name: "Bridge", icon: "BR", role: "Plans Tauri and Python worker integration", status: "review", tone: "violet", tasks: 2, platform: "Hermes-ready", capability: "Read-only native plan" },
  { id: "release", name: "Release", icon: "RL", role: "Maintains notes, risks, validation evidence", status: "idle", tone: "amber", tasks: 1, platform: "Core", capability: "Docs and summaries" },
  { id: "support", name: "Support", icon: "SP", role: "Handles operator intake and ambiguous commands", status: "idle", tone: "slate", tasks: 1, platform: "Future", capability: "Triage and intake" }
];
export const approvals = [["Install provider integration dependency", "Add SDK package for a future model provider adapter.", "Bridge Engineer", "medium", "package.json", "npm install provider-sdk"], ["Remove stale prototype directory", "Delete an unused prototype folder after migration.", "Code Architect", "high", "prototype/archive", "recursive delete"], ["Change production model setting", "Point production profile to a different hosted model.", "Frontend Builder", "blocked", ".env.production", "edit production credential-adjacent config"]];
export const workflowPhases = [["Map and Analyze", "complete", "Code Architect", 100, "Understand repository architecture and product intent.", "None", "Architecture map and product scope recorded."], ["Design", "complete", "Product Mapper", 100, "Define safe local-first product surface.", "None", "DESIGN.md and architecture spec created."], ["Implement", "in-progress", "Frontend Builder", 72, "Build cockpit, approvals, agents, workflow, console, and quality UI.", "Awaiting final verification.", "Domain modules and UI underway."], ["Test", "pending", "QA Reviewer", 0, "Run smoke, regression, build, and visual checks.", "Implementation must finish first.", "Test plan in docs."], ["Release Ready", "pending", "Release Steward", 0, "Record release notes, limitations, and follow-up work.", "Final checks pending.", "Release notes initialized."]];
export const tests = [["Smoke tests", "passing", "91.5%", "Core flows validated"], ["Code coverage", "warning", "78.3%", "Domain logic covered first"], ["Lint", "passing", "0 issues", "No current lint findings"], ["Type check", "passing", "0 errors", "No runtime type issues"], ["Security scan", "warning", "2 low risks", "Provider integration deferred"]];
export const risks = [["Local mock data only", "Demonstrates behavior but does not execute real commands.", "medium", "Keep data realistic and defer execution behind approval policy."], ["Browser cannot safely execute local commands", "Local console is a routing demonstration in v1.", "medium", "Add desktop IPC only after audit logging and approvals are tested."], ["Agent output may be over-trusted", "Users could accept work without review.", "high", "Make review state, approval gates, and stop conditions visible."]];
export const projectDocs = [
  { title: "Governance", path: "/GOVERNANCE.md", purpose: "Rules for safe project operation." },
  { title: "Design", path: "/DESIGN.md", purpose: "Product principles and screen model." },
  { title: "Architecture", path: "/ARCHITECTURE.md", purpose: "Boundaries, routing, and future bridge." },
  { title: "Roadmap", path: "/ROADMAP.md", purpose: "Phased plan through Tauri and Python." },
  { title: "Workflows", path: "/WORKFLOWS.md", purpose: "Development, approval, and release flow." },
  { title: "Risks", path: "/KNOWN_RISKS.md", purpose: "Known limitations and mitigations." },
  { title: "Changelog", path: "/CHANGELOG.md", purpose: "Public project history." },
  { title: "Release Notes", path: "/RELEASE_NOTES.md", purpose: "Unreleased product history." }
];
export const agentPlatforms = [
  { id: "hermes", name: "Hermes Agent", status: "planned", role: "Fast local task runner adapter", boundary: "Design adapter contract now; launch only after approval and audit bridge exist.", capabilities: ["local tasks", "read-only repo scan", "queued execution"], readiness: ["adapter manifest", "approval bridge", "log capture"] },
  { id: "openhands", name: "OpenHands", status: "gated", role: "Open-source software engineering agent", boundary: "Read/project planning mode first; file mutation requires approval queue integration.", capabilities: ["repo reasoning", "edit proposals", "tool planning"], readiness: ["sandbox profile", "diff review", "command allowlist"] },
  { id: "autogen", name: "AutoGen", status: "planned", role: "Multi-agent orchestration experiments", boundary: "Useful for room-based collaboration, but no autonomous execution in v1.", capabilities: ["multi-agent rooms", "role debates", "plan critique"], readiness: ["room protocol", "message log", "human review"] },
  { id: "core-assistant", name: "Core Assistant", status: "available", role: "Built-in supervised planning and review assistant", boundary: "Outputs remain review-required before release.", capabilities: ["planning", "review", "documentation"], readiness: ["active", "supervised", "validation checks"] }
];
export const projectRooms = [
  { id: "approval-layer", name: "Approval Layer", owner: "Safety", accent: "orange", goal: "Make every risky action explicit, reviewable, and auditable." },
  { id: "local-bridge", name: "Local Bridge", owner: "Bridge", accent: "blue", goal: "Prepare Tauri read-only workspace access and Python worker boundaries." },
  { id: "project-os", name: "Project OS", owner: "Product Lead", accent: "violet", goal: "Keep design, architecture, risks, release notes, and logs visible." },
  { id: "agent-integrations", name: "Agent Integrations", owner: "Bridge", accent: "green", goal: "Model Core Assistant, Hermes, OpenHands, and AutoGen adapters safely." },
  { id: "release-readiness", name: "Release Readiness", owner: "Release", accent: "slate", goal: "Track validation checks, limitations, and handoff notes." }
];
export const roomTasks = [
  { id: "task-1", room: "approval-layer", status: "inbox", title: "Define approval categories", summary: "Credential, production, dependency, destructive, external account, and read-only classes.", agent: "Safety", tags: ["policy", "risk"], due: "Today", priority: "high" },
  { id: "task-2", room: "approval-layer", status: "review", title: "Wire approval buttons to audit log", summary: "Approval state persists locally and writes decision trail.", agent: "Dev", tags: ["state", "audit"], due: "Done", priority: "medium" },
  { id: "task-3", room: "local-bridge", status: "assigned", title: "Draft Tauri command allowlist", summary: "Read docs, list files, inspect package metadata; no execution yet.", agent: "Bridge", tags: ["tauri", "read-only"], due: "Tomorrow", priority: "high" },
  { id: "task-4", room: "local-bridge", status: "in-progress", title: "Sketch Python worker protocol", summary: "JSON request/response, timeout, log envelope, no mutation rights.", agent: "Bridge", tags: ["python", "worker"], due: "Tomorrow", priority: "medium" },
  { id: "task-5", room: "project-os", status: "done", title: "Add Roadmap doc", summary: "Phases through rooms, Tauri, Python, and approval-gated execution.", agent: "Product Lead", tags: ["docs", "roadmap"], due: "Done", priority: "medium" },
  { id: "task-6", room: "project-os", status: "assigned", title: "Add branch notes form", summary: "Let operator record why a branch exists and what changed.", agent: "Release", tags: ["notes", "release"], due: "Next", priority: "low" },
  { id: "task-7", room: "agent-integrations", status: "in-progress", title: "Expand adapter capability cards", summary: "Core Assistant, Hermes, OpenHands, AutoGen with mode, boundary, readiness.", agent: "Bridge", tags: ["agents", "adapters"], due: "Today", priority: "high" },
  { id: "task-8", room: "agent-integrations", status: "review", title: "Define room assignment model", summary: "Agents can join rooms but cannot execute outside permissions.", agent: "Product Lead", tags: ["rooms", "permissions"], due: "Today", priority: "medium" },
  { id: "task-9", room: "release-readiness", status: "assigned", title: "Create validation checklist", summary: "Syntax, build, route smoke, CSS presence, local state persistence.", agent: "Release", tags: ["checks", "handoff"], due: "Next", priority: "medium" },
  { id: "task-10", room: "release-readiness", status: "done", title: "Record dependency-free baseline", summary: "The first public prototype runs without runtime dependencies.", agent: "Release", tags: ["risk", "notes"], due: "Done", priority: "low" }
];




