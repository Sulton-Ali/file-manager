import path from "node:path";

export default async function cd([dest]) {
  process.chdir(path.resolve(process.cwd(), dest));
}
