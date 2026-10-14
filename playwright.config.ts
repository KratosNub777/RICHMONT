import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3100",
    headless: true,
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
    } : {},
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [320, 390, 768, 1024, 1440].map((width) => ({
    name: `${width}px`,
    use: { viewport: { width, height: width === 320 ? 568 : width < 768 ? 844 : 1000 } },
  })),
  webServer: {
    command: "node scripts/qa-server.mjs",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
    timeout: 120_000,
    gracefulShutdown: { signal: "SIGTERM", timeout: 5000 },
  },
});
