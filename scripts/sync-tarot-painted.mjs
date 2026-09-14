import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "public/images/tarot");
const slugs = readdirSync(dir)
  .filter((name) => name.endsWith(".webp"))
  .map((name) => name.replace(/\.webp$/, ""))
  .sort();

const body = `export const TAROT_PAINTED_SLUGS = new Set(${JSON.stringify(slugs, null, 2)});\n`;
writeFileSync(join(process.cwd(), "src/data/tarot/paintedImages.ts"), body);
console.log(`painted ${slugs.length}`, slugs.join(", "));
