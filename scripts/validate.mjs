import { spawnSync } from "node:child_process";

const commands = [
  ["node", ["--check", "src/app.js"]],
  ["node", ["scripts/build.mjs"]]
];

for (const [command, args] of commands) {
  const result = spawnSync(command, args, { stdio: "inherit", shell: false });
  if (result.status !== 0) process.exit(result.status || 1);
}
