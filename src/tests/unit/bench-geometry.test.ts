import { describe, expect, it } from "vitest";
import {
  PARALELA_S_MAX,
  cartabonPose,
  distRecta,
  distanciaFiloAP,
  escuadraPose,
  filoEscuadra,
  filoPasaPorP,
  hipotenusaEscuadra,
  insetTriangle,
  paralelaSetup,
  CARTABON_LARGO,
  type Pt,
} from "@/components/lesson/bench/geometry";
import { compasApertura, compasRadio } from "@/components/lesson/bench/instruments";

const ANGLES = [-25, -10, 0, 12, 35];
const DISTS = [40, 70, 100];

describe("mesa de dibujo · paralela con escuadra y cartabón", () => {
  it("el filo de la escuadra es siempre paralelo a r, deslice lo que deslice", () => {
    for (const th of ANGLES) {
      const setup = paralelaSetup([95, 55], th, 70);
      const r: [Pt, Pt] = [setup.c0, [setup.c0[0] + setup.u[0], setup.c0[1] + setup.u[1]]];
      for (const s of [0, 30, 77, PARALELA_S_MAX]) {
        const [a, b] = filoEscuadra(setup, s);
        expect(distRecta(a, ...r)).toBeCloseTo(distRecta(b, ...r), 6);
      }
    }
  });

  it("el filo pasa por P exactamente con s = dP·√2", () => {
    for (const th of ANGLES) {
      for (const dP of DISTS) {
        const setup = paralelaSetup([95, 55], th, dP);
        expect(setup.sStar).toBeCloseTo(dP * Math.SQRT2, 9);
        expect(distanciaFiloAP(setup, setup.sStar)).toBeCloseTo(0, 6);
        expect(filoPasaPorP(setup, setup.sStar)).toBe(true);
        expect(filoPasaPorP(setup, 0)).toBe(false);
      }
    }
  });

  it("la meta es alcanzable con el recorrido disponible", () => {
    for (const dP of DISTS) {
      expect(paralelaSetup([0, 0], 0, dP).sStar).toBeLessThanOrEqual(PARALELA_S_MAX + 20);
    }
    expect(paralelaSetup([0, 0], 0, 100).sStar).toBeGreaterThan(PARALELA_S_MAX - 1);
  });

  it("la hipotenusa de la escuadra no se separa del cateto del cartabón al deslizar", () => {
    for (const th of ANGLES) {
      const setup = paralelaSetup([95, 55], th, 70);
      const ct = cartabonPose(setup);
      const origen: Pt = [ct.x, ct.y];
      const fin: Pt = [ct.x + Math.cos((ct.rot * Math.PI) / 180) * CARTABON_LARGO, ct.y + Math.sin((ct.rot * Math.PI) / 180) * CARTABON_LARGO];
      for (const s of [0, 40, PARALELA_S_MAX]) {
        const [a, b] = hipotenusaEscuadra(setup, s);
        expect(distRecta(a, origen, fin)).toBeLessThan(1e-6);
        expect(distRecta(b, origen, fin)).toBeLessThan(1e-6);
      }
    }
  });

  it("al deslizar, la escuadra solo se traslada: no gira", () => {
    const setup = paralelaSetup([95, 55], 20, 70);
    expect(escuadraPose(setup, 0).rot).toBe(escuadraPose(setup, 90).rot);
  });

  it("el cartabón queda por fuera de la hipotenusa (lado opuesto al ángulo recto)", () => {
    const setup = paralelaSetup([95, 55], 0, 70);
    const ct = cartabonPose(setup);
    // Con r horizontal, la hipotenusa baja hacia la izquierda; el cuerpo del cartabón (local +y) debe quedar hacia abajo-derecha.
    const cuerpo: Pt = [-Math.sin((ct.rot * Math.PI) / 180), Math.cos((ct.rot * Math.PI) / 180)];
    expect(cuerpo[0] * Math.SQRT1_2 + cuerpo[1] * Math.SQRT1_2).toBeGreaterThan(0.99);
  });
});

describe("mesa de dibujo · utilidades", () => {
  it("el compás: radio y abertura son inversos", () => {
    for (const r of [10, 30, 80, 150]) {
      expect(compasRadio(compasApertura(r))).toBeCloseTo(r, 6);
    }
  });

  it("el vaciado interior de un triángulo queda dentro y es semejante", () => {
    const t: [Pt, Pt, Pt] = [[0, 0], [170, 0], [0, 170]];
    const i = insetTriangle(t, 24);
    for (const p of i) {
      expect(p[0]).toBeGreaterThan(0);
      expect(p[1]).toBeGreaterThan(0);
      expect(p[0] + p[1]).toBeLessThan(170);
    }
    const lado = (a: Pt, b: Pt) => Math.hypot(a[0] - b[0], a[1] - b[1]);
    expect(lado(i[0], i[1]) / lado(t[0], t[1])).toBeCloseTo(lado(i[0], i[2]) / lado(t[0], t[2]), 9);
  });
});
