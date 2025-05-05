import { StyledError } from "../lib/model.js";
import { validatePathAndResolve } from "../lib/validator.js";
import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";

export default async function hashing([filepath]) {
  const filename = await validatePathAndResolve(filepath);

  try {
    const readable = createReadStream(filename);
    const hash = createHash("sha256");

    await new Promise((resolve) => {
      readable.on("readable", () => {
        const data = readable.read();
        if (data) {
          hash.update(data);
        } else {
          console.log(`File hash: ${hash.digest("hex")}`);
          resolve();
        }
      });
    });
  } catch (error) {
    throw new StyledError(error.message, "Operation failed");
  }
}
