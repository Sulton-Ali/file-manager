import { createReadStream } from "node:fs";
import { StyledError } from "../lib/model.js";
import path from "node:path";
import fs from "node:fs/promises";

export default async function cat(args) {
  const filepath = args[0];
  if (!filepath) {
    throw new StyledError("File path not provided", "Input Error");
  }

  try {
    const filename = path.resolve(process.cwd(), filepath);
    await fs.access(filename);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new StyledError("File not found", "Operation Error");
    } else {
      throw err;
    }
  }
}
