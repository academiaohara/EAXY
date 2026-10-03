import { describe, expect, it } from "vitest";
import { romanToInt } from "@/components/lesson/tools/naturales-numeracion/roman";

describe("romanToInt", () => {
  it("suma símbolos simples", () => {
    expect(romanToInt("III")).toBe(3);
    expect(romanToInt("X")).toBe(10);
  });

  it("aplica restas IV y XIV", () => {
    expect(romanToInt("IV")).toBe(4);
    expect(romanToInt("XIV")).toBe(14);
    expect(romanToInt("XC")).toBe(90);
  });
});
