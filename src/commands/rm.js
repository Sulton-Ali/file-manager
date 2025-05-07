import fs from "node:fs/promises";
import { StyledError } from "../lib/model.js";
import { validatePathAndResolve } from "../lib/validator.js";

export default async function rm([filepath]) {
  const filename = await validatePathAndResolve(filepath);

  try {
    await fs.rm(filename);
  } catch (error) {
    throw new StyledError(error.message, "Operation failed");
  }
}
