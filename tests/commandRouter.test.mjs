import assert from "node:assert/strict";
import test from "node:test";
import { routeCommand } from "../src/domain-js/commandRouter.mjs";

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
