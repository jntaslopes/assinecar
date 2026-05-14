import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const workspaceRoot = process.cwd();
const requested = parseArgs(process.argv.slice(2));
const requestedPort = requested.port ?? 3000;
const requestedHostname = requested.hostname ?? "127.0.0.1";
const passthroughArgs = requested.rest;
const gitBranch = readGitValue(["rev-parse", "--abbrev-ref", "HEAD"], "unknown");
const gitCommit = readGitValue(["rev-parse", "--short", "HEAD"], "unknown");

if (isMainModule()) {
  main().catch((error) => {
    console.error(`[codex-dev] ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  });
}

async function main() {
  for (let port = requestedPort; port < requestedPort + 25; port += 1) {
    const owner = await inspectPort(port);

    if (!owner) {
      const result = await startDevServer(port, requestedHostname);

      if (result === "port-occupied") {
        console.log(`[codex-dev] Port ${port} became occupied while starting. Trying next port.`);
        continue;
      }

      return;
    }

    const runtime = await readRuntimeIdentity(getRuntimeProbeHostname(requestedHostname), port);
    if (runtime && matchesCurrentRuntime(runtime, port)) {
      logReusedServer(
        port,
        owner,
        `validated by runtime identity (${runtime.gitBranch}@${runtime.gitCommit})`,
      );
      return;
    }

    if (ownerContainsWorkspace(owner)) {
      logReusedServer(port, owner, "matched by process ownership for this worktree");
      return;
    }

    const ownerLabel = formatOwnerLabel(owner);
    console.log(`[codex-dev] Port ${port} is occupied by another worktree. Skipping. (${ownerLabel})`);
  }

  throw new Error(`No free or reusable port found between ${requestedPort} and ${requestedPort + 24}.`);
}

function logReusedServer(port, owner, reason) {
  const url = `http://127.0.0.1:${port}`;
  const pidLabel = Number.isFinite(owner?.pid) ? ` PID ${owner.pid}.` : "";

  console.log(`[codex-dev] Reusing dev server at ${url}; automatic reuse ${reason}.${pidLabel}`);

  if (Number.isFinite(owner?.pid)) {
    console.log(
      `[codex-dev] If you want to restart it, stop the current process first: Stop-Process -Id ${owner.pid}`,
    );
  } else {
    console.log("[codex-dev] If you want to restart it, stop the current process first.");
  }
}

async function startDevServer(port, hostname) {
  const startedAt = new Date().toISOString();
  const outLogPath = path.join(workspaceRoot, `.codex-dev-${port}.out.log`);
  const errLogPath = path.join(workspaceRoot, `.codex-dev-${port}.err.log`);
  const outLog = fs.createWriteStream(outLogPath, { flags: "a" });
  const errLog = fs.createWriteStream(errLogPath, { flags: "a" });
  const nextBin = path.join(workspaceRoot, "node_modules", "next", "dist", "bin", "next");
  let stderrText = "";
  const child = spawn(
    process.execPath,
    [
      nextBin,
      "dev",
      "--webpack",
      "--port",
      String(port),
      "--hostname",
      hostname,
      ...passthroughArgs,
    ],
    {
      cwd: workspaceRoot,
      env: {
        ...process.env,
        PORT: String(port),
        CODEX_DEV_RUNTIME: "1",
        CODEX_WORKSPACE_ROOT: workspaceRoot,
        CODEX_GIT_BRANCH: gitBranch,
        CODEX_GIT_COMMIT: gitCommit,
        CODEX_DEV_PORT: String(port),
        CODEX_DEV_STARTED_AT: startedAt,
      },
      stdio: ["inherit", "pipe", "pipe"],
    },
  );

  const runtimeProbeHostname = getRuntimeProbeHostname(hostname);
  const url = `http://${formatHostForUrl(hostname)}:${port}`;

  console.log(`[codex-dev] Starting validated dev server on ${url}`);
  console.log(`[codex-dev] Runtime identity: ${workspaceRoot} :: ${gitBranch}@${gitCommit}`);
  console.log(`[codex-dev] Logs: ${outLogPath} / ${errLogPath}`);

  child.stdout.on("data", (chunk) => {
    process.stdout.write(chunk);
    outLog.write(chunk);
  });

  child.stderr.on("data", (chunk) => {
    stderrText += chunk.toString("utf8");
    process.stderr.write(chunk);
    errLog.write(chunk);
  });

  const forwardSignal = (signal) => {
    if (!child.killed) {
      child.kill(signal);
    }
  };

  process.on("SIGINT", forwardSignal);
  process.on("SIGTERM", forwardSignal);

  const startup = await waitForStartupValidation({
    child,
    hostname: runtimeProbeHostname,
    port,
    getStderrText: () => stderrText,
  });

  if (startup === "port-occupied") {
    process.off("SIGINT", forwardSignal);
    process.off("SIGTERM", forwardSignal);
    outLog.end();
    errLog.end();
    return startup;
  }

  await waitForChildExit(child, outLog, errLog);
  return "exited";
}

function parseArgs(argv) {
  let port;
  let hostname;
  const rest = [];

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];

    if ((value === "--port" || value === "-p") && argv[index + 1]) {
      port = Number.parseInt(argv[index + 1], 10);
      index += 1;
      continue;
    }

    if (value.startsWith("--port=")) {
      port = Number.parseInt(value.slice("--port=".length), 10);
      continue;
    }

    if ((value === "--hostname" || value === "-H") && argv[index + 1]) {
      hostname = argv[index + 1];
      index += 1;
      continue;
    }

    if (value.startsWith("--hostname=")) {
      hostname = value.slice("--hostname=".length);
      continue;
    }

    rest.push(value);
  }

  return {
    port: Number.isFinite(port) ? port : undefined,
    hostname: hostname || undefined,
    rest,
  };
}

function readGitValue(args, fallback) {
  try {
    return spawnSync("git", args, {
      cwd: workspaceRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).stdout.trim() || fallback;
  } catch {
    return fallback;
  }
}

async function inspectPort(port) {
  if (process.platform === "win32") {
    const netstat = spawnSync("netstat.exe", ["-ano", "-p", "tcp"], {
      cwd: workspaceRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    const listeners = parseNetstatListeners(netstat.stdout, port);

    if (listeners.length === 0) {
      return null;
    }

    const pids = [...new Set(listeners.map((listener) => listener.pid))];
    const processes = pids.map((pid) => lookupWindowsProcess(pid));

    return {
      pid: processes[0]?.pid ?? pids[0],
      commandLine: processes[0]?.commandLine ?? null,
      processes,
      listeners,
    };
  }

  const result = spawnSync("lsof", ["-nP", `-iTCP:${port}`, "-sTCP:LISTEN", "-Fpc"], {
    cwd: workspaceRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
  const output = result.stdout.trim();

  if (!output) {
    return null;
  }

  const pidMatch = output.match(/p(\d+)/);
  const commandLineMatch = output.match(/c([^\n]+)/);

  return {
    pid: pidMatch ? Number(pidMatch[1]) : null,
    commandLine: commandLineMatch?.[1] ?? null,
  };
}

function parseNetstatListeners(output, port) {
  return String(output)
    .split(/\r?\n/)
    .map((line) => {
      const match = line.match(/^\s*TCP\s+(\S+):(\d+)\s+\S+\s+LISTENING\s+(\d+)\s*$/i);

      if (!match || Number(match[2]) !== Number(port)) {
        return null;
      }

      return {
        localAddress: match[1],
        port: Number(match[2]),
        pid: Number(match[3]),
      };
    })
    .filter(Boolean);
}

function lookupWindowsProcess(pid) {
  const processLookup = spawnSync(
    "powershell.exe",
    [
      "-NoProfile",
      "-Command",
      `$process = Get-CimInstance Win32_Process -Filter "ProcessId = ${pid}"; if ($process) { [PSCustomObject]@{ pid = ${pid}; commandLine = $process.CommandLine } | ConvertTo-Json -Compress }`,
    ],
    {
      cwd: workspaceRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    },
  );
  const output = processLookup.stdout.trim();

  if (!output) {
    return { pid, commandLine: null };
  }

  return JSON.parse(output);
}

async function readRuntimeIdentity(hostname, port) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1200);
    const response = await fetch(`http://${formatHostForUrl(hostname)}:${port}/`, {
      headers: {
        Accept: "text/html,*/*",
      },
      method: "HEAD",
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return null;
    }

    return runtimeIdentityFromHeaders(response.headers);
  } catch {
    return null;
  }
}

function runtimeIdentityFromHeaders(headers) {
  const getHeader = (name) =>
    typeof headers.get === "function" ? headers.get(name) : headers[name.toLowerCase()] ?? headers[name];

  const workspaceRootHeader = getHeader("x-codex-workspace-root");
  const gitBranchHeader = getHeader("x-codex-git-branch");
  const gitCommitHeader = getHeader("x-codex-git-commit");
  const portHeader = getHeader("x-codex-dev-port");

  if (!workspaceRootHeader || !gitBranchHeader || !gitCommitHeader || !portHeader) {
    return null;
  }

  return {
    workspaceRoot: workspaceRootHeader,
    gitBranch: gitBranchHeader,
    gitCommit: gitCommitHeader,
    port: portHeader,
    pid: getHeader("x-codex-dev-pid"),
    startedAt: getHeader("x-codex-dev-started-at"),
  };
}

function isSameWorkspace(candidateWorkspaceRoot) {
  return normalizePathForCompare(candidateWorkspaceRoot) === normalizePathForCompare(workspaceRoot);
}

function containsWorkspace(commandLine) {
  return normalizeTextForCompare(commandLine).includes(normalizeTextForCompare(workspaceRoot));
}

function ownerContainsWorkspace(owner) {
  if (owner.commandLine && containsWorkspace(owner.commandLine)) {
    return true;
  }

  return owner.processes?.some((processInfo) => {
    return processInfo.commandLine && containsWorkspace(processInfo.commandLine);
  });
}

function matchesCurrentRuntime(runtime, port) {
  return (
    isSameWorkspace(runtime.workspaceRoot) &&
    runtime.gitBranch === gitBranch &&
    runtime.gitCommit === gitCommit &&
    String(runtime.port) === String(port)
  );
}

function normalizePathForCompare(value) {
  return path.resolve(String(value)).replace(/\//g, "\\").toLowerCase();
}

function normalizeTextForCompare(value) {
  return String(value).replace(/\//g, "\\").toLowerCase();
}

function formatOwnerLabel(owner) {
  const processes = owner.processes?.length
    ? owner.processes
    : [{ pid: owner.pid, commandLine: owner.commandLine }];

  return processes
    .map((processInfo) => {
      if (processInfo.commandLine) {
        return processInfo.commandLine.replace(/\s+/g, " ").trim();
      }

      return `PID ${processInfo.pid}`;
    })
    .join("; ");
}

function getRuntimeProbeHostname(hostname) {
  if (hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]") {
    return "127.0.0.1";
  }

  return hostname;
}

function formatHostForUrl(hostname) {
  return hostname.includes(":") && !hostname.startsWith("[") ? `[${hostname}]` : hostname;
}

async function waitForStartupValidation({ child, hostname, port, getStderrText }) {
  const startedAt = Date.now();
  const timeoutMs = 45_000;

  while (Date.now() - startedAt < timeoutMs) {
    const exitCode = child.exitCode;

    if (exitCode !== null) {
      if (isAddressInUseError(getStderrText())) {
        return "port-occupied";
      }

      throw new Error(`Dev server exited before validation with code ${exitCode}.`);
    }

    const runtime = await readRuntimeIdentity(hostname, port);
    if (runtime && matchesCurrentRuntime(runtime, port)) {
      console.log(`[codex-dev] Validated dev server on http://${formatHostForUrl(hostname)}:${port}`);
      return "validated";
    }

    await sleep(500);
  }

  throw new Error(`Timed out waiting for runtime identity on http://${formatHostForUrl(hostname)}:${port}.`);
}

function isAddressInUseError(output) {
  return /\bEADDRINUSE\b/i.test(output) || /address already in use/i.test(output);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function waitForChildExit(child, outLog, errLog) {
  return new Promise((resolve) => {
    child.on("exit", (code, signal) => {
      outLog.end();
      errLog.end();

      if (signal) {
        process.kill(process.pid, signal);
        return;
      }

      process.exit(code ?? 0);
      resolve();
    });
  });
}

function isMainModule() {
  return process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
}

export {
  formatHostForUrl,
  getRuntimeProbeHostname,
  isAddressInUseError,
  matchesCurrentRuntime,
  parseArgs,
  parseNetstatListeners,
  runtimeIdentityFromHeaders,
};
