# Known Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Initial version uses local mock data. | It can demonstrate workflow but does not yet execute real local commands. | Keep domain models realistic and document integration path. |
| Browser app cannot safely run local commands directly. | Local execution is simulated in v1. | Add desktop IPC only after approval policy and audit logging are tested. |
| Agent output may be over-trusted by users. | Unsafe or low-quality work could be accepted. | Make human review state and approval gates visible in the UI. |
| Scope could expand into a broad platform too early. | Delivery slows and quality drops. | Build cockpit, approvals, routing, and workflow evidence first. |
