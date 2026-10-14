import { spawn } from "child_process";
import path from "path";
import fs from "fs";

const PROLOG_FILE = path.join(process.cwd(), "pakar_jaringan.pl");

const KNOWN_PATHS = [
  "D:\\swipl\\bin\\swipl.exe",
  "C:\\Program Files\\swipl\\bin\\swipl.exe",
  "C:\\Program Files (x86)\\swipl\\bin\\swipl.exe",
  "/opt/homebrew/bin/swipl",
  "/usr/local/bin/swipl",
  "/usr/bin/swipl",
];

let cachedSwiplPath: string | null = null;

/**
 * Resolve swipl binary path safely without triggering unhandled spawn ENOENT errors in console
 */
export function getSwiplExecutable(): string {
  if (cachedSwiplPath) {
    return cachedSwiplPath;
  }

  // 1. Check custom environment variable (from .env.local)
  if (process.env.SWIPL_PATH) {
    const cleaned = process.env.SWIPL_PATH.replace(/^["']|["']$/g, "").trim();
    if (cleaned && fs.existsSync(/*turbopackIgnore: true*/ cleaned)) {
      cachedSwiplPath = cleaned;
      return cachedSwiplPath;
    }
  }

  // 2. Check standard Windows, macOS, and Linux installation directories
  for (const p of KNOWN_PATHS) {
    if (fs.existsSync(/*turbopackIgnore: true*/ p)) {
      cachedSwiplPath = p;
      return cachedSwiplPath;
    }
  }

  // 3. Fallback to system PATH command
  cachedSwiplPath = "swipl";
  return cachedSwiplPath;
}

/**
 * Execute a Prolog query against pakar_jaringan.pl via subprocess
 */
export function executeProlog(query: string, timeoutMs = 10000): Promise<string> {
  return new Promise((resolve, reject) => {
    const swiplBin = getSwiplExecutable();
    const prologFile = PROLOG_FILE.replace(/\\/g, "/");

    const args = [
      "-g",
      `consult('${prologFile}'), ${query}, halt.`,
      "--quiet",
    ];

    const proc = spawn(/*turbopackIgnore: true*/ swiplBin, args, {
      stdio: ["pipe", "pipe", "pipe"],
      shell: false,
    });

    let stdout = "";
    let stderr = "";

    proc.stdout.on("data", (data: Buffer) => {
      stdout += data.toString();
    });

    proc.stderr.on("data", (data: Buffer) => {
      stderr += data.toString();
    });

    const timer = setTimeout(() => {
      try {
        proc.kill();
      } catch {}
      reject(new Error(`Timeout: SWI-Prolog tidak merespons dalam ${timeoutMs / 1000} detik.`));
    }, timeoutMs);

    proc.on("close", (code: number) => {
      clearTimeout(timer);
      if (code === 0 || stdout.trim()) {
        resolve(stdout.trim());
      } else {
        reject(new Error(stderr.trim() || `SWI-Prolog keluar dengan kode ${code}`));
      }
    });

    proc.on("error", (err: Error) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}
