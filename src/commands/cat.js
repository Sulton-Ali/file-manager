import { createReadStream } from "node:fs";
import { StyledError } from "../lib/model.js";
import { validatePathAndResolve } from "../lib/validator.js";

export default async function cat(args) {
  const filepath = args[0];

  const filename = await validatePathAndResolve(filepath);

  try {
    await new Promise((resolve) => {
      const readable = createReadStream(filename);
      readable.pipe(process.stdout);
      readable.on("end", () => {
        readable.close();
        resolve();
      });
    });
  } catch (err) {
    throw new StyledError(err.message, "Operation failed");
  }
}
