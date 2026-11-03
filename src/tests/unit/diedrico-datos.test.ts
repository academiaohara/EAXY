import { describe, expect, it } from "vitest";
import { CONSTRUCCIONES } from "@/components/lesson/bench/construcciones-datos";
import type { Construccion } from "@/components/lesson/bench/construcciones-datos";

const c = (id: string) => CONSTRUCCIONES[id as keyof typeof CONSTRUCCIONES] as Construccion;
const LT = 190;
const lado = (id: string, n: string) => Math.sign(c(id).pts[n][1] - LT); // +1 bajo la LT, −1 sobre ella

describe("épura del punto (tema 12)", () => {
  it("primer diedro: horizontal bajo la LT y vertical sobre ella", () => {
    expect([lado("punto-primer-diedro", "Ap"), lado("punto-primer-diedro", "Av")]).toEqual([1, -1]);
  });
  it("segundo diedro: las dos proyecciones sobre la LT", () => {
    expect([lado("punto-segundo-diedro", "Bp"), lado("punto-segundo-diedro", "Bv")]).toEqual([-1, -1]);
  });
  it("tercer diedro: proyecciones invertidas", () => {
    expect([lado("punto-tercer-diedro", "Cp"), lado("punto-tercer-diedro", "Cv")]).toEqual([-1, 1]);
  });
  it("cuarto diedro: las dos proyecciones bajo la LT", () => {
    expect([lado("punto-cuarto-diedro", "Dp"), lado("punto-cuarto-diedro", "Dv")]).toEqual([1, 1]);
  });
  it("las dos proyecciones están en la misma línea de referencia, perpendicular a la LT", () => {
    for (const [id, a, b] of [["punto-primer-diedro", "Ap", "Av"], ["punto-tercer-diedro", "Cp", "Cv"], ["punto-primer-bisector", "Ep", "Ev"]]) {
      expect(c(id).pts[a][0]).toBe(c(id).pts[b][0]);
    }
  });
  it("las distancias a la LT coinciden con los segmentos dato de cota y alejamiento", () => {
    const k = c("punto-primer-diedro");
    const largo = (n: string) => k.pts[`${n}2`][0] - k.pts[`${n}1`][0];
    expect(LT - k.pts.Av[1]).toBe(largo("cota"));
    expect(k.pts.Ap[1] - LT).toBe(largo("alej"));
  });
  it("en el primer bisector cota y alejamiento son iguales", () => {
    const k = c("punto-primer-bisector");
    expect(LT - k.pts.Ev[1]).toBe(k.pts.Ep[1] - LT);
  });
});
