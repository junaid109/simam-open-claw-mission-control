import { routeCommand } from "./domain-js/commandRouter.mjs";
import { agentPlatforms, agents, approvals, projectDocs, projectHealth, projectRooms, risks, roomTasks, tests, workflowPhases } from "./data.js";

const root = document.getElementById("root");
const storageKey = "openclaw.mission-control.state.v4";
const columns = [
  ["inbox", "Inbox"],
  ["assigned", "Assigned"],
  ["in-progress", "In Progress"],
  ["review", "Review"],
  ["done", "Done"]
];
const toneFor = {
  approved: "safe",
  denied: "danger",
  "revision-requested": "warning",
  pending: "warning",
  complete: "safe",
  "in-progress": "info",
  blocked: "danger",
  available: "safe",
  planned: "info",
  gated: "warning",
  active: "safe",
  review: "warning",
  idle: "muted",
  done: "safe",
  inbox: "muted",
  assigned: "info"
};

const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (match) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[match]));
const pill = (label, tone = "muted") => `<span class="status-pill status-pill--${tone}">${esc(label)}</span>`;

const defaults = {
  selectedRoom: projectRooms[0].id,
  selectedAgent: "all",
  approvals: approvals.map((item, index) => ({ id: `approval-${index + 1}`, title: item[0], summary: item[1], requester: item[2], risk: item[3], target: item[4], operation: item[5], decision: "pending" })),
  workflow: workflowPhases.map((item, index) => ({ id: `phase-${index + 1}`, name: item[0], status: item[1], owner: item[2], progress: item[3], objective: item[4], blocker: item[5], evidence: item[6] })),
  tasks: roomTasks,
  commandHistory: [{ command: "run smoke tests", route: "known-safe", handler: "smoke-test-plan", at: "seed" }],
  auditLog: [{ at: "seed", actor: "System", event: "Initialized local-first project state", detail: "Seed state loaded into browser storage." }],
  activeDoc: projectDocs[0].path,
  docContent: "Select a Project OS document to load its current workspace copy."
};

let state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (!saved) return structuredClone(defaults);
    return { ...structuredClone(defaults), ...saved, tasks: saved.tasks || defaults.tasks };
  } catch {
    return structuredClone(defaults);
  }
}

function saveState(event, detail, actor = "Operator") {
  if (event) state.auditLog = [{ at: new Date().toLocaleString(), actor, event, detail }, ...state.auditLog].slice(0, 40);
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function resetState() {
  state = structuredClone(defaults);
  saveState("Reset local state", "Restored seeded Mission Control board.");
  renderShell();
}

function currentRoom() {
  return projectRooms.find((room) => room.id === state.selectedRoom) || projectRooms[0];
}

function filteredTasks() {
  return state.tasks.filter((task) => task.room === state.selectedRoom && (state.selectedAgent === "all" || task.agent === state.selectedAgent));
}

function taskCounts(tasks) {
  return columns.reduce((acc, [status]) => ({ ...acc, [status]: tasks.filter((task) => task.status === status).length }), {});
}

function renderShell() {
  const pending = state.approvals.filter((approval) => approval.decision === "pending").length;
  const doneToday = state.tasks.filter((task) => task.status === "done").length;
  const queue = state.tasks.filter((task) => task.status !== "done").length;
  const activeAgents = agents.filter((agent) => agent.status === "active").length;

  root.innerHTML = `<div class="ops-shell">
    <header class="ops-topbar">
      <div class="ops-brand"><div class="ops-logo">OC</div><div><strong>OPENCLAW</strong><span>Mission Control / local demo</span></div></div>
      <div class="ops-metrics"><span><strong>${activeAgents}</strong> agents active</span><span><strong>${queue}</strong> tasks in queue</span><span><strong>${doneToday}</strong> done today</span></div>
      <div class="ops-actions"><button class="icon-button active" title="Agent board">Grid</button><button class="icon-button" id="reset-state" title="Reset state">Reset</button><span class="time-chip">${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>${pill(projectHealth.overallStatus, "safe")}</div>
    </header>
    <section class="command-ribbon">
      <div><span class="eyebrow">Operational posture</span><strong>${esc(projectHealth.posture)}</strong><small>${esc(projectHealth.branch)} / ${esc(projectHealth.environment)}</small></div>
      <div><span class="eyebrow">Release confidence</span><strong>${projectHealth.testsPassing}/${projectHealth.totalTests}</strong><small>Validation checks passing</small></div>
      <div><span class="eyebrow">Project progress</span><strong>${projectHealth.completedTasks}/${projectHealth.totalTasks}</strong><small>Planned scope complete</small></div>
      <div><span class="eyebrow">Next review</span><strong>${esc(projectHealth.estimatedCompletion)}</strong><small>${pending} approval gates pending</small></div>
    </section>
    <main class="ops-board ops-board--pro">
      ${renderAgentRail(pending)}
      ${renderRoomBoard()}
      ${renderOpsSide()}
    </main>
    <section class="ops-lower-grid">
      ${renderConsole()}
      ${renderWorkflow()}
      ${renderProjectOS()}
      ${renderAdapterMatrix()}
      ${renderQuality()}
    </section>
  </div>`;

  attachHandlers();
  renderDecision(document.getElementById("command-input")?.value || "run smoke tests", false);
}

function renderAgentRail(pending) {
  return `<aside class="agent-rail">
    <div class="rail-header"><span>Squad</span>${pill(`${pending} approvals`, pending ? "warning" : "safe")}</div>
    <button class="all-agents ${state.selectedAgent === "all" ? "active" : ""}" data-agent-filter="all" type="button"><span>All operators</span><strong>${agents.reduce((sum, agent) => sum + agent.tasks, 0)}</strong></button>
    <div class="agent-cards">${agents.map((agent) => `<button class="agent-card ${state.selectedAgent === agent.name ? "active" : ""}" data-agent-filter="${esc(agent.name)}" type="button"><span class="agent-avatar-xl agent-${agent.tone}">${agent.icon}</span><span><strong>${esc(agent.name)}</strong><small>${esc(agent.role)}</small><em>${esc(agent.platform)} / ${esc(agent.capability)}</em></span><b>${agent.tasks}</b><i class="agent-dot ${agent.status}"></i></button>`).join("")}</div>
    <div class="adapter-mini"><strong>Adapter readiness</strong>${agentPlatforms.map((platform) => `<button data-platform="${platform.id}" type="button"><span>${esc(platform.name)}</span>${pill(platform.status, toneFor[platform.status] || "muted")}</button>`).join("")}</div>
  </aside>`;
}

function renderRoomBoard() {
  const room = currentRoom();
  const tasks = filteredTasks();
  const counts = taskCounts(tasks);
  const completion = tasks.length ? Math.round((counts.done / tasks.length) * 100) : 0;
  const activeWork = counts.assigned + counts["in-progress"] + counts.review;

  return `<section class="room-stage">
    <div class="stage-toolbar"><div><span class="eyebrow">Workspace</span><strong>Project rooms</strong></div><div class="board-actions"><button class="button button--primary" id="new-task" type="button">New Task</button><button class="button button--primary" data-command="manage agents" type="button">Manage Agents</button></div></div>
    <div class="room-tabs">${projectRooms.map((item) => `<button class="room-tab ${item.id === room.id ? "active" : ""}" data-room="${item.id}" type="button"><strong>${esc(item.name)}</strong><span>${esc(item.owner)}</span></button>`).join("")}</div>
    <section class="room-brief">
      <div class="room-heading"><div><p class="section-label">${esc(room.owner)} room</p><h1>${esc(room.name)}</h1><span>${esc(room.goal)}</span></div>${pill(`${tasks.length} visible tasks`, "info")}</div>
      <div class="brief-grid"><div><span>Completion</span><strong>${completion}%</strong></div><div><span>Active work</span><strong>${activeWork}</strong></div><div><span>Review</span><strong>${counts.review}</strong></div><div><span>Blocked</span><strong>${state.approvals.filter((approval) => approval.risk === "blocked").length}</strong></div></div>
      <div class="brief-progress"><span style="width:${completion}%"></span></div>
    </section>
    <div class="kanban-board">${columns.map(([status, label]) => renderColumn(status, label, tasks)).join("")}</div>
  </section>`;
}

function renderColumn(status, label, tasks) {
  const items = tasks.filter((task) => task.status === status);
  return `<section class="task-column column-${status}"><div class="column-title"><strong>${label}</strong><span>${items.length}</span></div><div class="task-stack">${items.map(renderTaskCard).join("") || `<div class="empty-column">No tasks</div>`}</div></section>`;
}

function renderTaskCard(task) {
  const tone = task.priority === "high" ? "danger" : task.priority === "medium" ? "warning" : "muted";
  return `<article class="task-card task-${task.priority}"><div class="task-card__stripe"></div><div class="task-card__body"><div class="row-title"><strong>${esc(task.title)}</strong>${pill(task.priority, tone)}</div><p>${esc(task.summary)}</p><div class="tag-row">${task.tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div><div class="task-meta"><span>${esc(task.agent)}</span><span>${esc(task.due)}</span></div><div class="button-row compact"><button data-task="${task.id}" data-move="in-progress" type="button">Start</button><button data-task="${task.id}" data-move="review" type="button">Review</button><button data-task="${task.id}" data-move="done" type="button">Done</button></div></div></article>`;
}

function renderOpsSide() {
  return `<aside class="ops-side-stack">${renderApprovalDesk()}${renderLiveFeed()}</aside>`;
}

function renderApprovalDesk() {
  const pending = state.approvals.filter((approval) => approval.decision === "pending");
  return `<section class="approval-desk"><div class="panel__header"><div><p class="section-label">Approval desk</p><h2>Human gates</h2></div>${pill(`${pending.length} pending`, pending.length ? "warning" : "safe")}</div><div class="approval-mini-list">${pending.slice(0, 3).map((approval) => `<article><div class="row-title"><strong>${esc(approval.title)}</strong>${pill(approval.risk, approval.risk === "high" || approval.risk === "blocked" ? "danger" : "warning")}</div><p>${esc(approval.summary)}</p><small>${esc(approval.target)} / ${esc(approval.requester)}</small><div class="approval-actions"><button data-approval="${approval.id}" data-decision="approved" type="button">Approve</button><button data-approval="${approval.id}" data-decision="revision-requested" type="button">Revise</button><button data-approval="${approval.id}" data-decision="denied" type="button">Deny</button></div></article>`).join("") || `<article><strong>No approvals waiting</strong><p>All gated actions have a decision.</p></article>`}</div></section>`;
}

function renderLiveFeed() {
  return `<section class="live-feed"><div class="panel__header"><div><p class="section-label">Activity</p><h2>Audit stream</h2></div><button class="icon-button" type="button">Min</button></div><div class="feed-tabs"><button class="active">All</button><button>Tasks</button><button>Approvals</button><button>Status</button></div><div class="feed-list">${state.auditLog.slice(0, 7).map((entry) => `<article class="feed-item"><span class="feed-icon">Log</span><div><strong>${esc(entry.event)}</strong><p>${esc(entry.detail)}</p><small>${esc(entry.actor)} / ${esc(entry.at)}</small></div></article>`).join("")}</div></section>`;
}

function renderConsole() {
  return `<section class="panel panel--console" id="console"><div class="panel__header"><div><p class="section-label">Local Console</p><h2>Deterministic command routing</h2></div><span id="route-pill"></span></div><form class="console-form" id="console-form"><label class="sr-only" for="command-input">Command</label><span>CMD</span><input id="command-input" value="run smoke tests"><button class="button button--primary" type="submit">Route</button></form><div class="console-output" id="console-output"></div><div class="example-row">${["status", "open approvals", "run smoke tests", "create hermes adapter plan", "delete prototype archive", "edit .env production API key"].map((example) => `<button type="button" data-command="${esc(example)}">${esc(example)}</button>`).join("")}</div><div class="history-list"><div class="mini-header"><strong>Command history</strong></div>${state.commandHistory.slice(0, 5).map((entry) => `<article class="history-row"><strong>${esc(entry.command)}</strong><span>${esc(entry.route)} / ${esc(entry.handler)} / ${esc(entry.at)}</span></article>`).join("")}</div></section>`;
}

function renderWorkflow() {
  return `<section class="panel workflow-panel"><div class="panel__header"><div><p class="section-label">Execution plan</p><h2>Build phases</h2></div>${pill(projectHealth.activePhase, "info")}</div><div class="phase-list">${state.workflow.map((phase) => `<article class="phase-row phase-${phase.status}"><div><strong>${esc(phase.name)}</strong><span>${esc(phase.owner)} / ${esc(phase.status)}</span></div><p>${esc(phase.objective)}</p><div class="phase-track"><span style="width:${phase.progress}%"></span></div><small>${esc(phase.evidence)}</small></article>`).join("")}</div></section>`;
}

function renderAdapterMatrix() {
  return `<section class="panel adapter-panel"><div class="panel__header"><div><p class="section-label">Agent platforms</p><h2>Adapter readiness</h2></div>${pill("supervised", "safe")}</div><div class="adapter-grid">${agentPlatforms.map((platform) => `<article><div class="row-title"><strong>${esc(platform.name)}</strong>${pill(platform.status, toneFor[platform.status] || "muted")}</div><p>${esc(platform.role)}</p><small>${esc(platform.boundary)}</small><div class="tag-row">${platform.capabilities.map((item) => `<span>${esc(item)}</span>`).join("")}</div></article>`).join("")}</div></section>`;
}
function renderProjectOS() {
  return `<section class="panel panel--wide" id="project-os"><div class="panel__header"><div><p class="section-label">Project OS</p><h2>Workspace doctrine and logs</h2></div>${pill("live docs", "info")}</div><div class="project-os-layout"><div class="doc-list">${projectDocs.map((doc) => `<button class="doc-button ${state.activeDoc === doc.path ? "active" : ""}" data-doc="${esc(doc.path)}" type="button"><strong>${esc(doc.title)}</strong><span>${esc(doc.purpose)}</span></button>`).join("")}</div><article class="doc-viewer"><div class="row-title"><strong>${esc(state.activeDoc)}</strong><button class="button button--neutral" id="reload-doc" type="button">Reload doc</button></div><pre>${esc(state.docContent)}</pre></article></div></section>`;
}

function renderQuality() {
  return `<section class="panel panel--wide" id="quality"><div class="panel__header"><div><p class="section-label">Quality</p><h2>Release readiness</h2></div>${pill("validation checks", "safe")}</div><div class="quality-layout"><div class="test-grid">${tests.map(([name, status, value, detail]) => `<article class="test-card"><span>OK</span><div><strong>${esc(name)}</strong><span>${esc(detail)}</span></div>${pill(value, status === "passing" ? "safe" : "warning")}</article>`).join("")}</div><div class="risk-panel"><div class="mini-header"><strong>Known risks</strong></div>${risks.map(([title, impact, severity, mitigation]) => `<article class="risk-row"><div class="row-title"><strong>${esc(title)}</strong>${pill(severity, severity === "high" ? "danger" : "warning")}</div><p>${esc(impact)}</p><span>${esc(mitigation)}</span></article>`).join("")}</div></div></section>`;
}

function renderDecision(command, persist = true) {
  const decision = routeCommand(command);
  const tone = { "known-safe": "safe", "approval-required": "warning", "intake-required": "info", blocked: "danger" }[decision.route];
  document.getElementById("route-pill").innerHTML = pill(decision.route, tone);
  document.getElementById("console-output").innerHTML = `<div class="console-line"><span>handler</span><strong>${esc(decision.handler)}</strong></div><div class="console-line"><span>risk</span><strong>${esc(decision.risk)}</strong></div><p>${esc(decision.explanation)}</p><p class="console-next">${esc(decision.nextStep)}</p>`;
  if (persist) {
    state.commandHistory = [{ command, route: decision.route, handler: decision.handler, at: new Date().toLocaleTimeString() }, ...state.commandHistory].slice(0, 30);
    saveState("Routed command", `${command} -> ${decision.route}/${decision.handler}`);
    renderShell();
  }
}

async function loadDoc(path) {
  state.activeDoc = path;
  try {
    const response = await fetch(path, { cache: "no-store" });
    state.docContent = response.ok ? await response.text() : `Unable to load ${path}: ${response.status}`;
  } catch (error) {
    state.docContent = `Unable to load ${path}: ${error.message}`;
  }
  saveState("Loaded Project OS document", path);
  renderShell();
}

function attachHandlers() {
  document.getElementById("reset-state")?.addEventListener("click", resetState);
  document.getElementById("new-task")?.addEventListener("click", () => {
    const room = currentRoom();
    const id = `task-${Date.now()}`;
    state.tasks = [{ id, room: room.id, status: "inbox", title: "New mission item", summary: "Operator-created task ready for assignment.", agent: "Product Lead", tags: ["new", "intake"], due: "Next", priority: "medium" }, ...state.tasks];
    saveState("New task created", `${room.name}: New mission item`);
    renderShell();
  });
  document.querySelectorAll("[data-room]").forEach((button) => button.addEventListener("click", () => { state.selectedRoom = button.dataset.room; saveState("Room selected", currentRoom().name); renderShell(); }));
  document.querySelectorAll("[data-agent-filter]").forEach((button) => button.addEventListener("click", () => { state.selectedAgent = button.dataset.agentFilter; saveState("Agent filter changed", state.selectedAgent); renderShell(); }));
  document.getElementById("console-form")?.addEventListener("submit", (event) => { event.preventDefault(); renderDecision(document.getElementById("command-input").value); });
  document.querySelectorAll("[data-command]").forEach((button) => button.addEventListener("click", () => renderDecision(button.dataset.command)));
  document.querySelectorAll("[data-task]").forEach((button) => button.addEventListener("click", () => { const task = state.tasks.find((item) => item.id === button.dataset.task); task.status = button.dataset.move; saveState("Task moved", `${task.title}: ${task.status}`); renderShell(); }));
  document.querySelectorAll("[data-approval]").forEach((button) => button.addEventListener("click", () => { const approval = state.approvals.find((item) => item.id === button.dataset.approval); approval.decision = button.dataset.decision; saveState("Approval decision recorded", `${approval.title}: ${approval.decision}`, "Safety"); renderShell(); }));
  document.querySelectorAll("[data-doc]").forEach((button) => button.addEventListener("click", () => loadDoc(button.dataset.doc)));
  document.getElementById("reload-doc")?.addEventListener("click", () => loadDoc(state.activeDoc));
  document.querySelectorAll("[data-platform]").forEach((button) => button.addEventListener("click", () => { const platform = agentPlatforms.find((item) => item.id === button.dataset.platform); saveState("Agent platform inspected", `${platform.name}: ${platform.boundary}`); renderShell(); }));
}

renderShell();
if (state.docContent === defaults.docContent) loadDoc(state.activeDoc);
