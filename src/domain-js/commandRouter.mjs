const safeRoutes = [[/^(status|project status|show status)$/i, "project-status"], [/^(open )?approvals?$/i, "approval-queue"], [/^(run )?(smoke tests?|checks)$/i, "smoke-test-plan"], [/^(show )?(agents?|agent command)$/i, "agent-command-center"], [/^(show )?(risks?|known risks)$/i, "risk-register"]];
const blockedPatterns = [/production/i, /\.env/i, /credential/i, /secret/i, /api key/i, /billing/i];
const approvalPatterns = [/delete/i, /remove/i, /reset/i, /force push/i, /install/i, /npm i/i, /migration/i, /deploy/i];
export function routeCommand(input) {
  const command = input.trim();
  if (!command) return { route: "intake-required", risk: "none", handler: "intake", explanation: "No command was provided.", nextStep: "Ask the operator for a concrete objective." };
  const safeMatch = safeRoutes.find(([pattern]) => pattern.test(command));
  if (safeMatch) return { route: "known-safe", risk: "low", handler: safeMatch[1], explanation: "This matches a deterministic product command and can route without general chat.", nextStep: "Open the matching local product surface." };
  if (blockedPatterns.some((pattern) => pattern.test(command))) return { route: "blocked", risk: "critical", handler: "safety-policy", explanation: "This touches credentials, production settings, billing, or external account state.", nextStep: "Block in local demo mode and request human review." };
  if (approvalPatterns.some((pattern) => pattern.test(command))) return { route: "approval-required", risk: "high", handler: "approval-layer", explanation: "This may change dependencies, delete data, deploy, or mutate project state.", nextStep: "Create an approval request with rationale and affected targets." };
  return { route: "intake-required", risk: "medium", handler: "intake", explanation: "The command is not recognized as a deterministic core product command.", nextStep: "Clarify intent before routing or execution." };
}
