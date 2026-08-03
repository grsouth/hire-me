import { readdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

const root = new URL("../public/projects/light-design/images/", import.meta.url);
const dirPath = root.pathname;
const manifestPath = join(dirPath, "manifest.json");
const allowed = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

const files = await readdir(dirPath);
const images = files
  .filter((file) => allowed.has(extname(file).toLowerCase()))
  .filter((file) => file.toLowerCase() !== "manifest.json")
  .sort((a, b) => a.localeCompare(b));

await writeFile(manifestPath, `${JSON.stringify(images, null, 2)}\n`);
console.log(`Wrote ${images.length} entries to ${manifestPath}`);
