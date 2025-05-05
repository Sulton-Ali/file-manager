import path from "node:path";
import fs from "node:fs/promises";
import { StyledError } from "./model.js";

export const validatePathAndResolve = async (filepath) => {
  if (!filepath) {
    throw new StyledError("File path not provided", "Input Error");
  }

  const filename = path.resolve(process.cwd(), filepath);
  try {
    await fs.access(filename);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new StyledError("File not found", "Operation Error");
    } else {
      throw err;
    }
  }

  return filename;
};
