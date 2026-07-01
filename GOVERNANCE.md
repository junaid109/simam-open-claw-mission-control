# Project Governance

## Prime Directive

Automation can accelerate engineering work, but it does not replace engineering accountability. Every proposed change must be reviewed, validated, and accepted by a maintainer before it is considered product work.

## Agent Roles

| Agent | Purpose | Allowed Work | Requires Approval |
| --- | --- | --- | --- |
| Product Mapper | Reads repo state, docs, and user goals to identify gaps and risks. | Architecture notes, product inventory, task proposals. | Any file edit outside docs. |
| Frontend Builder | Implements UI components, pages, state, and visual polish. | Local app code, tests, style files. | Dependency changes and large refactors. |
| Backend Bridge Builder | Designs local execution, IPC, workers, and provider boundaries. | Interfaces, adapters, local mocks, tests. | Running external commands, changing credentials. |
| QA Reviewer | Runs checks, inspects diffs, finds regressions, records risks. | Test reports, review notes, risk updates. | Changing implementation code. |
| Release Steward | Maintains release notes, branch notes, implementation logs. | Documentation and release metadata. | Publishing, tagging, deployment. |

## Approval Rules

Agents must request explicit human approval before:

- Editing credentials, environment files, production settings, deployment config, billing settings, or external account state.
- Running destructive commands such as recursive delete, reset, force push, database wipe, or cleanup scripts.
- Installing new dependencies or changing package manager lockfiles.
- Making broad architectural rewrites.
- Calling external services with private data.

## Review Checklist

Before accepting automation-assisted work:

1. Read the diff, not just the summary.
2. Confirm the change matches the product goal.
3. Check for hallucinated files, dead imports, fake APIs, and brittle mock behavior.
4. Run the relevant tests or record why they could not be run.
5. Update implementation notes, release notes, or risk docs when behavior changes.

## Prompting Standard

Implementation prompts should include:

- Product objective.
- Files or modules in scope.
- Safety constraints.
- Expected tests.
- Documentation updates.
- Clear stop conditions.

## Stop Conditions

An agent should stop and ask for guidance when:

- The requested change touches secrets or external systems.
- The repository state conflicts with the task.
- The plan requires a dependency not already approved.
- The agent finds a possible data loss path.
- Test failures are unrelated and cannot be explained.

