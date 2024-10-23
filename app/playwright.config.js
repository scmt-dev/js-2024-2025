// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    baseURL: 'http://localhost:3000',  // Set your base URL here
    headless: false,  // Set to true if you want to run the tests headlessly
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'on',  // Capture screenshots on failure
    // video: 'retain-on-failure',  // Record video on test failures
    slowMo: 500,
  },
  outputDir: 'test-results',
  projects: [
    {
      name: 'chromium',  // Run tests on Chrome
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',  // Run tests on Firefox
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',  // Run tests on WebKit (Safari)
      use: { browserName: 'webkit' },
    },
  ],
});
