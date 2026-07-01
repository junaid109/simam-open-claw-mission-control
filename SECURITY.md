# Security Policy

OpenClaw Mission Control is local-first and intentionally conservative about execution.

## Supported Security Model

- Browser UI must not execute shell commands.
- Native execution, when added later, must go through Tauri allowlisted commands.
- Destructive, credential, production, dependency, billing, and external-account actions require explicit approval and audit logging.
- Python workers, when added later, should use bounded JSON request/response protocols with timeouts and logs.

## Reporting Issues

For now, please open a GitHub issue with:

- What happened.
- What you expected.
- Whether credentials, local files, or external services were involved.
- Steps to reproduce.

Do not paste secrets into issues.
