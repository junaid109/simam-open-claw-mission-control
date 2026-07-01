import assert from "node:assert/strict";
import test from "node:test";
import { explainApprovalRequirement, requiresApproval } from "../src/domain-js/approvalPolicy.mjs";

test("requires approval for sensitive action classes", () => {
  assert.equal(requiresApproval({ title: "Edit credential", summary: "", target: ".env", operation: "write secret" }), true);
  assert.equal(requiresApproval({ title: "Deploy", summary: "Production release", target: "prod", operation: "deploy" }), true);
  assert.equal(requiresApproval({ title: "Install dependency", summary: "", target: "package.json", operation: "npm install" }), true);
  assert.equal(requiresApproval({ title: "Delete files", summary: "", target: "archive", operation: "remove recursively" }), true);
});

test("allows safe local read-only operations", () => {
  const action = { title: "Show status", summary: "Read local project health", target: "local state", operation: "read" };
  assert.equal(requiresApproval(action), false);
  assert.match(explainApprovalRequirement(action), /safe local operation/);
});
