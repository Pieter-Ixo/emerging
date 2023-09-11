import { test, expect } from "@playwright/test";
import { APP_LOCATION } from "@/e2e-tests/constants";
import { BlocksyncUrl } from "@/constants/chains";

const LOCATION_GLOBAL_COLLECTIONS_LIST = `${APP_LOCATION}collections/global`;
const BLOCK_SYNC_URL = BlocksyncUrl;

test.beforeEach(async ({ page }) => {
  await page.goto(APP_LOCATION);
  await page.waitForURL(LOCATION_GLOBAL_COLLECTIONS_LIST);
});

test("should redirect from '/' to the global collections list", async ({
  page,
}) => {
  const url = await page.url();
  expect(url).toEqual(LOCATION_GLOBAL_COLLECTIONS_LIST);
});

test.describe("Home page. The global collections list", () => {
  test("should request collections", async ({ page }) => {
    const requestGlobalCollections = await page.waitForRequest(
      `${BLOCK_SYNC_URL}/api/entity/collections`
    );
    const requestedURL = requestGlobalCollections.url();
    expect(requestedURL).toEqual(`${BLOCK_SYNC_URL}/api/entity/collections`);
  });

  test("should display collections cards", async ({ page }) => {
    const CollectionCard = await page.getByTestId("CollectionCard");
    await page.getByTestId("CollectionCard").waitFor();
    await expect(CollectionCard).toBeVisible();
  });

  test("should display tags on the first collection card", async ({ page }) => {
    const CollectionCardTagsContainer = await page.getByTestId(
      "collection-card-tags-container"
    );
    await CollectionCardTagsContainer.waitFor();
    const childrenTagName = await CollectionCardTagsContainer.evaluate(
      (elem) => elem.children[0].tagName
    );

    expect(childrenTagName).toBe("svg");
  });
});
