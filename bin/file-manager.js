import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runShell } from "../src/lib/loop.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(resolve(__dirname, "../package.json")));

const printHelp = () =>
  console.log(`
  ${pkg.name} ${pkg.version}
  Commands:
    greet [name]     Greet someone
    .exit             Quit the shell
  Flags:
    -h, --help       Show this help
    -v, --version    Show CLI version
  `);

process.chdir(process.env["HOME"]);

if (process.argv.length > 2) {
  const { router } = await import("../src/lib/router.js");
  await router({
    argv: process.argv.slice(2),
    printHelp,
    pkg,
  });
  process.exit();
}

await runShell({ pkg, printHelp });
