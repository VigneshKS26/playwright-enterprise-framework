// @ts-check
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.ENV || "test"}`,
});

export default defineConfig({
  testDir: "./tests",

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: "github",

  use: {
    trace: "off",

    screenshot: "off",

    video: "off",
  },

  projects: [
    {
      name: "setup",
      testMatch: "**/auth.setup.spec.js",
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["setup"],
      testIgnore: "**/auth.setup.spec.js",
    },
  ],
});
