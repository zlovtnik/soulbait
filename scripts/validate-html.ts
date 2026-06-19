import { spawnSync } from "node:child_process";
import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const publicDir = join(root, ".output/public");

async function listHtmlFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);

      return entry.isDirectory() ? listHtmlFiles(path) : [path];
    })
  );

  return files.flat().filter((file) => extname(file) === ".html");
}

async function validateHtml() {
  const files = await listHtmlFiles(publicDir);

  if (files.length === 0) {
    throw new Error("No generated HTML files found. Run `bun run build` first.");
  }

  let failed = false;

  for (const file of files) {
    const markup = await readFile(file, "utf8");
    const result = spawnSync(
      "bun",
      [
        "html-validate",
        "--config",
        ".htmlvalidate.json",
        "--stdin",
        "--stdin-filename",
        relative(root, file)
      ],
      {
        encoding: "utf8",
        input: markup
      }
    );

    if (result.stdout) {
      process.stdout.write(result.stdout);
    }

    if (result.stderr) {
      process.stderr.write(result.stderr);
    }

    if (result.status !== 0) {
      failed = true;
    }
  }

  if (failed) {
    throw new Error("Generated HTML validation failed.");
  }

  console.log(`Validated ${files.length} generated HTML files.`);
}

validateHtml().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
