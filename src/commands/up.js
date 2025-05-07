import path from "node:path";

export default function up() {
  process.chdir(path.resolve(process.cwd(), ".."));
}
