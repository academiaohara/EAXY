// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LessonStepControlProvider } from "@/components/lesson/LessonStepControlContext";
import { BenchPracticeContext } from "@/components/lesson/bench/practice";
import { BENCH_STEPS } from "@/components/lesson/bench/scenes";
import { GEO } from "@/components/lesson/bench/scenes-construcciones";
import { SlideBench } from "@/components/lesson/bench/SlideBench";
import type { Pt } from "@/components/lesson/bench/geometry";
import type { BenchSceneId } from "@/lib/lesson/types";

afterEach(cleanup);

const enCirc = (c: Pt, r: number, a: number): Pt => [c[0] + r * Math.cos((a * Math.PI) / 180), c[1] - r * Math.sin((a * Math.PI) / 180)];
const ang = (v: Pt, p: Pt) => (Math.atan2(-(p[1] - v[1]), p[0] - v[0]) * 180) / Math.PI;
const notas = (n: number) => Array.from({ length: n }, (_, i) => ({ title: `Título ${i + 1}`, text: `Texto del paso ${i + 1}` }));
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
  return { onCheck, svg, tocar, arrastrar, fase, medir, angulo, arco, superada };
}

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
    t.angulo(A, 0, 1, 90);
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
    t.angulo(A, 0, 1, 90);
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

  it("rectángulo con cateto e hipotenusa: semicircunferencia y arco de radio b", async () => {
    const t = pantalla("rectangulo-hipotenusa-practica");
    const { O, B, C, A, datoB } = GEO.recHip;
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
