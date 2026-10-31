import { describe, expect, it } from "vitest";
import {
  PARALELA_S_MAX,
  rotarPunto,
  PERP_EX0,
  PERP_PX,
  angDe,
  dist,
  enCirculo,
  entreDirecciones,
  interseccionCirculos,
  perpEx,
  perpPasaPorP,
  perpSetup,
  puntoMedio,
  apoyarTriangulo,
  applyPose,
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
import { CARTABON_PTS, ESCUADRA_PTS, compasApertura, compasRadio, poseCompas } from "@/components/lesson/bench/instruments";

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

describe("mesa de dibujo · apoyar un triángulo sobre una arista", () => {
  const casos: [string, [Pt, Pt, Pt], 0 | 1 | 2, 0 | 1 | 2][] = [
    ["escuadra por la hipotenusa", ESCUADRA_PTS, 1, 2],
    ["escuadra por un cateto", ESCUADRA_PTS, 0, 1],
    ["cartabón por el cateto largo", CARTABON_PTS, 0, 1],
    ["cartabón por la hipotenusa", CARTABON_PTS, 1, 2],
  ];
  it.each(casos)("%s: el vértice va a O, la arista queda horizontal a su derecha y el cuerpo, encima", (_n, pts, vi, wi) => {
    const o: Pt = [170, 300];
    for (const arriba of [true, false]) {
      const pose = apoyarTriangulo(pts, vi, wi, o, arriba);
      const v = applyPose(pose, pts[vi]);
      const w = applyPose(pose, pts[wi]);
      const k = ([0, 1, 2] as const).find((i) => i !== vi && i !== wi)!;
      const t = applyPose(pose, pts[k]);
      expect(v[0]).toBeCloseTo(o[0], 6);
      expect(v[1]).toBeCloseTo(o[1], 6);
      expect(w[1]).toBeCloseTo(o[1], 6);
      expect(w[0]).toBeGreaterThan(o[0]);
      expect(w[0] - o[0]).toBeCloseTo(Math.hypot(pts[wi][0] - pts[vi][0], pts[wi][1] - pts[vi][1]), 6);
      expect(t[1] < o[1]).toBe(arriba);
    }
  });
});

describe("mesa de dibujo · perpendicular con escuadra y cartabón", () => {
  it("el cateto vertical pasa por P justo cuando la escuadra ha recorrido px − x0", () => {
    for (const dP of [50, 80, 120]) {
      const setup = perpSetup(dP);
      expect(setup.p).toEqual([PERP_PX, -dP]);
      expect(perpEx(setup.sStar)).toBeCloseTo(PERP_PX, 9);
      expect(perpPasaPorP(setup, setup.sStar)).toBe(true);
      expect(perpPasaPorP(setup, 0)).toBe(false);
      expect(perpEx(0)).toBe(PERP_EX0);
    }
  });

  it("el cateto vertical de la escuadra, apoyada sobre r, es perpendicular a r en cualquier posición", () => {
    for (const s of [0, 60, 160, 260]) {
      const pose = apoyarTriangulo(ESCUADRA_PTS, 0, 1, [perpEx(s), 0], true);
      const a = applyPose(pose, ESCUADRA_PTS[0]);
      const b = applyPose(pose, ESCUADRA_PTS[1]);
      const c = applyPose(pose, ESCUADRA_PTS[2]);
      expect(a[1]).toBeCloseTo(0, 9);
      expect(b[1]).toBeCloseTo(0, 9);
      expect(c[0]).toBeCloseTo(a[0], 9); // cateto vertical
      expect(c[1]).toBeLessThan(0);
    }
  });
});

describe("mesa de dibujo · ángulos y circunferencias", () => {
  it("angDe y enCirculo son inversas (0° a la derecha, antihorario en pantalla)", () => {
    const c: Pt = [100, 200];
    for (const a of [0, 30, 90, 130, 180, -45]) {
      const p = enCirculo(c, 50, a);
      expect(dist(c, p)).toBeCloseTo(50, 9);
      expect(entreDirecciones(angDe(c, p), a)).toBeCloseTo(0, 6);
    }
    expect(enCirculo(c, 10, 90)[1]).toBeLessThan(200); // arriba en pantalla
  });

  it("las circunferencias del mismo radio desde A y B se cortan sobre la mediatriz", () => {
    const A: Pt = [210, 190];
    const B: Pt = [410, 190];
    const [C, D] = interseccionCirculos(A, 130, B, 130)!;
    const M = puntoMedio(A, B);
    for (const p of [C, D]) {
      expect(dist(p, A)).toBeCloseTo(130, 6);
      expect(dist(p, B)).toBeCloseTo(130, 6);
      expect(p[0]).toBeCloseTo(M[0], 6);
    }
    expect(C[1]).toBeLessThan(M[1]);
    expect(D[1]).toBeGreaterThan(M[1]);
  });

  it("circunferencias que no se cortan devuelven null (abertura menor que la mitad)", () => {
    expect(interseccionCirculos([0, 0], 50, [200, 0], 50)).toBeNull();
  });

  it("el punto de corte de los arcos desde P y Q está en la bisectriz", () => {
    for (const alfa of [40, 70, 110, 130]) {
      const V: Pt = [120, 300];
      const P = enCirculo(V, 120, 0);
      const Q = enCirculo(V, 120, alfa);
      const r2 = dist(P, Q) / 2 + 45;
      const cortes = interseccionCirculos(P, r2, Q, r2)!;
      const T = dist(cortes[0], V) > dist(cortes[1], V) ? cortes[0] : cortes[1];
      expect(angDe(V, T)).toBeCloseTo(alfa / 2, 6);
    }
  });

  it("poseCompas: la punta seca va a N y la mina a M", () => {
    const casos: [Pt, Pt][] = [
      [[210, 262], [210 + 130, 262]],
      [[210, 262], [240, 140]],
      [[410, 262], [300, 330]],
      [[120, 300], [60, 400]],
    ];
    for (const [n, m] of casos) {
      const { pose, open } = poseCompas(n, m);
      const half = (open / 2) * (Math.PI / 180);
      const L = 110;
      const agujaLocal: Pt = [-Math.sin(half) * L, Math.cos(half) * L];
      const minaLocal: Pt = [Math.sin(half) * L, Math.cos(half) * L];
      const a = applyPose(pose, agujaLocal);
      const b = applyPose(pose, minaLocal);
      expect(a[0]).toBeCloseTo(n[0], 6);
      expect(a[1]).toBeCloseTo(n[1], 6);
      expect(b[0]).toBeCloseTo(m[0], 6);
      expect(b[1]).toBeCloseTo(m[1], 6);
    }
  });
});

describe("mesa de dibujo · giro", () => {
  it("rotarPunto gira en sentido antihorario tal y como se ve en pantalla y conserva la distancia", () => {
    const o: Pt = [100, 100];
    const a: Pt = [200, 100]; // a la derecha de O
    const arriba = rotarPunto(a, o, 90);
    expect(arriba[0]).toBeCloseTo(100, 9);
    expect(arriba[1]).toBeCloseTo(0, 9); // sube en pantalla
    const izq = rotarPunto(a, o, 180);
    expect(izq[0]).toBeCloseTo(0, 9);
    expect(izq[1]).toBeCloseTo(100, 9);
    for (const g of [30, 60, 125, 270]) {
      expect(dist(rotarPunto(a, o, g), o)).toBeCloseTo(100, 9);
      expect(angDe(o, rotarPunto(a, o, g))).toBeCloseTo(((g + 180) % 360) - 180, 6);
    }
  });
});
