import { parseArgs, styleText } from "node:util";
import { Command } from "./constants.js";
import { logError } from "./logger.js";

export const router = async ({ argv, printHelp, pkg, username }) => {
  try {
    const { values, positionals } = parseArgs({
      args: argv,
      options: {
        help: { type: "boolean", short: "h" },
        version: { type: "boolean", short: "v" },
      },
      allowPositionals: true,
      strict: false,
    });

    if (values.version) {
      console.log(pkg.version);
      return;
    }
    if (values.help) {
      printHelp();
      return;
    }

    const [cmd, ...args] = positionals;

    switch (cmd) {
      case Command.LS:
        return (await import(`../commands/${Command.LS}.js`)).default(args);
      case Command.CD:
        return (await import(`../commands/${Command.CD}.js`)).default(args);
      case Command.UP:
        return (await import(`../commands/${Command.UP}.js`)).default(args);
      case Command.CAT:
        return (await import(`../commands/${Command.CAT}.js`)).default(args);
      case Command.ADD:
        return (await import(`../commands/${Command.ADD}.js`)).default(args);
      case Command.RM:
        return (await import(`../commands/${Command.RM}.js`)).default(args);
      case Command.MKDIR:
        return (await import(`../commands/${Command.MKDIR}.js`)).default(args);

      case Command.EXIT: {
        console.log(
          styleText(
            ["yellowBright"],
            `\nThank you for using File Manager, ${
              username ? username + ", " : ""
            }goodbye!`
          )
        );
        process.exit(0); // graceful shutdown
      }

      default:
        console.error(
          styleText(["red"], "[Invalid input]:"),
          styleText(["cyan"], "Command not found")
        );
        printHelp();
    }
  } catch (error) {
    logError(error);
  }
};
