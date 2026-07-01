# Project Workflows

## Development Flow

1. Define product objective.
2. Map affected files and risks.
3. Write or update tests for critical behavior.
4. Implement the smallest coherent change.
5. Run checks.
6. Review diffs.
7. Update docs, release notes, and known risks.

## Agent-Assisted Flow

1. Give the agent a bounded prompt tied to a product goal.
2. Require the agent to state files in scope and tests to run.
3. Review proposed diffs carefully.
4. Reject overreach, fake APIs, unsafe actions, or brittle behavior.
5. Run checks locally.
6. Record accepted changes and remaining risk.

## Approval Flow

1. Action is proposed.
2. Policy classifies risk.
3. Safe actions can be recorded as routed.
4. Risky actions enter approval queue.
5. Human approves, denies, or requests revision.
6. Decision is written to the audit log.

## Release Flow

1. Confirm build and tests pass.
2. Review known risks.
3. Update release notes.
4. Record branch notes and implementation summary.
5. Create a reviewable pull request or release bundle.


