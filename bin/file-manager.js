import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runShell } from "../src/lib/loop.js";
import { styleText } from "node:util";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(resolve(__dirname, "../package.json")));
let username;

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
  const usernameIndex = process.argv.findIndex((arg) =>
    arg.startsWith("--username")
  );
  if (usernameIndex !== -1) {
    username = process.argv[usernameIndex].split("=")[1];
  }
}

console.log(
  styleText(
    ["blueBright"],
    `Welcome to the File Manager${username ? ", " + username : ""}!`
  )
);

await runShell({ pkg, printHelp, username });
