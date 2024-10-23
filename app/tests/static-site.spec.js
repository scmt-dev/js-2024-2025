const { test, expect } = require('@playwright/test');

// Define the base URL where the static site is served
const BASE_URL = 'http://localhost:8080';  // Update with the correct URL and port

test.describe('Static Website E2E Tests', () => {

  // Before each test, go to the login page
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/signin.html`);  // Update with your login page's path
  });

  // Test 1: Check if the login page loads correctly
  test('should load the login page', async ({ page }) => {
    await expect(page.locator('text=Welcome Back')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  // Test 2: Check email and password inputs
  test('should allow typing in email and password fields', async ({ page }) => {
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'password123');
    await expect(page.locator('input[name="email"]')).toHaveValue('testuser@example.com');
    await expect(page.locator('input[name="password"]')).toHaveValue('password123');
  });

  // Test 3: Submit form with empty fields
  test('should show an error for empty form submission', async ({ page }) => {
    await page.click('button:has-text("Login")');
    // Verify error message (assume your static site shows some error message)
    // await expect(page.locator('text=All fields are required')).toBeVisible();
  });

  // Test 4: Check navigation to Signup page
  test('should navigate to signup page', async ({ page }) => {
    await page.click('text=Sign Up');
    await expect(page).toHaveURL(`${BASE_URL}/signup.html`);
  });

  // Test 5: Check navigation to Forgot Password page
  test('should navigate to forgot password page', async ({ page }) => {
    await page.click('text=Forgot Password?');
    await expect(page).toHaveURL(`${BASE_URL}/forgot-password.html`);
    await expect(page.locator('text=Reset your password')).toBeVisible();
  });
});
