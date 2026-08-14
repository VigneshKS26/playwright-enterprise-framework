import { LoginPage } from "../pages/LoginPage";
import { DepositPage } from "../pages/DepositPage";
import { test as base } from "@playwright/test";
export { expect } from "@playwright/test";
export const test = base.extend({
  member: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    const depositPage = new DepositPage(page);
    await page.goto(process.env.MEMBER_URL);
    console.log("Current URL:", this.page.url());
    await page.screenshot({ path: "debug.png" });
    await use({
      context,
      page,
      loginPage,
      depositPage,
    });
    await context.close();
  },
  merchant: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    const depositPage = new DepositPage(page);
    await page.goto(process.env.MERCHANT_URL);
    console.log("Current URL:", this.page.url());
    await page.screenshot({ path: "debug1.png" });
    await use({
      context,
      page,
      loginPage,
      depositPage,
    });
    await context.close();
  },
});
