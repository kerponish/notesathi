import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  retries: 1,
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: [
    {
      command: "npx ts-node src/__tests__/e2e/test-server.ts",
      cwd: "../notesathi_backend",
      port: 5001,
      reuseExistingServer: false,
      timeout: 120000,
      env: {
        NODE_ENV: "test",
        PORT: "5001",
      },
    },
    {
      command: "npx next dev",
      port: 3000,
      reuseExistingServer: false,
      timeout: 120000,
      env: {
        NODE_ENV: "test",
        NEXT_PUBLIC_API_BASE_URL: "http://localhost:5001",
      },
    },
  ],
});
