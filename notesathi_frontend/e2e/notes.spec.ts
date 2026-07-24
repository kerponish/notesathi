import { test, expect } from "@playwright/test";

test.describe("Notes", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "user@test.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
  });

  test("create, view and delete a note", async ({ page }) => {
    const title = `E2E Note ${Date.now()}`;

    await page.goto("/dashboard/notes/new");
    await page.fill('input[name="title"]', title);
    await page.fill('textarea[name="description"]', "Created by a Playwright e2e test.");
    await page.selectOption('select[name="subjectId"]', { label: "Mathematics" });
    await page.selectOption('select[name="classLevel"]', "5");

    await page.locator('input[type="file"]').first().setInputFiles({
      name: "note.pdf",
      mimeType: "application/pdf",
      buffer: Buffer.from("%PDF-1.4 e2e test content"),
    });

    await page.click('button:has-text("Publish Note")');

    await expect(page).toHaveURL(/\/dashboard\/notes$/, { timeout: 10000 });
    await expect(page.locator("h3").filter({ hasText: title })).toBeVisible();

    await page.locator("h3").filter({ hasText: title }).click();
    await expect(page).toHaveURL(/\/dashboard\/notes\/[a-f0-9]+$/);
    await expect(page.locator("h1")).toHaveText(title);

    await page.goto("/dashboard/notes");
    const card = page
      .locator("h3")
      .filter({ hasText: title })
      .locator("xpath=ancestor::div[contains(@class,'relative')][1]");
    await card.locator('button[aria-label="Note actions"]').click();
    await page.click('button:has-text("Delete")');
    await page.click('button:has-text("Delete")');

    await expect(page.locator("h3").filter({ hasText: title })).not.toBeVisible({
      timeout: 10000,
    });
  });
});
