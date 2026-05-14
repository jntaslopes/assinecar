import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import {
  formatHostForUrl,
  getRuntimeProbeHostname,
  isAddressInUseError,
  matchesCurrentRuntime,
  parseArgs,
  parseNetstatListeners,
  runtimeIdentityFromHeaders,
} from "./codex-dev.mjs";

const currentBranch = readGitValue(["rev-parse", "--abbrev-ref", "HEAD"], "unknown");
const currentCommit = readGitValue(["rev-parse", "--short", "HEAD"], "unknown");

describe("codex-dev helpers", () => {
  it("parses port, hostname, and passthrough arguments", () => {
    expect(parseArgs(["--port", "3004", "--hostname", "0.0.0.0", "--experimental-https"])).toEqual({
      port: 3004,
      hostname: "0.0.0.0",
      rest: ["--experimental-https"],
    });

    expect(parseArgs(["-p", "3005", "-H", "127.0.0.1", "--turbo"])).toEqual({
      port: 3005,
      hostname: "127.0.0.1",
      rest: ["--turbo"],
    });

    expect(parseArgs(["--port=3006", "--hostname=localhost"])).toEqual({
      port: 3006,
      hostname: "localhost",
      rest: [],
    });
  });

  it("parses all Windows netstat listeners for a port", () => {
    const output = `
  TCP    0.0.0.0:3004           0.0.0.0:0              LISTENING       1234
  TCP    [::]:3004              [::]:0                 LISTENING       5678
  TCP    127.0.0.1:3005         0.0.0.0:0              LISTENING       9999
`;

    expect(parseNetstatListeners(output, 3004)).toEqual([
      { localAddress: "0.0.0.0", port: 3004, pid: 1234 },
      { localAddress: "[::]", port: 3004, pid: 5678 },
    ]);
  });

  it("reads runtime identity from Next response headers", () => {
    const headers = new Headers({
      "x-codex-workspace-root": process.cwd(),
      "x-codex-git-branch": currentBranch,
      "x-codex-git-commit": currentCommit,
      "x-codex-dev-port": "3004",
      "x-codex-dev-pid": "1111",
      "x-codex-dev-started-at": "2026-05-14T00:00:00.000Z",
    });

    const runtime = runtimeIdentityFromHeaders(headers);

    expect(runtime).toEqual({
      workspaceRoot: process.cwd(),
      gitBranch: currentBranch,
      gitCommit: currentCommit,
      port: "3004",
      pid: "1111",
      startedAt: "2026-05-14T00:00:00.000Z",
    });
    expect(matchesCurrentRuntime(runtime, 3004)).toBe(true);
  });

  it("normalizes runtime probe hosts and formats URL hosts", () => {
    expect(getRuntimeProbeHostname("0.0.0.0")).toBe("127.0.0.1");
    expect(getRuntimeProbeHostname("::")).toBe("127.0.0.1");
    expect(getRuntimeProbeHostname("localhost")).toBe("localhost");
    expect(formatHostForUrl("::1")).toBe("[::1]");
  });

  it("detects address-in-use startup failures", () => {
    expect(isAddressInUseError("Error: listen EADDRINUSE: address already in use :::3004")).toBe(true);
    expect(isAddressInUseError("ready started server")).toBe(false);
  });
});

function readGitValue(args, fallback) {
  try {
    return spawnSync("git", args, {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).stdout.trim() || fallback;
  } catch {
    return fallback;
  }
}
