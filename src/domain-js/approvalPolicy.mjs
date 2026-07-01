const approvalTriggers = [/credential/i, /secret/i, /\.env/i, /production/i, /delete/i, /remove/i, /reset/i, /force push/i, /install/i, /dependency/i, /external account/i, /billing/i, /deploy/i];
export function requiresApproval(action) {
  const searchable = `${action.title} ${action.summary} ${action.target} ${action.operation}`;
  return approvalTriggers.some((trigger) => trigger.test(searchable));
}
export function explainApprovalRequirement(action) {
  if (!requiresApproval(action)) return "No approval trigger matched. Record the action in the audit log as a safe local operation.";
  return "Human approval required because the action may affect credentials, production settings, dependencies, external accounts, or destructive project state.";
}
