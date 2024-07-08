import fs from "fs";

export function readJson(path) {
  if (typeof path !== "string" || !path.endsWith(".json"))
    throw new Error(`invalid path ${path} for importing json file.`);
  return JSON.parse(fs.readFileSync(path), "utf8");
}
