import { test, expect } from "@playwright/test";
import { APP_LOCATION } from "@/e2e-tests/constants";
import { BlocksyncUrl } from "@/constants/chains";

const LOCATION_GLOBAL_COLLECTIONS_LIST = `${APP_LOCATION}collections/global`;
const BLOCK_SYNC_URL = BlocksyncUrl;

test.beforeAll(async () => {
  console.log("🪿 beforeAll");
});

test("should redirect from '/' to global collections list", async ({
  page,
}) => {
  await page.goto(APP_LOCATION);
  await page.waitForURL(LOCATION_GLOBAL_COLLECTIONS_LIST);

  const url = await page.url();
  await expect(url).toEqual(LOCATION_GLOBAL_COLLECTIONS_LIST);
});

test("should request and display collections", async ({ page }) => {
  await page.goto(APP_LOCATION);
  await page.waitForURL(LOCATION_GLOBAL_COLLECTIONS_LIST);

  const requestPromise = await page.waitForRequest(
    `${BLOCK_SYNC_URL}/api/entity/collections`
  );
  const url = requestPromise.url();
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
