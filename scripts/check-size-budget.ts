import { readdir, readFile, stat } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { gzipSync } from "node:zlib";

const root = process.cwd();

const clientAssetsDir = join(root, "dist/client/_build/assets");

const budgets = [
  {
    label: "total client JavaScript gzip",
    type: "gzip-total",
    directory: clientAssetsDir,
    extensions: new Set([".js"]),
    maxBytes: 40 * 1024
  },
  {
    label: "total client CSS gzip",
    type: "gzip-total",
    directory: clientAssetsDir,
    extensions: new Set([".css"]),
    maxBytes: 5 * 1024
  },
  {
    label: "hero AVIF",
    type: "file",
    file: join(root, "public/images/soulbait-waterfront-truck.avif"),
    maxBytes: 300 * 1024
  },
  {
    label: "hero WebP",
    type: "file",
    file: join(root, "public/images/soulbait-waterfront-truck.webp"),
    maxBytes: 500 * 1024
  },
  {
    label: "hero JPEG",
    type: "file",
    file: join(root, "public/images/soulbait-waterfront-truck.jpg"),
    maxBytes: 700 * 1024
  }
] as const;

async function listFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);

      return entry.isDirectory() ? listFiles(path) : [path];
    })
  );

  return files.flat();
}

function formatBytes(bytes: number) {
  return `${(bytes / 1024).toFixed(1)} KiB`;
}

async function readGzipSize(file: string) {
  const contents = await readFile(file);

  return gzipSync(contents).byteLength;
}

async function checkBudget() {
  const failures: string[] = [];

  for (const budget of budgets) {
    if (budget.type === "gzip-total") {
      const files = (await listFiles(budget.directory)).filter((file) =>
        budget.extensions.has(extname(file))
      );
      const total = (await Promise.all(files.map((file) => readGzipSize(file)))).reduce(
        (sum, size) => sum + size,
        0
      );

      console.log(`${budget.label}: ${formatBytes(total)} / ${formatBytes(budget.maxBytes)}`);

      if (total > budget.maxBytes) {
        failures.push(
          `${budget.label} is ${formatBytes(total)}, above ${formatBytes(budget.maxBytes)}`
        );
      }
    } else {
      const size = (await stat(budget.file)).size;
      const label = `${budget.label} (${relative(root, budget.file)})`;

      console.log(`${label}: ${formatBytes(size)} / ${formatBytes(budget.maxBytes)}`);

      if (size > budget.maxBytes) {
        failures.push(`${label} is ${formatBytes(size)}, above ${formatBytes(budget.maxBytes)}`);
      }
    }
  }

  if (failures.length > 0) {
    throw new Error(`Size budget failed:\n${failures.map((failure) => `- ${failure}`).join("\n")}`);
  }
}

checkBudget().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
