import { test, expect } from "@playwright/test";
import { APP_LOCATION } from "@/e2e-tests/constants";

test.beforeAll(async () => {
  console.log("🪿 Before tests");
});

test("should not be logged in when come at first", async ({ page }) => {
  await page.goto(APP_LOCATION);
  await page.waitForURL(`${APP_LOCATION}collections/global`);
  const url = await page.url();
  await expect(url).toEqual(`${APP_LOCATION}collections/global`);
});

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole("heading", { name: "Installation" })
//   ).toBeVisible();
// });
