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
  const url = page.url();
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
    const CollectionCard = page.getByTestId("collection-card");
    await page.getByTestId("collection-card").waitFor();
    await expect(CollectionCard).toBeVisible();
  });

  test("should display tags on the first collection card", async ({ page }) => {
    const CollectionCardTagsContainer = page.getByTestId(
      "collection-card-tags-container"
    );
    await CollectionCardTagsContainer.waitFor();
    const childrenTagName = await CollectionCardTagsContainer.evaluate(
      (elem) => elem.children[0].tagName
    );

    expect(childrenTagName).toBe("svg");
  });

  test.describe("should display collection image and logo from profile", () => {
    test("image", async ({ page }) => {
      const CollectionCardImage = page.getByTestId("collection-card-image");
      await CollectionCardImage.waitFor();
      const backgroundImage = await CollectionCardImage.evaluate((elem) =>
        window.getComputedStyle(elem).getPropertyValue("background-image")
      );

      expect(backgroundImage).toBeTruthy();
    });
    test.fixme("logo", async ({ page }) => {
      // yet unable to check image's src
      const CollectionCardLogo = page.getByTestId("collection-card-logo");
      await CollectionCardLogo.waitFor();
      const imageSrc = await CollectionCardLogo.getAttribute("src");
      expect(imageSrc).toBeTruthy();
    });
  });
  test.fixme("should display collection brand and name from profile", () => {});
  test.fixme("should display collection entities length", () => {});
  test.fixme("should display collection denom from token IPFS", () => {});
});
