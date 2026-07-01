import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { requiresApproval, explainApprovalRequirement } from "../src/domain-js/approvalPolicy.mjs";
import { routeCommand } from "../src/domain-js/commandRouter.mjs";

const tests = [];
function test(name, fn) { tests.push([name, fn]); }

test("routes known product commands deterministically", () => {
  assert.equal(routeCommand("status").route, "known-safe");
  assert.equal(routeCommand("open approvals").handler, "approval-queue");
  assert.equal(routeCommand("run smoke tests").handler, "smoke-test-plan");
});

test("requires approval for destructive or dependency commands", () => {
  assert.equal(routeCommand("delete the old prototype folder").route, "approval-required");
  assert.equal(routeCommand("force push this branch").route, "approval-required");
  assert.equal(routeCommand("npm install provider-sdk").route, "approval-required");
});

test("blocks credential and production changes", () => {
  assert.equal(routeCommand("edit .env production API key").route, "blocked");
  assert.equal(routeCommand("change billing account").risk, "critical");
});

test("sends ambiguous requests to intake", () => {
  const decision = routeCommand("make the app better");
  assert.equal(decision.route, "intake-required");
  assert.equal(decision.handler, "intake");
});

test("approval policy requires approval for sensitive actions", () => {
  assert.equal(requiresApproval({ title: "Edit credential", summary: "", target: ".env", operation: "write secret" }), true);
  assert.equal(requiresApproval({ title: "Deploy", summary: "Production release", target: "prod", operation: "deploy" }), true);
  assert.equal(requiresApproval({ title: "Install dependency", summary: "", target: "package.json", operation: "npm install" }), true);
  assert.equal(requiresApproval({ title: "Delete files", summary: "", target: "archive", operation: "remove recursively" }), true);
});

test("approval policy allows safe local read-only operations", () => {
  const action = { title: "Show status", summary: "Read local project health", target: "local state", operation: "read" };
  assert.equal(requiresApproval(action), false);
  assert.match(explainApprovalRequirement(action), /safe local operation/);
});

test("index loads the application stylesheet", () => {
  const html = readFileSync("index.html", "utf8");
  assert.match(html, /<link rel="stylesheet" href="\/src\/styles\.css" \/>/);
});


test("app implements real local state and Project OS workspace", () => {
  const app = readFileSync("src/app.js", "utf8");
  assert.match(app, /localStorage/);
  assert.match(app, /Project OS/);
  assert.match(app, /data-approval/);
  assert.match(app, /auditLog/);
  assert.match(app, /commandHistory/);
});

test("data registers Project OS docs and gated agent platforms", () => {
  const data = readFileSync("src/data.js", "utf8");
  assert.match(data, /projectDocs/);
  assert.match(data, /agentPlatforms/);
  assert.match(data, /Hermes Agent/);
  assert.match(data, /OpenHands/);
  assert.match(data, /AutoGen/);
});
let passed = 0;
for (const [name, fn] of tests) {
  fn();
  passed += 1;
  console.log(`ok ${passed} - ${name}`);
}
console.log(`${passed}/${tests.length} tests passed`);

