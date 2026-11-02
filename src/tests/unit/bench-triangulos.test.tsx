// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LessonStepControlProvider } from "@/components/lesson/LessonStepControlContext";
import { BenchPracticeContext } from "@/components/lesson/bench/practice";
import { BENCH_STEPS } from "@/components/lesson/bench/scenes";
import { GEO } from "@/components/lesson/bench/scenes-construcciones";
import { SlideBench } from "@/components/lesson/bench/SlideBench";
import type { Pt } from "@/components/lesson/bench/geometry";
import { interseccionCirculos } from "@/components/lesson/bench/geometry";
import { PN_A, PN_B, PN_C, circuncentro, incentro, baricentro, ortocentro, pie } from "@/components/lesson/bench/scenes-poligonos";
import type { BenchSceneId } from "@/lib/lesson/types";

afterEach(cleanup);

const enCirc = (c: Pt, r: number, a: number): Pt => [c[0] + r * Math.cos((a * Math.PI) / 180), c[1] - r * Math.sin((a * Math.PI) / 180)];
const ang = (v: Pt, p: Pt) => (Math.atan2(-(p[1] - v[1]), p[0] - v[0]) * 180) / Math.PI;
const notas = (n: number) => Array.from({ length: n }, (_, i) => ({ title: `Título ${i + 1}`, text: `Texto del paso ${i + 1}` }));
const norm = (a: number) => ((((a + 180) % 360) + 360) % 360) - 180;
const d = (a: Pt, b: Pt) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const esperarAuto = () => act(async () => { await new Promise((r) => setTimeout(r, 450)); });

function pantalla(scene: BenchSceneId) {
  const onCheck = vi.fn();
  render(
    <LessonStepControlProvider>
      <BenchPracticeContext.Provider value={{ onCheck }}>
        <SlideBench block={{ kind: "bench", scene, notes: notas(BENCH_STEPS[scene]) }} />
      </BenchPracticeContext.Provider>
    </LessonStepControlProvider>,
  );
  const svg = () => screen.getByTestId("bench-practica");
  const tocar = (p: Pt) => fireEvent.pointerDown(svg(), { clientX: p[0], clientY: p[1], pointerId: 1 });
  const arrastrar = (...ps: Pt[]) => {
    fireEvent.pointerDown(svg(), { clientX: ps[0][0], clientY: ps[0][1], pointerId: 1 });
    for (const p of ps) fireEvent.pointerMove(svg(), { clientX: p[0], clientY: p[1], pointerId: 1 });
    fireEvent.pointerUp(svg(), { pointerId: 1 });
  };
  const fase = () => svg().getAttribute("data-tipo");
  const medir = (s: [Pt, Pt]) => {
    expect(fase()).toBe("medida");
    tocar(s[0]);
    tocar(s[1]);
  };
  const angulo = (c: Pt, base: number, signo: 1 | -1, obj: number) => {
    expect(fase()).toBe("angulo");
    arrastrar(enCirc(c, 120, base + signo * (obj - 15)), enCirc(c, 120, base + signo * obj));
  };
  /** Clava la punta en `c` y traza el arco por el punto `corte`. */
  const arco = (c: Pt, corte: Pt) => {
    expect(fase()).toBe("centro");
    tocar(c);
    expect(fase()).toBe("arco");
    const a = ang(c, corte);
    arrastrar(enCirc(c, 150, a - 25), enCirc(c, 150, a + 10));
  };
  const superada = () => {
    expect(onCheck).toHaveBeenCalledTimes(1);
    expect(onCheck).toHaveBeenCalledWith({ correct: true, snapshot: { kind: "bench_task", isCorrect: true } });
  };
  /** Abertura `r` con la punta en `c` (se arrastra la mina hasta ese radio y se fija). */
  const abertura = (c: Pt, r: number) => {
    expect(fase()).toBe("abertura");
    arrastrar(enCirc(c, r, 20));
    fireEvent.click(screen.getByTestId("bench-fijar"));
  };
  /** Desliza la escuadra con el teclado sobre el cartabón hasta que la perpendicular queda trazada. */
  const perpendicular = () => {
    expect(fase()).toBe("perpendicular");
    const antes = screen.queryAllByTestId("bench-trazo-aux").length;
    for (let i = 0; i < 300 && screen.queryAllByTestId("bench-trazo-aux").length === antes; i += 1) fireEvent.keyDown(svg(), { key: "ArrowRight" });
    expect(screen.queryAllByTestId("bench-trazo-aux").length).toBe(antes + 1);
  };
  /** Circunferencia completa con el compás ya abierto: la mina da la vuelta entera alrededor de `c`. */
  const circunferencia = (c: Pt, r: number) => {
    expect(fase()).toBe("arco");
    arrastrar(enCirc(c, r, -175), enCirc(c, r, -90), enCirc(c, r, 0), enCirc(c, r, 90), enCirc(c, r, 175));
  };
  return { onCheck, svg, tocar, arrastrar, fase, medir, angulo, arco, abertura, perpendicular, circunferencia, superada };
}

type Pantalla = ReturnType<typeof pantalla>;
/** Mediatriz de `P`–`Q` con el compás: abertura `r`, un arco desde cada extremo; devuelve los dos cortes. */
function par(t: Pantalla, P: Pt, Q: Pt, r: number): [Pt, Pt] {
  const th = Math.max((Math.acos(Math.min(1, d(P, Q) / (2 * r))) * 180) / Math.PI, 20) + 8;
  t.tocar(P);
  t.abertura(P, r);
  t.arrastrar(enCirc(P, r, ang(P, Q) + th), enCirc(P, r, ang(P, Q) - th));
  t.tocar(Q);
  t.arrastrar(enCirc(Q, r, ang(Q, P) + th), enCirc(Q, r, ang(Q, P) - th));
  return interseccionCirculos(P, r, Q, r) as [Pt, Pt];
}
/** Arco de radio `r` alrededor de `V` que pasa por `p` y `q`, con el compás ya abierto. */
const arcoPor = (t: Pantalla, V: Pt, r: number, p: Pt, q: Pt) => {
  const a = ang(V, p);
  const b = ang(V, q);
  const mas = norm(b - a) >= 0 ? 8 : -8;
  t.arrastrar(enCirc(V, r, a - mas), enCirc(V, r, b + mas));
};
/** Bisectriz o altura: arco desde `V` que corta en P y Q, dos arcos iguales desde P y Q y regla por V y T. */
function recta(t: Pantalla, V: Pt, P: Pt, Q: Pt, r1: number, r2: number) {
  t.tocar(V);
  t.abertura(V, r1);
  arcoPor(t, V, r1, P, Q);
  const th = Math.max((Math.acos(Math.min(1, d(P, Q) / (2 * r2))) * 180) / Math.PI, 20) + 8;
  t.tocar(P);
  t.abertura(P, r2);
  t.arrastrar(enCirc(P, r2, ang(P, Q) + th), enCirc(P, r2, ang(P, Q) - th));
  t.tocar(Q);
  t.arrastrar(enCirc(Q, r2, ang(Q, P) + th), enCirc(Q, r2, ang(Q, P) - th));
  const [T] = interseccionCirculos(P, r2, Q, r2) as [Pt, Pt];
  t.tocar(V);
  t.tocar(T);
}
const sinArcos = () => screen.getByTestId("bench-arcos-practica").querySelectorAll("path").length === 0;

describe("mesa de dibujo · rectas notables del triángulo", () => {
  it("mediatrices: tras la primera recta desaparecen sus arcos, y la segunda y el circuncentro cierran la práctica", () => {
    const t = pantalla("circuncentro-practica");
    const [c1, c2] = par(t, PN_A, PN_B, 160);
    expect(t.fase()).toBe("trazo");
    expect(sinArcos()).toBe(false);
    t.tocar(c1);
    t.tocar(c2);
    expect(t.fase()).toBe("centro");
    expect(sinArcos()).toBe(true);
    expect(screen.getAllByTestId("bench-trazo-aux")).toHaveLength(1);
    const [e1, e2] = par(t, PN_A, PN_C, 150);
    t.tocar(e1);
    t.tocar(e2);
    expect(t.fase()).toBe("punto");
    expect(sinArcos()).toBe(true);
    expect(t.onCheck).not.toHaveBeenCalled();
    t.tocar([PN_B[0] - 30, PN_B[1] - 30]);
    expect(t.fase()).toBe("punto");
    const O = circuncentro(PN_A, PN_B, PN_C);
    t.tocar(O);
    t.medir([O, PN_A]);
    t.tocar(O);
    t.circunferencia(O, d(O, PN_A));
    t.superada();
    expect(screen.getByTestId("bench-circuncentro")).toBeTruthy();
  });

  it("bisectrices: dos bisectrices con sus arcos y el incentro", () => {
    const t = pantalla("incentro-practica");
    const lado = (V: Pt, S: [Pt, Pt]) => {
      const P = enCirc(V, 100, ang(V, S[0]));
      const Q = enCirc(V, 100, ang(V, S[1]));
      recta(t, V, P, Q, 100, d(P, Q) / 2 + 40);
    };
    lado(PN_A, [PN_B, PN_C]);
    expect(t.fase()).toBe("centro");
    expect(sinArcos()).toBe(true);
    lado(PN_B, [PN_A, PN_C]);
    expect(t.fase()).toBe("punto");
    const I = incentro(PN_A, PN_B, PN_C);
    t.tocar(I.p);
    t.perpendicular();
    t.medir([I.p, pie(I.p, PN_A, PN_B)]);
    t.tocar(I.p);
    t.circunferencia(I.p, I.r);
    t.superada();
    expect(screen.getByTestId("bench-incentro")).toBeTruthy();
  });

  it("medianas: el punto medio se marca, se borran los auxiliares y la mediana queda; después el baricentro", () => {
    const t = pantalla("baricentro-practica");
    const mediana = (V: Pt, P: Pt, Q: Pt, r: number) => {
      const [c1, c2] = par(t, P, Q, r);
      t.tocar(c1);
      t.tocar(c2);
      expect(t.fase()).toBe("punto");
      const M: Pt = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
      t.tocar(M);
      expect(sinArcos()).toBe(true);
      expect(t.fase()).toBe("trazo");
      t.tocar(V);
      t.tocar(M);
    };
    mediana(PN_A, PN_B, PN_C, 150);
    expect(screen.getAllByTestId("bench-trazo-aux")).toHaveLength(1);
    mediana(PN_B, PN_A, PN_C, 150);
    expect(t.fase()).toBe("punto");
    t.tocar(baricentro(PN_A, PN_B, PN_C));
    t.superada();
  });

  it("alturas: cada altura se traza con la escuadra deslizando sobre el cartabón y después se marca el ortocentro", () => {
    const t = pantalla("ortocentro-practica");
    t.perpendicular();
    t.perpendicular();
    expect(t.fase()).toBe("punto");
    t.tocar(ortocentro(PN_A, PN_B, PN_C));
    t.superada();
  });

  it("alturas: la escuadra solo se da por buena al soltarla con el filo por el vértice", () => {
    const t = pantalla("ortocentro-practica");
    fireEvent.keyDown(t.svg(), { key: "ArrowRight" });
    expect(screen.queryAllByTestId("bench-trazo-aux")).toHaveLength(0);
    expect(screen.getByTestId("bench-marca-objetivo")).toBeTruthy();
    expect(t.fase()).toBe("perpendicular");
  });
});

describe("mesa de dibujo · prácticas de construcción de triángulos", () => {
  it("equilátero con el lado: dos arcos de radio a", async () => {
    const t = pantalla("equilatero-lado-practica");
    const { B, C, A, dato } = GEO.eqLado;
    t.medir(dato);
    t.arco(B, A);
    t.arco(C, A);
    expect(t.fase()).toBe("auto");
    await esperarAuto();
    t.superada();
  });

  it("dos lados y el ángulo: transportador, medida y arco", async () => {
    const t = pantalla("triangulo-lal-practica");
    const { B, A, aB, datoC } = GEO.lal;
    t.angulo(B, 0, 1, aB);
    t.medir(datoC);
    t.arco(B, A);
    await esperarAuto();
    t.superada();
  });

  it("rectángulo con los dos catetos: ángulo recto y arco de radio b", async () => {
    const t = pantalla("rectangulo-catetos-practica");
    const { A, C, datoB } = GEO.recCatetos;
    t.perpendicular();
    t.medir(datoB);
    t.arco(A, C);
    await esperarAuto();
    t.superada();
  });

  it("isósceles con el lado igual y el ángulo desigual", async () => {
    const t = pantalla("isosceles-lado-angulo-practica");
    const { B, A, aB, dato } = GEO.isoLadoAng;
    t.angulo(B, 0, 1, aB);
    t.medir(dato);
    t.arco(B, A);
    await esperarAuto();
    t.superada();
  });

  it("un lado y dos ángulos: el segundo se mide en sentido horario y se marca A", async () => {
    const t = pantalla("triangulo-ala-practica");
    const { B, C, A, aB, aCext } = GEO.ala;
    t.angulo(B, 0, 1, aB);
    t.angulo(C, 180, -1, aCext);
    expect(t.fase()).toBe("punto");
    t.tocar([A[0] + 80, A[1] + 60]);
    expect(t.fase()).toBe("punto");
    t.tocar(A);
    expect(t.fase()).toBe("auto");
    await esperarAuto();
    t.superada();
  });

  it("rectángulo con un cateto y un ángulo agudo", async () => {
    const t = pantalla("rectangulo-cateto-angulo-practica");
    const { A, B, C, aC } = GEO.recCatAng;
    t.angulo(C, 180, -1, aC);
    t.perpendicular();
    t.tocar(B);
    await esperarAuto();
    t.superada();
  });

  it("isósceles con el lado desigual y el ángulo igual", async () => {
    const t = pantalla("isosceles-desigual-practica");
    const { A, C, B, aA } = GEO.isoDesigual;
    t.angulo(A, 0, 1, aA);
    t.angulo(C, 180, -1, aA);
    t.tocar(B);
    await esperarAuto();
    t.superada();
  });

  it("rectángulo con cateto e hipotenusa: halla O con la mediatriz, semicircunferencia y arco de radio b", async () => {
    const t = pantalla("rectangulo-hipotenusa-practica");
    const { O, B, C, A, datoB } = GEO.recHip;
    const [c1, c2] = par(t, B, C, 150);
    expect(t.fase()).toBe("trazo");
    t.tocar(c1);
    t.tocar(c2);
    expect(t.fase()).toBe("punto");
    // los arcos auxiliares desaparecen al marcar O
    expect(screen.getByTestId("bench-arcos-practica").querySelectorAll("path").length).toBeGreaterThan(0);
    t.tocar(O);
    expect(screen.getByTestId("bench-arcos-practica").querySelectorAll("path").length).toBe(0);
    t.medir([O, B]);
    expect(t.fase()).toBe("centro");
    t.tocar(O);
    t.arrastrar(enCirc(O, 105, 2), enCirc(O, 105, 90), enCirc(O, 105, 178));
    t.medir(datoB);
    t.arco(C, A);
    await esperarAuto();
    t.superada();
  });

  it("isósceles con el lado igual y un ángulo igual: dos arcos con la misma abertura", async () => {
    const t = pantalla("isosceles-igual-angulo-practica");
    const { C, B, A, aC, dato } = GEO.isoIgualAng;
    t.angulo(C, 180, -1, aC);
    t.medir(dato);
    t.arco(C, B);
    t.arco(B, A);
    await esperarAuto();
    t.superada();
  });

  it("equilátero con la altura: h desde N y las dos paralelas con la escuadra", async () => {
    const t = pantalla("equilatero-altura-practica");
    const { N, A, dato } = GEO.eqAltura;
    t.medir(dato);
    t.arco(N, A);
    for (let k = 1; k <= 2; k += 1) {
      expect(t.fase()).toBe("escuadra");
      for (let i = 0; i < 400 && screen.queryAllByTestId("bench-paralela-trazada").length < k; i += 1) fireEvent.keyDown(t.svg(), { key: "ArrowUp" });
      expect(screen.queryAllByTestId("bench-paralela-trazada").length).toBe(k);
    }
    expect(t.fase()).toBe("auto");
    await esperarAuto();
    t.superada();
  });
});
