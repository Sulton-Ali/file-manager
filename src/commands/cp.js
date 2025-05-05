import { StyledError } from "../lib/model.js";
import { validatePathAndResolve } from "../lib/validator.js";
import path from "node:path";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";

export default async function cp([filepath, newDirectory]) {
  const filename = await validatePathAndResolve(filepath);
  if (!newDirectory) {
    throw new StyledError("path_to_new_directory not passed");
  }
  const newFileName = path.resolve(
    process.cwd(),
    newDirectory,
    path.basename(filename)
  );

  try {
    const readable = createReadStream(filename);
    const writeable = createWriteStream(newFileName);
    await pipeline(readable, writeable);
  } catch (error) {
    throw new StyledError(error.message, "Operation failed");
  }
}
