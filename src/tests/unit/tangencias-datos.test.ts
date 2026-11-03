import { describe, expect, it } from "vitest";
import { CONSTRUCCIONES, type Construccion, type P } from "@/components/lesson/bench/construcciones-datos";
import { CONSTRUCCIONES_TANGENCIAS } from "@/components/lesson/bench/construcciones-tangencias";

const d = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]);
/** Distancia de `p` a la recta `a`–`b`. */
const dRecta = (p: P, a: P, b: P) => Math.abs((b[0] - a[0]) * (a[1] - p[1]) - (a[0] - p[0]) * (b[1] - a[1])) / d(a, b);
const paralelas = (a: P, b: P, c: P, e: P) => Math.abs((b[0] - a[0]) * (e[1] - c[1]) - (b[1] - a[1]) * (e[0] - c[0])) / (d(a, b) * d(c, e));
const C = (id: string) => (CONSTRUCCIONES_TANGENCIAS as Record<string, Construccion>)[id];
const pt = (id: string, n: string) => C(id).pts[n];
const circ = (id: string, n: string) => C(id).circulos!.find((x) => x.c === n)!.r;
const cerca = (a: number, b: number, tol = 0.6) => expect(Math.abs(a - b)).toBeLessThan(tol);

/** Circunferencia solución de la operación `solucion` número `k`: centro y radio. */
function solucion(id: string, k = 0): { c: P; r: number } {
  const ops = C(id).ops.filter((o) => o.k === "solucion");
  const o = ops[k] as { c: string; hacia: string };
  return { c: pt(id, o.c), r: d(pt(id, o.c), pt(id, o.hacia)) };
}

describe("tangencias: las construcciones son geométricamente correctas", () => {
  it("tangente en un punto: perpendicular al radio y a distancia r del centro", () => {
    const O = pt("tangente-punto", "O");
    cerca(dRecta(O, pt("tangente-punto", "_a"), pt("tangente-punto", "_b")), circ("tangente-punto", "O"));
    cerca(dRecta(pt("tangente-punto", "T"), pt("tangente-punto", "_a"), pt("tangente-punto", "_b")), 0);
  });

  it("tangentes paralelas a una dirección", () => {
    const id = "tangentes-paralelas";
    for (const [s, c] of [["_s1", "_c1"], ["_s2", "_c2"]]) {
      cerca(dRecta(pt(id, "O"), pt(id, s), pt(id, c)), circ(id, "O"));
      cerca(paralelas(pt(id, s), pt(id, c), pt(id, "_r1"), pt(id, "r")), 0, 1e-6);
    }
  });

  it("tangente a un arco sin centro", () => {
    const id = "tangente-sin-centro";
    cerca(dRecta(pt(id, "_O"), pt(id, "T"), pt(id, "A")), circ(id, "_O"));
    cerca(d(pt(id, "T"), pt(id, "B")), d(pt(id, "B"), pt(id, "C")));
  });

  it("tangentes desde un punto exterior", () => {
    const id = "tangentes-punto-exterior";
    for (const T of ["Ta", "Tb"]) {
      cerca(d(pt(id, "O"), pt(id, T)), circ(id, "O"));
      cerca(dRecta(pt(id, "O"), pt(id, "P"), pt(id, T)), circ(id, "O"));
    }
  });

  it("tangentes comunes exterior e interior", () => {
    let id = "tangente-comun-exterior";
    for (const [c, r] of [["O", circ(id, "O")], ["O1", circ(id, "O1")]] as [string, number][]) cerca(dRecta(pt(id, c), pt(id, "Tq"), pt(id, "Tp")), r);
    id = "tangente-comun-interior";
    for (const [c, r] of [["O", circ(id, "O")], ["O1", circ(id, "O1")]] as [string, number][]) cerca(dRecta(pt(id, c), pt(id, "Ta"), pt(id, "Tb")), r);
    // el centro O está en lados opuestos de la tangente interior
    const o = pt(id, "O");
    const o1 = pt(id, "O1");
    const a = pt(id, "Ta");
    const b = pt(id, "Tb");
    const lado = (p: P) => Math.sign((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]));
    expect(lado(o)).toBe(-lado(o1));
  });

  it("circunferencias tangentes a una recta en un punto, con radio dado", () => {
    const id = "circ-recta-punto-radio";
    for (const k of [0, 1]) {
      const s = solucion(id, k);
      cerca(s.r, 50);
      cerca(dRecta(s.c, pt(id, "_r1"), pt(id, "r")), s.r);
    }
    const id2 = "circ-recta-punto-pasa";
    const s2 = solucion(id2);
    cerca(d(s2.c, pt(id2, "P")), s2.r);
    cerca(dRecta(s2.c, pt(id2, "_r1"), pt(id2, "r")), s2.r);
  });

  it("circunferencias tangentes a una recta que pasan por un punto", () => {
    const id = "circ-recta-por-punto-radio";
    for (const k of [0, 1]) {
      const s = solucion(id, k);
      cerca(s.r, 70);
      cerca(dRecta(s.c, pt(id, "_r1"), pt(id, "r")), 70);
      cerca(d(s.c, pt(id, "P")), 70);
    }
  });

  it("tangentes a dos rectas: radio dado y punto de tangencia dado", () => {
    for (const id of ["circ-dos-rectas-radio", "enlace-dos-rectas-radio"]) {
      const O = pt(id, "O1");
      cerca(dRecta(O, pt(id, "_s1"), pt(id, "s")), 50);
      cerca(dRecta(O, pt(id, "_r1"), pt(id, "r")), 50);
    }
    for (const id of ["circ-dos-rectas-punto", "enlace-dos-rectas-punto"]) {
      const O = pt(id, "O");
      cerca(dRecta(O, pt(id, "_s1"), pt(id, "s")), d(O, pt(id, "T")));
      cerca(dRecta(O, pt(id, "_r1"), pt(id, "r")), d(O, pt(id, "T")));
    }
  });

  it("circunferencia inscrita en el triángulo", () => {
    const id = "circ-tres-rectas";
    const I = pt(id, "I");
    const lados: [string, string][] = [["A", "B"], ["B", "C"], ["C", "A"]];
    const r = d(I, pt(id, "F"));
    for (const [a, b] of lados) cerca(dRecta(I, pt(id, a), pt(id, b)), r);
  });

  it("circunferencias tangentes a otra", () => {
    let id = "circ-otra-t-radio";
    for (const k of [0, 1]) {
      const s = solucion(id, k);
      cerca(s.r, 60);
      cerca(d(s.c, pt(id, "O")), k === 0 ? circ(id, "O") + 60 : Math.abs(circ(id, "O") - 60));
      cerca(dRecta(pt(id, "T"), pt(id, "O"), s.c), 0);
    }
    id = "circ-otra-t-punto";
    let s = solucion(id);
    cerca(d(s.c, pt(id, "P")), s.r);
    cerca(dRecta(s.c, pt(id, "O"), pt(id, "T")), 0);
    id = "circ-otra-por-punto-radio";
    for (const k of [0, 1]) {
      s = solucion(id, k);
      cerca(s.r, 70);
      cerca(d(s.c, pt(id, "O")), circ(id, "O") + 70);
    }
    id = "circ-otra-recta-radio";
    for (const k of [0, 1]) {
      s = solucion(id, k);
      cerca(s.r, 40);
      cerca(d(s.c, pt(id, "O")), circ(id, "O") + 40);
      cerca(dRecta(s.c, pt(id, "_s1"), pt(id, "s")), 40);
    }
    id = "circ-otra-recta-t";
    s = solucion(id);
    cerca(dRecta(s.c, pt(id, "O"), pt(id, "T")), 0);
    cerca(dRecta(s.c, pt(id, "_r1"), pt(id, "r")), s.r, 0.8);
    expect(s.c[0]).toBeGreaterThan(10);
    expect(s.c[0]).toBeLessThan(610);
  });

  it("enlaces: los arcos son tangentes a las líneas dadas", () => {
    let id = "enlace-rectas-90";
    let O = pt(id, "O");
    cerca(dRecta(O, pt(id, "V"), pt(id, "r")), dRecta(O, pt(id, "V"), pt(id, "s")));
    id = "enlace-recta-arco";
    O = pt(id, "O");
    cerca(d(O, pt(id, "O1")), circ(id, "O1") + 45);
    cerca(dRecta(O, pt(id, "_r1"), pt(id, "r")), 45);
    id = "enlace-arco-recta-t";
    O = pt(id, "O");
    const rho = d(O, pt(id, "T"));
    cerca(d(O, pt(id, "O1")), circ(id, "O1") + rho, 0.8);
    id = "enlace-arco-t-punto";
    const s = solucion(id);
    cerca(d(s.c, pt(id, "P")), s.r);
    id = "enlace-dos-arcos";
    O = pt(id, "O");
    cerca(d(O, pt(id, "O1")), circ(id, "O1") - 40);
    cerca(d(O, pt(id, "O2")), circ(id, "O2") - 40);
  });

  it("parábola: las rectas envolventes pasan por puntos de la curva", () => {
    const id = "parabola";
    const [A, Cc, B] = [pt(id, "c0"), pt(id, "C"), pt(id, "c4")];
    for (let k = 1; k <= 4; k += 1) {
      const t = k / 5;
      const q: P = [(1 - t) ** 2 * A[0] + 2 * t * (1 - t) * Cc[0] + t * t * B[0], (1 - t) ** 2 * A[1] + 2 * t * (1 - t) * Cc[1] + t * t * B[1]];
      cerca(dRecta(q, pt(id, `d${k}`), pt(id, `e${k}`)), 0, 1e-6);
    }
  });

  it("rectificaciones: longitudes correctas", () => {
    let id = "rectificar-curva";
    let suma = 0;
    for (let k = 1; k <= 4; k += 1) suma += d(pt(id, `c${k - 1}`), pt(id, `c${k}`));
    cerca(pt(id, "x4")[0] - pt(id, "xo")[0], suma);
    id = "rectificar-circunferencia";
    cerca(pt(id, "x4")[0] - pt(id, "xo")[0], 2 * Math.PI * 80, 2.5);
    id = "rectificar-semicircunferencia";
    cerca(d(pt(id, "Dt"), pt(id, "x3")), Math.PI * 80, 0.5);
  });

  it("todo cabe en la hoja", () => {
    for (const [id, c] of Object.entries(CONSTRUCCIONES_TANGENCIAS) as [string, Construccion][]) {
      for (const [n, p] of Object.entries(c.pts)) {
        if (n.startsWith("_")) continue;
        expect(p[0], `${id} ${n}`).toBeGreaterThan(8);
        expect(p[0], `${id} ${n}`).toBeLessThan(612);
        expect(p[1], `${id} ${n}`).toBeGreaterThan(8);
        expect(p[1], `${id} ${n}`).toBeLessThan(372);
      }
      c.ops.forEach((o) => {
        if (o.k !== "solucion") return;
        const cc = c.pts[o.c];
        const r = d(cc, c.pts[o.hacia]);
        if (o.hasta) return;
        expect(cc[0] - r, `${id} solución`).toBeGreaterThan(0);
        expect(cc[0] + r, `${id} solución`).toBeLessThan(620);
        expect(cc[1] - r, `${id} solución`).toBeGreaterThan(0);
        expect(cc[1] + r, `${id} solución`).toBeLessThan(380);
      });
    }
  });

  it("están registradas junto al resto de construcciones", () => {
    for (const id of Object.keys(CONSTRUCCIONES_TANGENCIAS)) expect((CONSTRUCCIONES as Record<string, unknown>)[id]).toBeDefined();
  });
});
