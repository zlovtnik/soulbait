import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const browserCacheDir = join(process.cwd(), ".cache/browser");

function findInDirectory(
  directory: string,
  matcher: (path: string) => boolean
): string | undefined {
  if (!existsSync(directory)) {
    return undefined;
  }

  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    const stats = statSync(path);

    if (stats.isDirectory()) {
      const match = findInDirectory(path, matcher);

      if (match) {
        return match;
      }
    } else if (matcher(path)) {
      return path;
    }
  }

  return undefined;
}

function findChrome() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }

  const home = process.env.HOME;
  const commonPaths = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    ...(home
      ? [
          join(home, "Applications/Google Chrome.app/Contents/MacOS/Google Chrome"),
          join(home, "Applications/Chromium.app/Contents/MacOS/Chromium")
        ]
      : [])
  ];

  const systemChrome = commonPaths.find((path) => existsSync(path));

  if (systemChrome) {
    return systemChrome;
  }

  return findInDirectory(
    browserCacheDir,
    (path) =>
      path.endsWith("Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing") ||
      path.endsWith("/chrome") ||
      path.endsWith("\\chrome.exe")
  );
}

function installChrome() {
  console.log("Chrome not found. Installing Chrome for Testing into .cache/browser...");
  const result = spawnSync(
    "bun",
    ["browsers", "install", "chrome@stable", "--path", ".cache/browser"],
    {
      stdio: "inherit"
    }
  );

  if (result.status !== 0) {
    throw new Error("Unable to install Chrome for Testing for Lighthouse CI.");
  }
}

function runLighthouse(chromePath: string) {
  const result = spawnSync("bun", ["lhci", "autorun"], {
    env: {
      ...process.env,
      CHROME_PATH: chromePath
    },
    stdio: "inherit"
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

let chromePath = findChrome();

if (!chromePath) {
  installChrome();
  chromePath = findChrome();
}

if (!chromePath) {
  throw new Error("Chrome installation completed, but no executable could be found.");
}

runLighthouse(chromePath);
