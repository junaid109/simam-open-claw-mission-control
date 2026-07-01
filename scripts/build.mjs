import { cp, mkdir, writeFile } from "node:fs/promises";

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const out = `build-output/${stamp}`;
await mkdir(`${out}/src/domain-js`, { recursive: true });
await cp("index.html", `${out}/index.html`);
await cp("src/styles.css", `${out}/src/styles.css`);
await cp("src/app.js", `${out}/src/app.js`);
await cp("src/data.js", `${out}/src/data.js`);
await cp("src/domain-js", `${out}/src/domain-js`, { recursive: true });
await writeFile("build-output/latest.txt", out, "utf8");
console.log(`Built static app into ${out}/`);
