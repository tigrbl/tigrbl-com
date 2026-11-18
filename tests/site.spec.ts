import { test, expect } from "@playwright/test";
import { DEMOS } from "../src/content/demos";
test("direct pages hydrate with correct content and no errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  for (const path of [
    "/",
    "/get-started",
    "/how-it-works",
    "/ecosystem",
    "/examples",
    "/demos",
    "/releases",
    "/privacy",
    "/terms",
    "/support",
    "/security",
    `/demos/${DEMOS[0].id}`,
  ]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
      "href",
      `https://tigrbl.com${path}`,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});
test("catalog search, filters, reset and empty state", async ({ page }) => {
  await page.goto("/demos");
  await page.getByLabel("Search demos").fill("PostgreSQL");
  await expect(page.locator(".demo-card")).not.toHaveCount(0);
  await page.getByLabel("Search demos").fill("no-such-demo-123");
  await expect(page.getByText("No matching demos.")).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.locator(".demo-card")).toHaveCount(DEMOS.length);
  await page
    .getByLabel("Category", { exact: true })
    .selectOption("Files and WebDAV");
  await expect(page.locator(".demo-card")).toHaveCount(1);
  await page.locator(".demo-card h2 a").click();
  await expect(
    page.getByRole("heading", { name: "WebDAV file explorer", exact: true }),
  ).toBeVisible();
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Explore the application",
  );
});
test("navigation works with keyboard and legacy links", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByText("Skip to content", { exact: true }),
  ).toBeFocused();
  if (testInfo.project.name !== "desktop") {
    const menu = page.getByRole("button", { name: "Menu", exact: true });
    await menu.click();
    await expect(
      page.getByRole("button", { name: "Close menu", exact: true }),
    ).toHaveAttribute("aria-expanded", "true");
  }
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Examples", exact: true })
    .click();
  await expect(page).toHaveURL(/\/examples$/);
  await page.reload();
  await expect(page.locator("h1")).toContainText("Small examples");
  await page.goto("/#releases");
  await expect(page).toHaveURL(/\/releases$/);
  await expect(page.locator("h1")).toContainText("Published versions");
});
test("static pages work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL: process.env.SITE_BASE_URL || "http://127.0.0.1:4187",
  });
  const page = await context.newPage();
  await page.goto("/examples");
  await expect(
    page.getByRole("heading", { name: "A first REST endpoint" }),
  ).toBeVisible();
  await page.goto("/demos");
  await expect(page.locator(".demo-card")).toHaveCount(DEMOS.length);
  await context.close();
});
