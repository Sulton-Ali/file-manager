import { createReadStream } from "node:fs";
import { InputError } from "../lib/model.js";
import path from "node:path";

export default function cat(args) {
  const filepath = args[0];
  if (!filepath) {
    throw new InputError("File path not provided");
  }

  return new Promise((resolve) => {
    const readable = createReadStream(path.resolve(process.cwd(), filepath));

    readable.pipe(process.stdout);
    readable.on("end", () => {
      resolve();
    });
  });
}
