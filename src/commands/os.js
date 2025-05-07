import os from "node:os";
import { StyledError } from "../lib/model.js";
import { styleText } from "node:util";

export default async function operationSystem(_, values) {
  if (!Object.keys(values).length) {
    throw new StyledError(
      "Invalid option or option not passed",
      "Invalid input"
    );
  }

  try {
    if (values?.EOL) {
      console.log(
        styleText(["grey"], "EOL: "),
        styleText(["green"], JSON.stringify(os.EOL))
      );
    }
    if (values?.cpus) {
      console.log(
        styleText(["grey"], "Count of CPU: "),
        styleText(["green"], String(os.cpus().length))
      );
      const table = os.cpus().map((item) => ({
        Model: item.model,
        Speed: `${(item.speed / 1024).toFixed(2)} GHz`,
      }));

      console.table(table);
    }

    if (values?.homedir) {
      console.log(
        styleText(["grey"], "Home directory: "),
        styleText(["green"], JSON.stringify(os.homedir()))
      );
    }
    if (values?.username) {
      console.log(
        styleText(["grey"], "Username: "),
        styleText(["green"], JSON.stringify(os.userInfo().username))
      );
    }
    if (values?.architecture) {
      console.log(
        styleText(["grey"], "Architecture: "),
        styleText(["green"], JSON.stringify(os.arch()))
      );
    }
  } catch (error) {
    throw new StyledError(error.message, "Operation failed");
  }
}
