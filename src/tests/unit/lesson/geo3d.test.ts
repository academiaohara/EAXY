import { describe, expect, it } from "vitest";
import { planoTresPuntos, planoTxt, posPlanos, posRectaPlano, posRectas, posTresPlanos, puntoTxt, rectaDeDosPlanos } from "@/components/lesson/anim/geo3d";

describe("rectas y planos en el espacio", () => {
  it("halla el plano por tres puntos", () => {
    const p = planoTresPuntos([1, 0, 0], [0, 2, 0], [0, 0, 3]);
    expect(p).toEqual([6, 3, 2, -6]);
    expect(planoTxt(p)).toBe("6x + 3y + 2z − 6 = 0");
  });
  it("halla la recta intersección de dos planos", () => {
    const r = rectaDeDosPlanos([1, 1, 1, -3], [1, -1, 0, 1])!;
    expect(r.v).toEqual([1, 1, -2]);
    expect(puntoTxt(r.P)).toBe("(0, 1, 2)");
    expect(rectaDeDosPlanos([1, 1, 1, 0], [2, 2, 2, 5])).toBeNull();
  });
  it("clasifica dos rectas", () => {
    expect(posRectas([0, 0, 0], [1, 1, 0], [0, 0, 1], [1, 0, 0]).tipo).toBe("cruzan");
    const s = posRectas([0, 0, 0], [1, 1, 0], [1, 0, 0], [0, 1, 0]);
    expect(s.tipo).toBe("secantes");
    expect(puntoTxt(s.punto!)).toBe("(1, 1, 0)");
    expect(posRectas([0, 0, 0], [1, 2, 3], [1, 0, 0], [2, 4, 6]).tipo).toBe("paralelas");
    expect(posRectas([0, 0, 0], [1, 2, 3], [2, 4, 6], [-1, -2, -3]).tipo).toBe("coincidentes");
  });
  it("clasifica recta y plano", () => {
    const sec = posRectaPlano([1, 0, 0], [1, 1, 1], [1, 1, 1, -4]);
    expect(sec.tipo).toBe("secante");
    expect(puntoTxt(sec.punto!)).toBe("(2, 1, 1)");
    expect(posRectaPlano([0, 0, 0], [1, -1, 0], [1, 1, 1, 0]).tipo).toBe("contenida");
    expect(posRectaPlano([1, 0, 0], [1, -1, 0], [1, 1, 1, 0]).tipo).toBe("paralela");
  });
  it("clasifica dos y tres planos", () => {
    expect(posPlanos([1, 1, 1, 0], [2, 2, 2, 0]).tipo).toBe("coincidentes");
    expect(posPlanos([1, 1, 1, 0], [2, 2, 2, 1]).tipo).toBe("paralelos");
    expect(posPlanos([1, 1, 1, 0], [1, -1, 0, 0]).tipo).toBe("secantes");
    expect(posTresPlanos([1, 0, 0, -1], [0, 1, 0, -2], [0, 0, 1, -3]).caso).toBe("punto");
    expect(posTresPlanos([1, 1, 0, 0], [0, 1, 1, 0], [1, 0, -1, 0]).caso).toBe("recta");
    expect(posTresPlanos([1, 1, 0, 0], [0, 1, 1, 0], [1, 2, 1, 1]).caso).toBe("prisma");
    expect(posTresPlanos([1, 1, 1, 0], [1, 1, 1, 1], [0, 1, 0, 0]).caso).toBe("dos-paralelos");
    expect(posTresPlanos([1, 1, 1, 0], [1, 1, 1, 1], [1, 1, 1, 2]).caso).toBe("paralelos");
  });
});

describe("datos de las lecciones de rectas y planos", () => {
  it("coinciden con los cálculos", () => {
    expect(posRectaPlano([1, 0, 0], [1, 1, 1], [1, 1, 1, -4]).punto!.map((x) => x.n / x.d)).toEqual([2, 1, 1]);
    expect(posRectaPlano([1, 0, 0], [1, 2, -1], [1, 1, 1, -7]).punto!.map((x) => x.n / x.d)).toEqual([4, 6, -3]);
    expect(posRectas([0, 0, 1], [1, 1, 0], [2, 0, 1], [-1, 1, 0]).punto!.map((x) => x.n / x.d)).toEqual([1, 1, 1]);
    expect(posRectas([0, 0, 0], [1, 1, 0], [0, 0, 2], [1, -1, 0]).tipo).toBe("cruzan");
    expect(planoTresPuntos([1, 0, 0], [0, 2, 0], [0, 0, 3]).join()).toBe("6,3,2,-6");
    expect(6 * 1 + 3 * 2 + 2 * -3 - 6).toBe(0);
    expect(posTresPlanos([1, 1, 0, 0], [0, 1, 1, 0], [1, 2, 1, -1]).caso).toBe("prisma");
    expect(posTresPlanos([1, 1, 1, -1], [1, -1, 0, 0], [0, 1, -1, 0]).an.solucion?.map((x) => `${x.n}/${x.d}`)).toEqual(["1/3", "1/3", "1/3"]);
  });
});
