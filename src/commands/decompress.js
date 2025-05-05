import { StyledError } from "../lib/model.js";
import { validatePathAndResolve } from "../lib/validator.js";
import path from "node:path";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createBrotliDecompress } from "node:zlib";

export default async function compress([filepath, newFile]) {
  const filename = await validatePathAndResolve(filepath);
  if (!newFile) {
    throw new StyledError("path_to_destination not passed");
  }
  const newFileName = path.resolve(process.cwd(), newFile);

  try {
    const readable = createReadStream(filename);
    const writeable = createWriteStream(newFileName);
    const brothliDecompress = createBrotliDecompress();
    await pipeline(readable, brothliDecompress, writeable);
  } catch (error) {
    throw new StyledError(error.message, "Operation failed");
  }
}
