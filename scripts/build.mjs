import { mkdir, readFile, writeFile } from "node:fs/promises";

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const archiveOut = `build-output/${stamp}`;
const deployOut = "public-dist";

const files = [
  ["index.html", "index.html"],
  ["src/styles.css", "src/styles.css"],
  ["src/app.js", "src/app.js"],
  ["src/data.js", "src/data.js"],
  ["src/domain-js/approvalPolicy.mjs", "src/domain-js/approvalPolicy.mjs"],
  ["src/domain-js/commandRouter.mjs", "src/domain-js/commandRouter.mjs"],
  ["docs/assets/openclaw-mission-control.png", "docs/assets/openclaw-mission-control.png"]
];

async function copyFile(source, target) {
  const buffer = await readFile(source);
  await writeFile(target, buffer);
}

async function copyStaticApp(out) {
  await mkdir(`${out}/src/domain-js`, { recursive: true });
  await mkdir(`${out}/docs/assets`, { recursive: true });

  for (const [source, target] of files) {
    await copyFile(source, `${out}/${target}`);
  }
}

await copyStaticApp(deployOut);
await copyStaticApp(archiveOut);
await writeFile("build-output/latest.txt", archiveOut, "utf8");
console.log(`Built static app into ${deployOut}/ and archived ${archiveOut}/`);
