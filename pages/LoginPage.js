import { BasePage } from "./BasePage";
export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.memberUsername = page.locator("#van-field-4-input");
    this.memberPassword = page.locator("#van-field-5-input");
    this.memberLoginButton = page.getByRole("button", { name: "Login" });

    this.merchantUsername = page.getByPlaceholder("账号");
    this.merchantPassword = page.getByPlaceholder("密码");
    this.merchantCode = page.getByPlaceholder("商户编码");
    this.merchantLoginButton = page.locator("button[type='button']");

    this.languageDropdown = page.locator(
      'xpath=//div[contains(@class,"ml-10")]/preceding-sibling::i[2]',
    );
    this.selectEnglishLang = page.getByText("English");

    this.profileName = page.locator(".profile__name");
  }

  async loginMember() {
    await this.memberUsername.fill(process.env.MEMBER_USERNAME);
    await this.memberPassword.fill(process.env.MEMBER_PASSWORD);
    await this.memberLoginButton.click();

    await this.handleStartupPopup();
  }
  async loginMerchant() {
    await this.merchantUsername.fill(process.env.MERCHANT_USERNAME);
    await this.merchantPassword.fill(process.env.MERCHANT_PASSWORD);
    await this.merchantCode.fill(process.env.MERCHANT_CODE);
    await this.merchantLoginButton.click();
  }
  async changeMerchantLanguage() {
    await this.languageDropdown.hover();
    await this.selectEnglishLang.click();
  }
  /* async getURL() {
    return this.page.url();
  } */
  getProfileName() {
    return this.profileName;
  }
  async handleStartupPopup() {
    for (let i = 0; i < 5; i++) {
      const count = await this.page.locator(".van-icon-close").count();

      if (count > 0) {
        await this.page.evaluate(() => {
          document.querySelector(".van-icon-close")?.click();
        });
      }

      await this.page.waitForTimeout(1000);
    }
  }
}
