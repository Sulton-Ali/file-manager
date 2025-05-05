import fs from "node:fs/promises";
import { StyledError } from "../lib/model.js";
import { validatePathAndResolve } from "../lib/validator.js";
import path from "node:path";

export default async function rn([filepath, newName]) {
  const filename = await validatePathAndResolve(filepath);
  if (!newName) {
    throw new StyledError("new_filename was not passed", "Invalid input");
  }
  const newPath = path.resolve(path.dirname(filename), newName);
  try {
    await fs.rename(filename, newPath);
  } catch (error) {
    throw new StyledError(error.message, "Operation failed");
  }
}
