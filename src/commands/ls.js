import { readdir } from "node:fs/promises";

export default async function ls() {
  const list = await readdir(process.cwd(), {
    withFileTypes: true,
  });
  const dirs = list
    .filter((item) => item.isDirectory())
    .sort()
    .map((item) => ({
      Name: item.name,
      Type: "directory",
    }));
  const files = list
    .filter((item) => item.isFile())
    .sort()
    .map((item) => ({
      Name: item.name,
      Type: "file",
    }));
  //   const sortedList = list.sort()
  console.table(dirs.concat(files));
}
