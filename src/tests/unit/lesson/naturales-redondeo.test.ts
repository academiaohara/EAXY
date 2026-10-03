import { describe, expect, it } from "vitest";
import {
  firstRemovedDigitIndex,
  lastKeptDigitIndex,
  roundToOrder,
} from "@/lib/lesson/naturales-redondeo";

describe("naturales-redondeo", () => {
  it("calcula índices de corte para 293518", () => {
    expect(lastKeptDigitIndex(6, 5)).toBe(0);
    expect(lastKeptDigitIndex(6, 4)).toBe(1);
    expect(lastKeptDigitIndex(6, 3)).toBe(2);
    expect(firstRemovedDigitIndex(6, 3)).toBe(3);
  });

  it("redondea 293518 a distintos órdenes", () => {
    expect(roundToOrder(293_518, "centenas-millar")).toBe(300_000);
    expect(roundToOrder(293_518, "decenas-millar")).toBe(290_000);
    expect(roundToOrder(293_518, "millares")).toBe(294_000);
  });

  it("redondea a decenas", () => {
    expect(roundToOrder(4587, "decenas")).toBe(4590);
    expect(roundToOrder(24_963, "millares")).toBe(25_000);
  });
});
