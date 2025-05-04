import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { router } from "./router.js";
import { styleText } from "node:util";

export async function runShell({ pkg, printHelp, username }) {
  const makePrompt = () =>
    "You are currently in " +
    styleText(["underline"], ` ${process.cwd()} `) +
    "\n$ ";
  const rl = createInterface({ input, output, prompt: makePrompt() });

  const refresh = () => rl.setPrompt(makePrompt());
  rl.prompt();

  let interrupted = false;
  rl.on("SIGINT", () => {
    console.log(
      styleText(
        ["yellowBright"],
        `\nThank you for using File Manager, ${
          username ? username + ", " : ""
        }goodbye!`
      )
    );
    rl.close();
  });

  for await (const line of rl) {
    const tokens =
      line
        .match(/(?:[^\s"]+|"[^"]*")+/g)
        ?.map((s) => s.replace(/^"|"$/g, "")) ?? [];

    await router({ argv: tokens, printHelp, pkg, username });
    refresh();
    rl.prompt();
  }
}
