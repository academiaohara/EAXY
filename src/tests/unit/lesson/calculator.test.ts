import { describe, expect, it } from "vitest";
import { CALC_INITIAL, pressKey, showDisplay, type CalcKey } from "@/lib/lesson/calculator";

function run(keys: CalcKey[]) {
  return showDisplay(keys.reduce(pressKey, CALC_INITIAL).display);
}

describe("calculadora de las lecciones", () => {
  it("escribe con coma decimal y no repite la coma", () => {
    expect(run(["1", ",", "2", ",", "5"])).toBe("1,25");
    expect(run([",", "5"])).toBe("0,5");
  });

  it("suma sin el ruido de la coma flotante", () => {
    expect(run(["0", ",", "1", "+", "0", ",", "2", "="])).toBe("0,3");
  });

  it("calcula los problemas del tema 5", () => {
    expect(run(["3", ",", "1", "5", "*", "0", ",", "7", "5", "="])).toBe("2,3625");
    expect(run(["3", "0", "/", "7", "="])).toBe("4,28571428571");
    expect(run(["2", "0", "-", "1", "3", ",", "8", "5", "="])).toBe("6,15");
  });

  it("encadena operaciones y avisa de la división entre cero", () => {
    expect(run(["2", "+", "3", "*", "4", "="])).toBe("20");
    expect(run(["5", "/", "0", "="])).toBe("Error");
  });

  it("borra con ⌫ y C", () => {
    expect(run(["1", "2", "<"])).toBe("1");
    expect(run(["1", "2", "+", "C"])).toBe("0");
  });
});
