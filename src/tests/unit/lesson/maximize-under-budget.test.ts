import { describe, expect, it } from "vitest";
import {
  bestSpendUnderBudget,
  isOptimalPurchase,
} from "@/lib/lesson/stage/maximize-under-budget";

const ITEMS = [
  { id: "bici", price: 583 },
  { id: "casco", price: 162 },
  { id: "maillot", price: 45 },
  { id: "culotte", price: 38 },
];

describe("maximize-under-budget", () => {
  it("encuentra el gasto máximo bajo 700 €", () => {
    const best = bestSpendUnderBudget(ITEMS, 700);
    expect(best?.spend).toBe(666);
    expect(best?.remainder).toBe(34);
    expect(best?.ids.sort()).toEqual(["bici", "culotte", "maillot"]);
  });

  it("solo acepta la combinación óptima", () => {
    expect(isOptimalPurchase(["bici", "maillot", "culotte"], ITEMS, 700)).toBe(true);
    expect(isOptimalPurchase(["bici", "casco"], ITEMS, 700)).toBe(false);
  });
});
