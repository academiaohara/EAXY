import { describe, expect, it } from "vitest";
import { add, argDeg, binomText, conj, div, fromPolar, modulus, mul, wrapDeg } from "@/components/lesson/anim/complex";

describe("complejos", () => {
  it("módulo y argumento principal", () => {
    expect(modulus({ x: 3, y: 4 })).toBe(5);
    expect(argDeg({ x: 1, y: 1 })).toBe(45);
    expect(argDeg({ x: -1, y: -1 })).toBe(-135);
    expect(argDeg({ x: -3, y: 0 })).toBe(180);
    expect(argDeg({ x: 0, y: -7 })).toBe(-90);
    expect(argDeg({ x: 0, y: 0 })).toBe(0);
  });

  it("producto, conjugado y suma", () => {
    expect(mul({ x: 2, y: -1 }, { x: 1, y: 2 })).toEqual({ x: 4, y: 3 });
    expect(conj({ x: 3, y: 5 })).toEqual({ x: 3, y: -5 });
    expect(add({ x: 2, y: 3 }, { x: 3, y: -1 })).toEqual({ x: 5, y: 2 });
  });

  it("cociente (se multiplica por el conjugado) y división entre cero", () => {
    expect(div({ x: 3, y: 4 }, { x: 1, y: -2 })).toEqual({ x: -1, y: 2 });
    expect(div({ x: 2, y: 0 }, { x: 1, y: 1 })).toEqual({ x: 1, y: -1 });
    expect(div({ x: 1, y: 1 }, { x: 0, y: 0 })).toBeNull();
  });

  it("polar a binómica y ángulos", () => {
    expect(fromPolar(2, 60)).toEqual({ x: 1, y: 1.732051 });
    expect(wrapDeg(720)).toBe(0);
    expect(wrapDeg(225)).toBe(-135);
    expect(wrapDeg(180)).toBe(180);
  });

  it("la forma binómica se escribe sin 1 delante de i", () => {
    expect(binomText({ x: 4, y: 3 })).toBe("4 + 3i");
    expect(binomText({ x: 1, y: -1 })).toBe("1 − i");
    expect(binomText({ x: 0, y: -2 })).toBe("−2i");
    expect(binomText({ x: -5, y: 0 })).toBe("−5");
  });
});
