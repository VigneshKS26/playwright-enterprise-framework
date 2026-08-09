import { BasePage } from "./BasePage";
export class DepositPage extends BasePage {
  constructor(page) {
    super(page);
    this.depositButton = page.locator(".tab-deposit");
    this.manualDeposit = page.getByText("Manual Recharge");
    this.inputAmount = page.locator("input[inputmode='decimal']");
    this.inputRemitter = page
      .locator(".placeholder-label-text", { hasText: "remitter" })
      .locator("..")
      .locator("xpath=preceding-sibling::div")
      .locator("input");
    this.uploadButton = page.locator(".van-uploader__input");
    this.submitDeposit = page.getByRole("button", { name: "Submit" });

    this.orderMenu = page.getByText("Order management");
    this.rechargeMenu = page.getByText("Recharge order");
    //this.depositRequestLists = page.locator(".n-data-table-tbody");
    this.pendingDepositRow = (memberName) =>
      this.page.locator("tr").filter({
        hasText: memberName,
        has: this.page.getByRole("button", { name: "review" }),
      });
    this.acceptDepositRequestButton = page.getByRole("button", {
      name: "Save",
    });

    this.memberCenterTab = page.getByText("Member Center");
    this.depositRecords = page.getByText("Deposit Record");
    this.depositSuccessList = page.getByRole("tab", { name: "Success" });
    this.successDepositData = (amount) =>
      this.page
        .locator("div.flex.items-center.py-12.px-8")
        .filter({ hasText: String(amount) });
  }
  /* async requestDeposit(depositAmount, remitter, image) {
    await this.depositButton.click();
    await this.manualDeposit.click();
    await this.inputAmount.fill(String(depositAmount));
    await this.inputRemitter.fill(remitter);
    const filechooserPromise = this.page.waitForEvent("filechooser");
    await this.uploadButton.click();
    const filechoose = await filechooserPromise;
    await filechoose.setFiles(image);
    await this.submitDeposit.click();
  } */
  async requestDeposit(depositAmount, remitter, image) {
    console.log("Clicking deposit button");
    await this.depositButton.click({ force: true });

    console.log("Waiting for manual recharge tab to load");
    await this.manualDeposit.waitFor({
      state: "visible",
      timeout: 5000,
    });
    await this.manualDeposit.click();

    console.log("Entering deposit amount");
    await this.inputAmount.fill(String(depositAmount));
    /* console.log("Waiting for remitter feild");
    await this.inputRemitter.waitFor({
      state: "visible",
    }); */

    console.log("Waiting for remitter feild");
    await this.page.waitForLoadState("networkidle");
    await this.inputRemitter.waitFor({
      state: "visible",
      timeout: 10000,
    });
    await this.inputRemitter.scrollIntoViewIfNeeded();
    await this.inputRemitter.click();

    console.log("Entering remitter");
    await this.inputRemitter.fill(remitter);

    console.log("Uploading image file");
    const filechooserPromise = this.page.waitForEvent("filechooser");

    await this.uploadButton.click();

    const filechoose = await filechooserPromise;
    await filechoose.setFiles(image);

    console.log("Submitting the deposit request");
    await this.submitDeposit.click();

    console.log("Deposit Submitted");
  }

  async acceptDeposit(memberName) {
    console.log("Navigating to Recharge menu");
    await this.orderMenu.click();
    await this.rechargeMenu.click();

    const row = this.pendingDepositRow(memberName);

    await row.getByRole("button", { name: "review" }).click();
    console.log("Accepting deposit request");

    await this.acceptDepositRequestButton.click();
  }

  async openDepositRecords(amount) {
    await this.memberCenterTab.click();
    await this.depositRecords.click();
    await this.depositSuccessList.click();

    return this.successDepositData(amount);
  }
}
