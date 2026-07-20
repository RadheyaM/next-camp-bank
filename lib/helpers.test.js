import { describe, it, expect } from "vitest";
import transactionBalance, { allTransactionBalances, addDay } from "./helpers";

describe("Bank Balance Calculations (transactionBalance)", () => {
  it("should return 0 when both arrays are empty", () => {
    expect(transactionBalance([], [])).toBe(0);
  });

  it("should sum deposits correctly", () => {
    const deposits = [{ amount: "10" }, { amount: "20.5" }];
    expect(transactionBalance(deposits, [])).toBe(30.5);
  });

  it("should subtract payments correctly", () => {
    const deposits = [{ amount: "50" }];
    const payments = [{ amount: "10" }, { amount: "15.5" }];
    expect(transactionBalance(deposits, payments)).toBe(24.5);
  });

  it("should support numeric operations including float values", () => {
    const deposits = [{ amount: "100.25" }];
    const payments = [{ amount: "50.12" }];
    expect(transactionBalance(deposits, payments)).toBe(50.13);
  });
});

describe("Bulk Balances Compiler (allTransactionBalances)", () => {
  it("should compiler list of balances with correct classifications and math", () => {
    const deposits = [
      { accountId: "10001", amount: "100" },
      { accountId: "10002", amount: "50" }
    ];
    const payments = [
      { accountId: "10001", amount: "30" }, // standard payment
      { accountId: "10001", amount: "5" }   // adjustment deduction
    ];
    const allCampers = [
      { accountId: "10001", firstName: "Dylan", lastName: "Carleton", category: "Primary" },
      { accountId: "10002", firstName: "Alfie", lastName: "Carleton", category: "Secondary" }
    ];

    const balances = allTransactionBalances(deposits, payments, allCampers);

    expect(balances).toHaveLength(2);
    
    // Check Dylan
    const dylan = balances.find(b => b.accountId === "10001");
    expect(dylan).toBeDefined();
    expect(dylan.name).toBe("Dylan Carleton");
    expect(dylan.balance).toBe(65); // €100 - €35
    expect(dylan.category).toBe("Primary");

    // Check Alfie
    const alfie = balances.find(b => b.accountId === "10002");
    expect(alfie).toBeDefined();
    expect(alfie.name).toBe("Alfie Carleton");
    expect(alfie.balance).toBe(50); // €50 - €0
    expect(alfie.category).toBe("Secondary");
  });

  it("should fallback to 'Unassigned' category if not defined", () => {
    const allCampers = [
      { accountId: "10003", firstName: "Bobby", lastName: "Wankhade" }
    ];
    const balances = allTransactionBalances([], [], allCampers);
    expect(balances[0].category).toBe("Unassigned");
  });
});

describe("Calendar Date Parser Helper (addDay)", () => {
  it("should correctly map and append date key day-of-week indices", () => {
    const trans = [
      { timeStamp: "2026-07-20T12:00:00.000Z" } // July 20th 2026 is a Monday
    ];
    const result = addDay(trans);
    expect(result[0].day).toBe(1); // Monday is 1 in getDay()
  });
});
