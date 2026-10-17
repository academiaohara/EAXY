import { describe, expect, it } from "vitest";
import {
  egyptianBreakdown,
  intToRoman,
  positionalBreakdown,
  prehistoricBreakdown,
  romanSteps,
  romanToInt,
} from "@/lib/lesson/stage/numeracion";

describe("numeracion", () => {
  it("romanToInt", () => {
    expect(romanToInt("XLIV")).toBe(44);
    expect(romanToInt("MCCLXXX")).toBe(1280);
    expect(romanToInt("XIV")).toBe(14);
  });

  it("intToRoman", () => {
    expect(intToRoman(1250)).toBe("MCCL");
    expect(intToRoman(44)).toBe("XLIV");
    expect(intToRoman(1280)).toBe("MCCLXXX");
  });

  it("egyptianBreakdown", () => {
    expect(egyptianBreakdown(1435)).toEqual({
      thousands: 1,
      hundreds: 4,
      tens: 3,
      ones: 5,
    });
  });

  it("positionalBreakdown", () => {
    expect(positionalBreakdown(35318)).toEqual([30000, 5000, 300, 10, 8]);
    expect(positionalBreakdown(33)).toEqual([30, 3]);
  });

  it("romanSteps", () => {
    const xiv = romanSteps("XIV");
    expect(xiv.map((s) => s.action)).toEqual(["suma", "resta", "suma"]);
    expect(xiv[xiv.length - 1]?.runningTotal).toBe(14);
  });

  it("prehistoricBreakdown", () => {
    expect(prehistoricBreakdown(47)).toEqual({ people: 2, hands: 1, sticks: 2 });
    expect(prehistoricBreakdown(38)).toEqual({ people: 1, hands: 3, sticks: 3 });
  });
});
