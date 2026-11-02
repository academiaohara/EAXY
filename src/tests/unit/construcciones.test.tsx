// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LessonStepControlProvider } from "@/components/lesson/LessonStepControlContext";
import { BenchPracticeContext } from "@/components/lesson/bench/practice";
import { BENCH_STEPS } from "@/components/lesson/bench/scenes";
import { SlideBench } from "@/components/lesson/bench/SlideBench";
import { CONSTRUCCIONES, fasesPractica, pasosAnimacion, type Construccion, type ConstruccionId, type Op, type P } from "@/components/lesson/bench/construcciones-datos";
import { notasAnimacion, notasPractica } from "@/components/lesson/bench/construcciones-notas";

afterEach(cleanup);

const ids = Object.keys(CONSTRUCCIONES) as ConstruccionId[];
const enCirc = (c: P, r: number, a: number): P => [c[0] + r * Math.cos((a * Math.PI) / 180), c[1] - r * Math.sin((a * Math.PI) / 180)];
const angDe = (v: P, p: P) => (Math.atan2(-(p[1] - v[1]), p[0] - v[0]) * 180) / Math.PI;
const dist = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]);

describe("construcciones del tema 5: animación y práctica", () => {
  it.each(ids)("%s: los pasos de la animación coinciden con las notas y se recorren", (id) => {
    const c = CONSTRUCCIONES[id] as Construccion;
    const n = pasosAnimacion(c);
    expect(BENCH_STEPS[`c-${id}`]).toBe(n);
    expect(notasAnimacion(id)).toHaveLength(n);
    expect(BENCH_STEPS[`c-${id}-practica`]).toBe(fasesPractica(c).length);
    expect(notasPractica(id)).toHaveLength(fasesPractica(c).length);
    render(
      <LessonStepControlProvider>
        <SlideBench block={{ kind: "bench", scene: `c-${id}`, notes: notasAnimacion(id) }} />
      </LessonStepControlProvider>,
    );
    for (let i = 0; i < n - 1; i += 1) fireEvent.click(screen.getByTestId("bench-siguiente"));
    expect(screen.getByTestId("bench-paso").textContent).toBe(`Paso ${n} de ${n}`);
  });

  it.each(ids)("%s: la práctica se completa haciendo lo que dice la construcción", async (id) => {
    const c = CONSTRUCCIONES[id] as Construccion;
    const onCheck = vi.fn();
    render(
      <LessonStepControlProvider>
        <BenchPracticeContext.Provider value={{ onCheck }}>
          <SlideBench block={{ kind: "bench", scene: `c-${id}-practica`, notes: notasPractica(id) }} />
        </BenchPracticeContext.Provider>
      </LessonStepControlProvider>,
    );
    const svg = () => screen.getByTestId("bench-practica");
    const tocar = (p: P) => fireEvent.pointerDown(svg(), { clientX: p[0], clientY: p[1], pointerId: 1 });
    const arrastrar = (...ps: P[]) => {
      fireEvent.pointerDown(svg(), { clientX: ps[0][0], clientY: ps[0][1], pointerId: 1 });
      for (const p of ps) fireEvent.pointerMove(svg(), { clientX: p[0], clientY: p[1], pointerId: 1 });
      fireEvent.pointerUp(svg(), { pointerId: 1 });
    };
    const tipo = () => svg().getAttribute("data-tipo");
    const pt = (n: string) => c.pts[n];
    let radio = 0;
    c.ops.forEach((o: Op, i) => {
      const donde = `${id} op ${i} (${o.k})`;
      switch (o.k) {
        case "medir":
          expect(tipo(), donde).toBe("medida");
          radio = dist(pt(o.de), pt(o.a));
          tocar(pt(o.de));
          tocar(pt(o.a));
          break;
        case "arco":
        case "circulo": {
          expect(tipo(), donde).toBe("centro");
          tocar(pt(o.c));
          expect(tipo(), donde).toBe("arco");
          if (o.k === "circulo") arrastrar(enCirc(pt(o.c), radio, -175), enCirc(pt(o.c), radio, -90), enCirc(pt(o.c), radio, 0), enCirc(pt(o.c), radio, 90), enCirc(pt(o.c), radio, 175));
          else {
            const th = angDe(pt(o.c), pt(o.hacia));
            const [a1, a2] = o.abs ?? [th + (o.ang?.[0] ?? -12), th + (o.ang?.[1] ?? 12)];
            const pasos = 6;
            arrastrar(...Array.from({ length: pasos + 1 }, (_, k) => enCirc(pt(o.c), radio, a1 - 5 + ((a2 - a1 + 10) * k) / pasos)));
          }
          break;
        }
        case "marca":
          expect(tipo(), donde).toBe("punto");
          tocar(pt(o.p));
          break;
        case "recta":
          expect(tipo(), donde).toBe("trazo");
          tocar(pt(o.a));
          tocar(pt(o.b));
          break;
        case "perp": {
          expect(tipo(), donde).toBe("perpendicular");
          const antes = screen.queryAllByTestId("bench-trazo-aux").length;
          for (let k = 0; k < 400 && screen.queryAllByTestId("bench-trazo-aux").length === antes; k += 1) fireEvent.keyDown(svg(), { key: "ArrowRight" });
          expect(screen.queryAllByTestId("bench-trazo-aux").length, donde).toBe(antes + 1);
          break;
        }
        case "angulo": {
          expect(tipo(), donde).toBe("angulo");
          const s = o.signo ?? 1;
          arrastrar(enCirc(pt(o.v), 120, o.base + s * (o.obj - 15)), enCirc(pt(o.v), 120, o.base + s * o.obj));
          break;
        }
        case "paralelas":
          o.marcas.forEach((_m, k) => {
            expect(tipo(), `${donde} #${k}`).toBe("escuadra");
            for (let j = 0; j < 500 && screen.queryAllByTestId("bench-paralela-trazada").length <= k; j += 1) fireEvent.keyDown(svg(), { key: "ArrowUp" });
            expect(screen.queryAllByTestId("bench-paralela-trazada").length, `${donde} #${k}`).toBe(k + 1);
          });
          break;
        default:
          break;
      }
    });
    expect(tipo()).toBe("auto");
    await new Promise((r) => setTimeout(r, 450));
    expect(onCheck).toHaveBeenCalledTimes(1);
    expect(onCheck).toHaveBeenCalledWith({ correct: true, snapshot: { kind: "bench_task", isCorrect: true } });
  });
});
