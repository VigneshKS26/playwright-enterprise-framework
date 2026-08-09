//import { test, expect } from "../fixture/fixture";
import { test, expect } from "../fixture/authFixture";

test("Login Member", async ({ member }) => {
  await member.loginPage.loginMember();
  await expect(member.loginPage.getProfileName()).toBeVisible();
  await member.context.storageState({
    path: ".auth/member.json",
  });
});
test("Login Merchant", async ({ merchant }) => {
  await merchant.loginPage.loginMerchant();
  await merchant.page.waitForLoadState("networkidle");
  await expect(merchant.page).toHaveURL(/home/);
  await merchant.loginPage.changeMerchantLanguage();
  await merchant.context.storageState({
    path: ".auth/merchant.json",
  });
});
