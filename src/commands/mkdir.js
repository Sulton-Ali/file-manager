import fs from "node:fs/promises";
import { StyledError } from "../lib/model.js";
import path from "node:path";

export default async function add([filepath]) {
  const filename = path.resolve(process.cwd(), filepath);

  try {
    await fs.mkdir(filename);
  } catch (error) {
    throw new StyledError(error.message, "Operation failed");
  }
}
