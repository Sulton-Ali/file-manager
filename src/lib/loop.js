import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { router } from "./router.js";

export async function runShell({ pkg, printHelp }) {
  const makePrompt = () => `${process.cwd()} $ `;
  const rl = createInterface({ input, output, prompt: makePrompt() });

  const refresh = () => rl.setPrompt(makePrompt());
  rl.prompt();

  let interrupted = false;
  rl.on("SIGINT", () => {
    if (interrupted) {
      rl.close();
    } else {
      console.log("\n(press Ctrl+C again to quit)");
      interrupted = true;
      rl.prompt();
      setTimeout(() => (interrupted = false), 1000);
    }
  });

  for await (const line of rl) {
    const tokens =
      line
        .match(/(?:[^\s"]+|"[^"]*")+/g)
        ?.map((s) => s.replace(/^"|"$/g, "")) ?? [];

    await router({ argv: tokens, printHelp, pkg });
    refresh();
    rl.prompt();
  }
}
