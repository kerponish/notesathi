import { test, expect } from "@playwright/test";

test.describe("Auth", () => {
  test("register creates a new account and redirects to login", async ({ page }) => {
    const email = `e2e-${Date.now()}@test.com`;

    await page.goto("/signup");
    await page.fill('input[name="fullname"]', "E2E New User");
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', "password123");
    await page.fill('input[name="confirmPassword"]', "password123");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
  });

  test("register shows a validation error for a short password", async ({ page }) => {
    await page.goto("/signup");
    await page.fill('input[name="fullname"]', "E2E User");
    await page.fill('input[name="email"]', `e2e-${Date.now()}@test.com`);
    await page.fill('input[name="password"]', "123");
    await page.fill('input[name="confirmPassword"]', "123");
    await page.click('button[type="submit"]');

    await expect(
      page.getByText("Password must be at least 6 characters", { exact: true }),
    ).toBeVisible();
    await expect(page).toHaveURL(/\/signup/);
  });

  test("login with valid credentials redirects to the dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "user@test.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
    await expect(page.locator("text=Welcome back")).toBeVisible();
  });

  test("login stays on the page with an incorrect password", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "user@test.com");
    await page.fill('input[name="password"]', "wrong-password");
    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/\/login/);
  });

  test("logout returns to the login page", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "user@test.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });

    await page.click('button[aria-label="Logout"]');

    await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
  });
});
