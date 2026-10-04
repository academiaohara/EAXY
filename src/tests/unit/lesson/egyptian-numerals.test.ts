import { describe, expect, it } from "vitest";
import { egyptianSymbolsToInt } from "@/components/lesson/tools/naturales-numeracion/EgyptianNumeralIcon";

describe("egyptianSymbolsToInt", () => {
  it("suma símbolos aditivos", () => {
    expect(egyptianSymbolsToInt(["10", "10", "10", "10", "1", "1", "1", "1", "1", "1", "1"])).toBe(47);
    expect(egyptianSymbolsToInt(["1000", "100", "10", "1"])).toBe(1111);
  });
});
