import { test, expect } from "../fixture/fixture";
import { depositData } from "../test-data/depositData";

test("Deposit Flow", async ({ member, merchant }) => {
  const depositAmount = Number(Date.now().toString().slice(-4));

  await member.depositPage.requestDeposit(
    depositAmount,
    depositData.remitter,
    depositData.image,
  );

  await merchant.depositPage.acceptDeposit(process.env.MEMBER_USERNAME);

  const successData =
    await member.depositPage.openDepositRecords(depositAmount);

  await expect(successData).toBeVisible();
});
