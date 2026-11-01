// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { useEffect } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LessonStepControlProvider, useLessonStepControl, type LessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { BenchPracticeContext } from "@/components/lesson/bench/practice";
import { BENCH_STEPS } from "@/components/lesson/bench/scenes";
import { SlideBench } from "@/components/lesson/bench/SlideBench";
import { SlideBlockView } from "@/components/lesson/slide/SlideBlocks";
import type { BenchSceneId } from "@/lib/lesson/types";
import { rotarPunto, type Pt } from "@/components/lesson/bench/geometry";
import { POLIGONOS_GEOM, POLIGONOS_GEOM_2, PN_A, PN_B, PN_C } from "@/components/lesson/bench/scenes-poligonos";
import { TANGENCIAS_GEOM } from "@/components/lesson/bench/scenes-tangencias";
import { prepararEscuadra } from "@/components/lesson/bench/scenes-compas";
import { TRAZADOS_GEOM } from "@/components/lesson/bench/practicas-trazados";
import { interseccionCirculos } from "@/components/lesson/bench/geometry";

afterEach(cleanup);

const notas = (n: number) => Array.from({ length: n }, (_, i) => ({ title: `Título ${i + 1}`, text: `Texto del paso ${i + 1}`, fact: i === 0 ? "Dato" : undefined }));
const todas = Object.keys(BENCH_STEPS) as BenchSceneId[];
/** Escenas donde los pasos se recorren con «Anterior / Siguiente» (las de práctica avanzan al hacer la acción). */
const porAccion = (e: BenchSceneId) => e.endsWith("-practica");
const escenas = todas.filter((e) => !porAccion(e));

/** Lee el control y el centro del pie que la escena registra en la lección (no debe registrar ninguno). */
function Sonda({ onControl }: { onControl: (control: LessonStepControl | null) => void }) {
  const { control, footerCenter } = useLessonStepControl();
  useEffect(() => onControl(control), [control, onControl]);
  return <div data-testid="pie-centro">{footerCenter}</div>;
}

function montar(scene: BenchSceneId, params?: { a?: number; b?: number }, practice = true) {
  const out: { control: LessonStepControl | null } = { control: null };
  const onCheck = vi.fn();
  render(
    <LessonStepControlProvider>
      <BenchPracticeContext.Provider value={practice ? { onCheck } : null}>
        <SlideBench block={{ kind: "bench", scene, notes: notas(BENCH_STEPS[scene]), params }} />
      </BenchPracticeContext.Provider>
      <Sonda onControl={(c) => { out.control = c; }} />
    </LessonStepControlProvider>,
  );
  const siguiente = (n = 1) => {
    for (let i = 0; i < n; i += 1) fireEvent.click(screen.getByTestId("bench-siguiente"));
  };
  return { out, onCheck, siguiente };
}

const enCirc = (c: Pt, r: number, a: number): Pt => [c[0] + r * Math.cos((a * Math.PI) / 180), c[1] - r * Math.sin((a * Math.PI) / 180)];
const ang = (v: Pt, p: Pt) => (Math.atan2(-(p[1] - v[1]), p[0] - v[0]) * 180) / Math.PI;
const d = (a: Pt, b: Pt) => Math.hypot(a[0] - b[0], a[1] - b[1]);

/** Espera a que la regla acabe de trazar sola los últimos lados y el ejercicio se dé por superado. */
const esperarAuto = () =>
  act(async () => {
    await new Promise((r) => setTimeout(r, 450));
  });

/** Práctica guiada: no hay botón «Comprobar»; al completar la construcción se da por superada sola. */
function pantalla(scene: BenchSceneId, params?: { a?: number; b?: number }) {
  const m = montar(scene, params);
  const svg = () => screen.getByTestId("bench-practica");
  const tocar = (p: Pt) => fireEvent.pointerDown(svg(), { clientX: p[0], clientY: p[1], pointerId: 1 });
  /** Arrastra la mina pasando por varios puntos y suelta. */
  const arrastrar = (...ps: Pt[]) => {
    fireEvent.pointerDown(svg(), { clientX: ps[0][0], clientY: ps[0][1], pointerId: 1 });
    for (const p of ps) fireEvent.pointerMove(svg(), { clientX: p[0], clientY: p[1], pointerId: 1 });
    fireEvent.pointerUp(svg(), { pointerId: 1 });
  };
  const fase = () => svg().getAttribute("data-tipo");
  const fijar = () => fireEvent.click(screen.getByTestId("bench-fijar"));
  const aviso = () => screen.queryByTestId("bench-aviso")?.textContent ?? null;
  const superada = () => {
    expect(m.onCheck).toHaveBeenCalledTimes(1);
    expect(m.onCheck).toHaveBeenCalledWith({ correct: true, snapshot: { kind: "bench_task", isCorrect: true } });
    expect(screen.getByTestId("bench-resultado").getAttribute("data-ok")).toBe("true");
  };
  const sinSuperar = () => expect(m.onCheck).not.toHaveBeenCalled();
  return { ...m, svg, tocar, arrastrar, fase, fijar, aviso, superada, sinSuperar };
}

describe("mesa de dibujo · pasos dentro de la diapositiva", () => {
  it.each(escenas)("%s: recorre todos los pasos y enseña el texto de cada uno", (scene) => {
    const { siguiente } = montar(scene);
    for (let i = 0; i < BENCH_STEPS[scene]; i += 1) {
      expect(screen.getByTestId("bench-paso").textContent).toBe(`Paso ${i + 1} de ${BENCH_STEPS[scene]}`);
      expect(screen.getByTestId("bench-titulo").textContent).toBe(`Título ${i + 1}`);
      if (i < BENCH_STEPS[scene] - 1) siguiente();
    }
    expect((screen.getByTestId("bench-siguiente") as HTMLButtonElement).disabled).toBe(true);
    for (let i = BENCH_STEPS[scene] - 1; i > 0; i -= 1) fireEvent.click(screen.getByTestId("bench-anterior"));
    expect((screen.getByTestId("bench-anterior") as HTMLButtonElement).disabled).toBe(true);
  });

  it.each(escenas)("%s: los botones de pasos van siempre en el mismo contenedor, al final", (scene) => {
    const { siguiente } = montar(scene);
    const nav = screen.getByTestId("bench-nav");
    for (let i = 0; i < BENCH_STEPS[scene] - 1; i += 1) {
      expect(screen.getByTestId("bench-nav")).toBe(nav);
      siguiente();
    }
  });

  it("catálogo: cada paso destaca un solo instrumento y no hay controles aparte de los pasos", () => {
    const { siguiente } = montar("instrumentos-catalogo", undefined, false);
    for (let i = 0; i < 6; i += 1) {
      expect(document.querySelectorAll('[data-foco="true"]')).toHaveLength(1);
      if (i < 5) siguiente();
    }
    expect(document.querySelectorAll("input")).toHaveLength(0);
    expect(document.querySelectorAll("button")).toHaveLength(2);
  });

  it.each(todas)("%s: ninguna escena registra un botón «Comprobar» en el pie", (scene) => {
    const { out } = montar(scene);
    expect(out.control).toBeNull();
    expect(screen.queryByTestId("bench-comprobar")).toBeNull();
  });

  it("un ejercicio ya resuelto (intento guardado) se muestra resuelto", () => {
    const onCheck = vi.fn();
    render(
      <LessonStepControlProvider>
        <BenchPracticeContext.Provider value={{ onCheck, saved: { kind: "bench_task", isCorrect: true } }}>
          <SlideBench block={{ kind: "bench", scene: "paralelas-escuadra-cartabon", notes: notas(3), params: { a: 0, b: 70 } }} />
        </BenchPracticeContext.Provider>
      </LessonStepControlProvider>,
    );
    expect(screen.getByTestId("bench-trazo")).toBeTruthy();
    expect(screen.getByTestId("bench-paso").textContent).toBe("Paso 3 de 3");
  });
});

describe("explicaciones animadas y datos de las escenas", () => {
  const alfa = 55;
  const th = 60;

  it("mediatriz: los arcos aparecen por pasos y Q equidista de A y B", () => {
    const { siguiente } = montar("mediatriz-compas");
    expect(screen.getByTestId("bench-compas")).toBeTruthy();
    expect(screen.queryByTestId("bench-arcos-b")).toBeNull();
    siguiente();
    expect(screen.getByTestId("bench-arcos-b")).toBeTruthy();
    expect(screen.queryByTestId("bench-recta")).toBeNull();
    siguiente();
    expect(screen.getByTestId("bench-recta")).toBeTruthy();
    expect(screen.queryByTestId("bench-compas")).toBeNull();
    siguiente();
    const q = screen.getByTestId("bench-q");
    for (const y of [60, 150, 300]) {
      fireEvent.pointerDown(q, { clientX: 310, clientY: 150, pointerId: 1 });
      fireEvent.pointerMove(q, { clientX: 310, clientY: y, pointerId: 1 });
      fireEvent.pointerUp(q, { pointerId: 1 });
      const [qa, qb] = (screen.getByTestId("bench-dists").textContent ?? "").match(/[\d,]+(?= mm)/g) ?? [];
      expect(qa).toBe(qb);
    }
  });

  it("bisectriz: la bisectriz solo aparece al final y el compás se oculta", () => {
    const { siguiente } = montar("bisectriz-compas", { a: 110 });
    for (let i = 0; i < 3; i += 1) {
      expect(screen.queryByTestId("bench-bisectriz-recta")).toBeNull();
      siguiente();
    }
    expect(screen.getByTestId("bench-bisectriz-recta")).toBeTruthy();
    expect(screen.queryByTestId("bench-compas")).toBeNull();
  });

  it("explicación: la medida PQ se toma con el compás y el ángulo trasladado aparece al final", () => {
    const { siguiente } = montar("trasladar-angulo-compas", { a: alfa });
    expect(screen.queryByTestId("bench-arco-v2")).toBeNull();
    siguiente();
    expect(screen.getByTestId("bench-arco-v2")).toBeTruthy();
    siguiente();
    expect(screen.getByTestId("bench-cuerda")).toBeTruthy();
    expect(screen.getByTestId("bench-compas")).toBeTruthy();
    siguiente();
    expect(screen.getByTestId("bench-arco-q2")).toBeTruthy();
    expect(screen.queryByTestId("bench-cuerda")).toBeNull();
    siguiente();
    expect(screen.getByTestId("bench-trasladado")).toBeTruthy();
    expect(screen.queryByTestId("bench-compas")).toBeNull();
  });

  it("explicación: la medida del vector, los dos arcos y la figura trasladada aparecen por pasos", () => {
    const { siguiente } = montar("traslacion-compas");
    expect(screen.queryByTestId("bench-compas")).toBeNull();
    expect(screen.queryByTestId("bench-imagen")).toBeNull();
    siguiente();
    expect(screen.getByTestId("bench-medida-v")).toBeTruthy();
    expect(screen.getByTestId("bench-compas")).toBeTruthy();
    siguiente();
    expect(screen.getByTestId("bench-arco-b")).toBeTruthy();
    siguiente();
    expect(screen.getByTestId("bench-arco-a2")).toBeTruthy();
    expect(screen.getByTestId("bench-arco-b")).toBeTruthy();
    siguiente();
    expect(screen.getByTestId("bench-imagen")).toBeTruthy();
    expect(screen.queryByTestId("bench-compas")).toBeNull();
  });

  it("explicación: el transportador, el arco de A y los de B y C aparecen por pasos", () => {
    const { siguiente } = montar("giro-compas", { a: th });
    expect(screen.getByTestId("bench-sentido")).toBeTruthy();
    expect(screen.queryByTestId("bench-compas")).toBeNull();
    siguiente();
    expect(screen.getByTestId("bench-transportador-giro")).toBeTruthy();
    siguiente();
    expect(screen.getByTestId("bench-arco-giro-a")).toBeTruthy();
    expect(screen.getByTestId("bench-compas")).toBeTruthy();
    expect(screen.queryByTestId("bench-transportador-giro")).toBeNull();
    siguiente();
    expect(screen.getByTestId("bench-arcos-giro-bc")).toBeTruthy();
    siguiente();
    expect(screen.getByTestId("bench-girada")).toBeTruthy();
  });

  it("explicación: los puntos del eje, los dos arcos y la figura simétrica aparecen por pasos", () => {
    const { siguiente } = montar("simetria-compas");
    expect(screen.queryByTestId("bench-compas")).toBeNull();
    siguiente(2);
    expect(screen.getByTestId("bench-arco-p")).toBeTruthy();
    expect(screen.getByTestId("bench-compas")).toBeTruthy();
    siguiente();
    expect(screen.getByTestId("bench-arco-q")).toBeTruthy();
    siguiente();
    expect(screen.getByTestId("bench-imagen")).toBeTruthy();
    expect(screen.queryByTestId("bench-compas")).toBeNull();
  });

  it("explicación: las rectas desde O, la medida OA, el arco y la figura ampliada aparecen por pasos", () => {
    const { siguiente } = montar("homotecia-compas");
    expect(screen.queryByTestId("bench-rayos-homotecia")).toBeNull();
    siguiente();
    expect(screen.getByTestId("bench-rayos-homotecia")).toBeTruthy();
    siguiente();
    expect(screen.getByTestId("bench-medida-oa")).toBeTruthy();
    expect(screen.getByTestId("bench-compas")).toBeTruthy();
    siguiente();
    expect(screen.getByTestId("bench-arco-homotecia")).toBeTruthy();
    expect(screen.queryByTestId("bench-medida-oa")).toBeNull();
    siguiente();
    expect(screen.getByTestId("bench-homotetica")).toBeTruthy();
    expect(screen.queryByTestId("bench-compas")).toBeNull();
  });

  it("explicación: marcas, unión con B, paralelas y tres partes iguales aparecen por pasos", () => {
    const { siguiente } = montar("thales-dividir");
    expect(screen.queryByTestId("bench-compas")).toBeNull();
    siguiente();
    expect(screen.getByTestId("bench-arco-1")).toBeTruthy();
    expect(screen.getByTestId("bench-compas")).toBeTruthy();
    siguiente(2);
    expect(screen.getByTestId("bench-arco-3")).toBeTruthy();
    siguiente(2);
    expect(screen.getByTestId("bench-paralelas-thales")).toBeTruthy();
    expect(screen.queryByTestId("bench-compas")).toBeNull();
    siguiente();
    expect(screen.getByTestId("bench-tercios")).toBeTruthy();
  });

  it("explicación: punto medio, semicircunferencia, altura y relación h² = a·b por pasos", () => {
    const { siguiente } = montar("media-compas");
    siguiente();
    expect(screen.getByTestId("bench-compas")).toBeTruthy();
    siguiente(2);
    expect(screen.getByTestId("bench-altura")).toBeTruthy();
    siguiente();
    expect(screen.getByTestId("bench-h2")).toBeTruthy();
  });

  it("explicación: hipotenusa, arco desde C, arco desde A y resultado por pasos", () => {
    const { siguiente } = montar("aurea-compas");
    siguiente(2);
    expect(screen.getByTestId("bench-arco-cb")).toBeTruthy();
    siguiente();
    expect(screen.getByTestId("bench-arco-ad")).toBeTruthy();
    siguiente();
    expect(screen.getByTestId("bench-aurea")).toBeTruthy();
    expect(screen.queryByTestId("bench-compas")).toBeNull();
  });

  it("explicación de equivalencia: la paralela, el vértice que se desliza y el rectángulo por pasos", () => {
    const { siguiente } = montar("equivalencia-triangulos");
    expect(screen.queryByTestId("bench-altura-eq")).toBeNull();
    siguiente();
    expect(screen.getByTestId("bench-altura-eq")).toBeTruthy();
    siguiente(2);
    expect(screen.getByTestId("bench-rectangulo-eq")).toBeTruthy();
  });

  it("explicación de cuadratura: prolongación, semicircunferencia, lado y cuadrado por pasos", () => {
    const { siguiente } = montar("cuadratura-compas");
    siguiente();
    expect(screen.getByTestId("bench-arco-h")).toBeTruthy();
    siguiente(2);
    expect(screen.getByTestId("bench-lado-cuadrado")).toBeTruthy();
    siguiente();
    expect(screen.getByTestId("bench-cuadrado-final")).toBeTruthy();
  });

  it("explicación: ángulos, razón de lados, rejilla de áreas y escala por pasos", () => {
    const { siguiente } = montar("semejanza-razon");
    expect(screen.getByTestId("bench-angulos-iguales")).toBeTruthy();
    siguiente();
    expect(screen.getByTestId("bench-lados-razon").textContent).toContain("k = A′B′ / AB = 2");
    siguiente();
    expect(screen.getByTestId("bench-rejilla-areas")).toBeTruthy();
    expect(screen.getByTestId("bench-areas-razon").textContent).toContain("24 = 4 · 6");
    siguiente();
    expect(screen.getByTestId("bench-escala").textContent).toContain("1:50");
  });

  it("la altura CH de la media proporcional cumple CH² = AH · HB", () => {
    expect(d([230, 300], [230, 180]) ** 2).toBeCloseTo(90 * 160, 6);
    expect(d([265, 300], [230, 180])).toBeCloseTo(125, 6);
  });

  it("la sección áurea: AE/AB es el inverso del número áureo", () => {
    const A: Pt = [110, 300];
    const C: Pt = [410, 150];
    const LAC = d(A, C);
    const D: Pt = [C[0] + ((A[0] - C[0]) * 150) / LAC, C[1] + ((A[1] - C[1]) * 150) / LAC];
    expect(d(A, D) / 300).toBeCloseTo(1 / ((1 + Math.sqrt(5)) / 2), 3);
  });

  it("la cuadratura: el lado del cuadrado es la media proporcional de la base y la altura", () => {
    const E: Pt = [300, 300 - Math.sqrt(135 * 135 - 45 * 45)];
    expect(d([300, 300], E) ** 2).toBeCloseTo(180 * 90, 6);
  });
});

/* ───────────── Tema 1: instrumentos (la construcción se da por hecha al llegar a la posición correcta) ───────────── */

describe("práctica guiada · paralelas, perpendicular y transportador", () => {
  it("paralelas: soltando la escuadra con el borde sobre P se supera el ejercicio y se dibuja el trazo", () => {
    for (const a of [-10, 0, 12, 30]) {
      const t = montar("paralelas-escuadra-cartabon", { a, b: 70 });
      t.siguiente(2);
      const esc = screen.getByTestId("bench-escuadra");
      for (let i = 0; i < 49; i += 1) fireEvent.keyDown(esc, { key: "ArrowUp" }); // 98 mm ≈ 70·√2
      expect(t.onCheck).toHaveBeenCalledWith({ correct: true, snapshot: { kind: "bench_task", isCorrect: true } });
      expect(screen.getByTestId("bench-trazo")).toBeTruthy();
      expect(screen.getByTestId("bench-resultado").getAttribute("data-ok")).toBe("true");
      cleanup();
    }
  });

  it("paralelas: arrastrando con el puntero la escuadra se desplaza, tiene tope y solo se da por hecha al soltar sobre P", () => {
    const t = montar("paralelas-escuadra-cartabon", { a: 0, b: 70 });
    t.siguiente(2);
    const esc = screen.getByTestId("bench-escuadra");
    fireEvent.pointerDown(esc, { clientX: 100, clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(esc, { clientX: 60, clientY: 140, pointerId: 1 }); // ≈ 57 mm: todavía lejos
    fireEvent.pointerUp(esc, { pointerId: 1 });
    expect(esc.getAttribute("aria-valuenow")).toBe("57");
    expect(t.onCheck).not.toHaveBeenCalled();
    fireEvent.pointerDown(esc, { clientX: 100, clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(esc, { clientX: -900, clientY: 900, pointerId: 1 });
    expect(esc.getAttribute("aria-valuenow")).toBe("125");
    fireEvent.pointerMove(esc, { clientX: 70, clientY: 130, pointerId: 1 }); // 57 + 42 ≈ 99 mm
    fireEvent.pointerUp(esc, { pointerId: 1 });
    expect(t.onCheck).toHaveBeenCalledTimes(1);
  });

  it("paralelas: antes del último paso la escuadra no se mueve", () => {
    montar("paralelas-escuadra-cartabon");
    const esc = screen.getByTestId("bench-escuadra");
    fireEvent.keyDown(esc, { key: "ArrowUp" });
    expect(esc.getAttribute("aria-valuenow")).toBe("0");
  });

  it("perpendicular: soltar la escuadra con el cateto sobre P supera el ejercicio; quedarse corto, no", () => {
    const t = montar("perpendicular-escuadra-cartabon", { a: 0, b: 80 });
    t.siguiente(2);
    const esc = screen.getByTestId("bench-escuadra");
    fireEvent.pointerDown(esc, { clientX: 100, clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(esc, { clientX: 150, clientY: 100, pointerId: 1 });
    fireEvent.pointerUp(esc, { pointerId: 1 });
    expect(t.onCheck).not.toHaveBeenCalled();
    fireEvent.pointerDown(esc, { clientX: 100, clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(esc, { clientX: 210, clientY: 100, pointerId: 1 }); // 50 + 110: P está a 160 mm
    expect(esc.getAttribute("aria-valuenow")).toBe("160");
    fireEvent.pointerUp(esc, { pointerId: 1 });
    expect(t.onCheck).toHaveBeenCalledWith({ correct: true, snapshot: { kind: "bench_task", isCorrect: true } });
    expect(screen.getByTestId("bench-trazo")).toBeTruthy();
  });

  it("perpendicular: tiene tope", () => {
    const t = montar("perpendicular-escuadra-cartabon", { a: 0 });
    t.siguiente(2);
    const esc = screen.getByTestId("bench-escuadra");
    fireEvent.pointerDown(esc, { clientX: 0, clientY: 0, pointerId: 1 });
    fireEvent.pointerMove(esc, { clientX: 900, clientY: 0, pointerId: 1 });
    expect(esc.getAttribute("aria-valuenow")).toBe("260");
    fireEvent.pointerMove(esc, { clientX: -900, clientY: 0, pointerId: 1 });
    expect(esc.getAttribute("aria-valuenow")).toBe("0");
  });

  it("transportador: en el paso de medir hay lectura; en el ejercicio, no (no se regala la respuesta)", () => {
    const t = montar("transportador-medir", { a: 37, b: 130 });
    expect(screen.queryByTestId("bench-lectura")).toBeNull();
    t.siguiente();
    expect(screen.getByTestId("bench-lectura").textContent).toBe("37°");
    t.siguiente();
    expect(screen.queryByTestId("bench-lectura")).toBeNull();
  });

  it("transportador: soltar sobre 130° supera el ejercicio y soltar en otro valor avisa y deja seguir", () => {
    const V = [240, 262];
    const punto = (deg: number) => [V[0] + 100 * Math.cos((deg * Math.PI) / 180), V[1] - 100 * Math.sin((deg * Math.PI) / 180)];
    const arrastrar = (deg: number) => {
      const lado = screen.getByTestId("bench-lado");
      const p = punto(deg);
      fireEvent.pointerDown(lado, { clientX: p[0], clientY: p[1], pointerId: 1 });
      fireEvent.pointerMove(lado, { clientX: p[0], clientY: p[1], pointerId: 1 });
      fireEvent.pointerUp(lado, { pointerId: 1 });
    };
    const t = montar("transportador-medir", { a: 37, b: 130 });
    t.siguiente(2);
    arrastrar(128);
    expect(t.onCheck).not.toHaveBeenCalled();
    expect(screen.getByTestId("bench-aviso").textContent).toContain("130°");
    arrastrar(130);
    expect(screen.getByTestId("bench-lado").getAttribute("aria-valuenow")).toBe("130");
    expect(t.onCheck).toHaveBeenCalledWith({ correct: true, snapshot: { kind: "bench_task", isCorrect: true } });
  });

  it("transportador: el teclado ajusta, el ángulo se limita a 0°–180° y llegar a 130° supera el ejercicio", () => {
    const t = montar("transportador-medir");
    t.siguiente();
    const lado = screen.getByTestId("bench-lado");
    fireEvent.keyDown(lado, { key: "ArrowLeft" });
    expect(screen.getByTestId("bench-lectura").textContent).toBe("38°");
    fireEvent.keyDown(lado, { key: "ArrowRight", shiftKey: true });
    expect(screen.getByTestId("bench-lectura").textContent).toBe("28°");
    fireEvent.pointerDown(lado, { clientX: 240, clientY: 400, pointerId: 1 });
    fireEvent.pointerMove(lado, { clientX: 400, clientY: 400, pointerId: 1 });
    expect(Number(lado.getAttribute("aria-valuenow"))).toBe(0);
    t.siguiente();
    const l2 = screen.getByTestId("bench-lado"); // el ejercicio parte de 60° (objetivo mayor de 90°)
    for (let i = 0; i < 7; i += 1) fireEvent.keyDown(l2, { key: "ArrowLeft", shiftKey: true }); // 60 → 130
    expect(t.onCheck).toHaveBeenCalledWith({ correct: true, snapshot: { kind: "bench_task", isCorrect: true } });
  });
});

describe("práctica guiada · mediatriz", () => {
  const A: Pt = [210, 190];
  const B: Pt = [410, 190];

  /** Recorre toda la construcción con la abertura `r`; deja la regla pendiente. */
  function construir(r: number) {
    const t = pantalla("mediatriz-practica");
    expect(t.fase()).toBe("centro");
    t.tocar(A);
    expect(t.fase()).toBe("abertura");
    t.arrastrar(enCirc(A, r, 35));
    t.fijar();
    expect(t.fase()).toBe("arco");
    const th = Math.max((Math.acos(Math.min(1, 200 / (2 * r))) * 180) / Math.PI, 20) + 8;
    t.arrastrar(enCirc(A, r, th), enCirc(A, r, -th));
    expect(t.fase()).toBe("centro");
    t.tocar(B);
    expect(t.fase()).toBe("arco");
    t.arrastrar(enCirc(B, r, 180 + th), enCirc(B, r, 180 - th));
    expect(t.fase()).toBe("regla");
    return t;
  }

  it("marcando los dos cortes de los arcos, la regla traza la mediatriz y el ejercicio se supera solo", () => {
    const t = construir(130);
    expect(t.out.control).toBeNull();
    const h = Math.sqrt(130 * 130 - 100 * 100);
    t.tocar([310 + 4, 190 - h - 3]); // se ajusta al corte aunque no sea exacto
    expect(t.fase()).toBe("regla");
    t.sinSuperar();
    t.tocar([310 - 3, 190 + h + 5]);
    expect(t.fase()).toBe("hecha");
    expect(screen.getByTestId("bench-regla-trazo")).toBeTruthy();
    t.superada();
  });

  it("la regla solo acepta puntos de la construcción: tocar otro sitio avisa y no se registra", () => {
    const t = construir(130);
    t.tocar([100, 300]);
    expect(t.aviso()).toContain("puntos de la construcción");
    expect(screen.queryAllByTestId("bench-clic")).toHaveLength(0);
    expect(t.fase()).toBe("regla");
    t.sinSuperar();
  });

  it("no se puede tocar dos veces el mismo punto para pasar la regla", () => {
    const t = construir(130);
    const h = Math.sqrt(130 * 130 - 100 * 100);
    t.tocar([310, 190 - h]);
    t.tocar([310, 190 - h]);
    expect(t.aviso()).toContain("ya lo has usado");
    expect(screen.queryAllByTestId("bench-clic")).toHaveLength(1);
  });

  it("con una abertura menor que la mitad se rechaza al fijarla y se puede corregir", () => {
    const t = pantalla("mediatriz-practica");
    t.tocar(A);
    t.arrastrar(enCirc(A, 70, 35));
    t.fijar();
    expect(t.fase()).toBe("abertura");
    expect(t.aviso()).toContain("mitad de AB");
    for (let i = 0; i < 3; i += 1) fireEvent.keyDown(t.svg(), { key: "ArrowRight", shiftKey: true }); // 70 + 36 = 106
    t.fijar();
    expect(t.fase()).toBe("arco");
    expect(t.aviso()).toBeNull();
  });

  it("avanza solo al hacer cada acción: punta, abertura, arco, otro extremo, arco, regla", () => {
    const t = pantalla("mediatriz-practica");
    expect(screen.getByTestId("bench-paso").textContent).toBe("Paso 1 de 6");
    t.tocar(A);
    expect(screen.getByTestId("bench-paso").textContent).toBe("Paso 2 de 6");
    expect(screen.getByTestId("bench-compas")).toBeTruthy();
    t.arrastrar(enCirc(A, 130, 35));
    t.fijar();
    expect(screen.getByTestId("bench-paso").textContent).toBe("Paso 3 de 6");
  });

  it("tocar fuera de los extremos no clava el compás y avisa", () => {
    const t = pantalla("mediatriz-practica");
    t.tocar([100, 300]);
    expect(t.fase()).toBe("centro");
    expect(t.aviso()).toContain("punta seca");
    expect(screen.queryByTestId("bench-compas")).toBeNull();
  });

  it("el primer arco no se da por bueno hasta cubrir la parte de arriba y la de abajo", () => {
    const t = pantalla("mediatriz-practica");
    t.tocar(A);
    t.arrastrar(enCirc(A, 130, 35));
    t.fijar();
    t.arrastrar(enCirc(A, 130, 35), enCirc(A, 130, 50)); // solo por encima
    expect(t.fase()).toBe("arco");
    t.arrastrar(enCirc(A, 130, 35), enCirc(A, 130, -60), enCirc(A, 130, 60));
    expect(t.fase()).toBe("centro");
  });

  it("solo se puede clavar la punta en el otro extremo", () => {
    const t = pantalla("mediatriz-practica");
    t.tocar(B);
    t.arrastrar(enCirc(B, 130, 180 + 35));
    t.fijar();
    t.arrastrar(enCirc(B, 130, 180 + 60), enCirc(B, 130, 180 - 60));
    expect(t.fase()).toBe("centro");
    t.tocar(B); // el mismo extremo: no vale
    expect(t.fase()).toBe("centro");
    t.tocar(A);
    expect(t.fase()).toBe("arco");
  });

  it("«Deshacer» vuelve a la fase anterior y no hay botones Anterior / Siguiente", () => {
    const t = pantalla("mediatriz-practica");
    expect((screen.getByTestId("bench-deshacer") as HTMLButtonElement).disabled).toBe(true);
    t.tocar(A);
    expect((screen.getByTestId("bench-deshacer") as HTMLButtonElement).disabled).toBe(false);
    fireEvent.click(screen.getByTestId("bench-deshacer"));
    expect(t.fase()).toBe("centro");
    expect(screen.queryByTestId("bench-compas")).toBeNull();
    expect(screen.queryByTestId("bench-siguiente")).toBeNull();
    expect(screen.queryByTestId("bench-anterior")).toBeNull();
  });
});

describe("práctica guiada · bisectriz", () => {
  const V: Pt = [170, 315];
  const alfa = 70;
  const signo = (c: Pt, otro: Pt, r: number) => {
    const base = ang(c, otro);
    return d(V, enCirc(c, r, base + 40)) > d(V, enCirc(c, r, base - 40)) ? 1 : -1;
  };

  /** Hace todo salvo el paso de la regla, con aberturas `r0` (desde V) y `r2` (desde P y Q). */
  function construir(r0: number, r2: number) {
    const t = pantalla("bisectriz-practica", { a: alfa });
    t.tocar(V);
    expect(t.fase()).toBe("abertura");
    t.arrastrar(enCirc(V, r0, 25));
    t.fijar();
    t.arrastrar(enCirc(V, r0, 25), enCirc(V, r0, alfa + 8), enCirc(V, r0, -8));
    expect(t.fase()).toBe("centro");
    const P = enCirc(V, r0, 0);
    const Q = enCirc(V, r0, alfa);
    t.tocar(Q);
    expect(t.fase()).toBe("abertura");
    t.arrastrar(enCirc(Q, r2, 60));
    t.fijar();
    const cu = d(P, Q);
    const th = (Math.acos(Math.min(1, cu / (2 * r2))) * 180) / Math.PI;
    const sQ = signo(Q, P, r2);
    const baseQ = ang(Q, P);
    t.arrastrar(enCirc(Q, r2, baseQ + sQ * 40), enCirc(Q, r2, baseQ + sQ * (th + 10)), enCirc(Q, r2, baseQ + sQ * (th - 10)));
    expect(t.fase()).toBe("centro");
    t.tocar(P);
    expect(t.fase()).toBe("arco");
    const sP = signo(P, Q, r2);
    const baseP = ang(P, Q);
    t.arrastrar(enCirc(P, r2, baseP + sP * 40), enCirc(P, r2, baseP + sP * (th + 10)), enCirc(P, r2, baseP + sP * (th - 10)));
    expect(t.fase()).toBe("regla");
    const M: Pt = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
    const T = enCirc(M, Math.sqrt(r2 * r2 - (cu / 2) ** 2), alfa / 2);
    return { t, T };
  }

  it("recorre los nueve pasos y marcar el vértice y el corte T supera el ejercicio solo", () => {
    const { t, T } = construir(100, 90);
    expect(screen.getByTestId("bench-paso").textContent).toBe("Paso 9 de 9");
    t.tocar([V[0] + 3, V[1] - 2]);
    t.sinSuperar();
    t.tocar([T[0] + 4, T[1] - 3]);
    t.superada();
  });

  it("la regla solo admite V y T: tocar P o Q avisa y no se registra", () => {
    const { t } = construir(100, 90);
    t.tocar(enCirc(V, 100, 0)); // P
    expect(t.aviso()).toContain("puntos de la construcción");
    expect(screen.queryAllByTestId("bench-clic")).toHaveLength(0);
  });

  it("una segunda abertura insuficiente (menor que la mitad de PQ) se rechaza al fijarla", () => {
    const t = pantalla("bisectriz-practica", { a: alfa });
    t.tocar(V);
    t.arrastrar(enCirc(V, 100, 25));
    t.fijar();
    t.arrastrar(enCirc(V, 100, 25), enCirc(V, 100, alfa + 8), enCirc(V, 100, -8));
    t.tocar(enCirc(V, 100, alfa));
    t.arrastrar(enCirc(enCirc(V, 100, alfa), 40, 60)); // 40 < PQ/2 ≈ 57
    t.fijar();
    expect(t.fase()).toBe("abertura");
    expect(t.aviso()).toContain("mitad de PQ");
  });

  it("los puntos P y Q solo aparecen cuando el primer arco los marca", () => {
    const t = pantalla("bisectriz-practica", { a: alfa });
    t.tocar(V);
    expect(screen.queryByText("P")).toBeNull();
    t.fijar();
    t.arrastrar(enCirc(V, 90, 25), enCirc(V, 90, alfa + 8), enCirc(V, 90, -8));
    expect(screen.getByText("P")).toBeTruthy();
    expect(screen.getByText("Q")).toBeTruthy();
  });
});

describe("práctica guiada · trasladar un ángulo con compás", () => {
  const V1: Pt = [110, 270];
  const V2: Pt = [380, 270];
  const alfa = 55;
  const r0 = 90;
  const P = enCirc(V1, r0, 0);
  const Q = enCirc(V1, r0, alfa);
  const P2 = enCirc(V2, r0, 0);
  const Q2 = enCirc(V2, r0, alfa);
  const cuerda = d(P, Q);

  function hasta(fin: "medida" | "centro3" | "regla") {
    const t = pantalla("trasladar-practica", { a: alfa });
    t.tocar(V1);
    t.arrastrar(enCirc(V1, r0, 25));
    t.fijar();
    t.arrastrar(enCirc(V1, r0, 25), enCirc(V1, r0, alfa + 8), enCirc(V1, r0, -8));
    t.tocar(V2);
    t.arrastrar(enCirc(V2, r0, 25), enCirc(V2, r0, alfa + 8), enCirc(V2, r0, -8));
    expect(t.fase()).toBe("medida");
    if (fin === "medida") return t;
    t.tocar(P);
    t.tocar(Q);
    if (fin === "centro3") return t;
    t.tocar(P2);
    const base = ang(P2, Q2);
    t.arrastrar(enCirc(P2, cuerda, base - 25), enCirc(P2, cuerda, base + 10));
    expect(t.fase()).toBe("regla");
    return t;
  }

  it("la regla por V′ y Q′ supera el ejercicio solo; por otros puntos, avisa", () => {
    const t = hasta("regla");
    t.tocar(P2);
    expect(t.aviso()).toContain("puntos de la construcción");
    t.sinSuperar();
    t.tocar([V2[0] + 4, V2[1] - 3]);
    t.tocar([Q2[0] - 5, Q2[1] + 4]);
    t.superada();
  });

  it("la medida exige tocar dos puntos distintos, P y Q, y fija la abertura", () => {
    const t = hasta("medida");
    t.tocar([300, 100]);
    expect(t.fase()).toBe("medida");
    expect(t.aviso()).not.toBeNull();
    t.tocar(P);
    t.tocar(P); // el mismo punto otra vez: no vale
    expect(t.fase()).toBe("medida");
    t.tocar(Q);
    expect(t.fase()).toBe("centro");
    expect(screen.getAllByTestId("bench-medida")).toHaveLength(2);
  });

  it("la punta del tercer arco solo puede clavarse en P′", () => {
    const t = hasta("centro3");
    t.tocar(V2);
    expect(t.fase()).toBe("centro");
    t.tocar(P2);
    expect(t.fase()).toBe("arco");
  });

  it("el corte Q′ no se da por hecho hasta cubrir su dirección y «Deshacer» desde la medida vuelve al arco anterior", () => {
    const t = hasta("centro3");
    t.tocar(P2);
    const base = ang(P2, Q2);
    t.arrastrar(enCirc(P2, cuerda, base - 25), enCirc(P2, cuerda, base - 15));
    expect(t.fase()).toBe("arco");
    cleanup();
    const u = hasta("medida");
    fireEvent.click(screen.getByTestId("bench-deshacer"));
    expect(u.fase()).toBe("arco");
  });
});

/* ───────────── Tema 5: cada transformación es un único recorrido guiado ───────────── */

describe("transformaciones · recorrido seguido, vértice a vértice y unión de los puntos", () => {
  /** La regla une sola A′B′, B′C′ y C′A′; no hay que tocar nada y el ejercicio acaba al terminar. */
  const unir = async (t: ReturnType<typeof pantalla>) => {
    expect(t.fase()).toBe("auto");
    t.sinSuperar();
    t.tocar([300, 100]); // tocar mientras la regla traza no hace nada
    expect(t.aviso()).toBeNull();
    await esperarAuto();
    expect(screen.getAllByTestId("bench-regla-trazo")).toHaveLength(1);
    expect(t.svg().querySelectorAll("line").length).toBeGreaterThanOrEqual(3);
  };
  const arcosSuaves = () => Array.from(screen.getByTestId("bench-arcos-practica").querySelectorAll("path")).filter((p) => p.getAttribute("stroke") === "#8f98a3");

  describe("traslación", () => {
    const A: Pt = [100, 270];
    const A2: Pt = [270, 230];
    const lv = d(A, A2);
    const V: [string, Pt, Pt][] = [["B", [200, 170], [370, 130]], ["C", [250, 290], [420, 250]]];

    function vertice(t: ReturnType<typeof pantalla>, P: Pt, P2: Pt) {
      t.tocar(A);
      t.tocar(A2);
      expect(t.fase()).toBe("centro");
      t.tocar(P);
      expect(t.fase()).toBe("arco");
      const b1 = ang(P, P2);
      t.arrastrar(enCirc(P, lv, b1 - 25), enCirc(P, lv, b1 + 10));
      expect(t.fase()).toBe("medida");
      t.tocar(A);
      t.tocar(P);
      expect(t.fase()).toBe("centro");
      t.tocar(A2);
      const b2 = ang(A2, P2);
      t.arrastrar(enCirc(A2, d(A, P), b2 - 25), enCirc(A2, d(A, P), b2 + 10));
      expect(t.fase()).toBe("punto");
    }

    it("tiene 15 pasos: 7 por vértice (B y C) y la unión", () => {
      expect(BENCH_STEPS["traslacion-practica"]).toBe(15);
      pantalla("traslacion-practica");
      expect(screen.getByTestId("bench-paso").textContent).toBe("Paso 1 de 15");
    });

    it("recorre B, C y la unión de los puntos y se supera solo, sin botón «Comprobar»", async () => {
      const t = pantalla("traslacion-practica");
      expect(t.out.control).toBeNull();
      for (const [, P, P2] of V) {
        vertice(t, P, P2);
        t.tocar([P2[0] + 4, P2[1] - 3]);
      }
      expect(screen.getByTestId("bench-paso").textContent).toBe("Paso 15 de 15");
      await unir(t);
      t.superada();
      expect(screen.getByTestId("bench-resultado").textContent).toContain("traslación");
    });

    it("solo vale el punto correcto: tocar otro sitio al marcar B′ avisa y se puede volver a elegir", () => {
      const t = pantalla("traslacion-practica");
      vertice(t, V[0][1], V[0][2]);
      t.tocar([300, 100]);
      expect(t.fase()).toBe("punto");
      expect(t.aviso()).toContain("no es el punto");
      t.tocar(V[0][2]);
      expect(t.fase()).toBe("medida"); // empieza C
    });

    it("al marcar B′ sus arcos quedan como trazo auxiliar más suave y B′ queda a la vista mientras se traslada C", () => {
      const t = pantalla("traslacion-practica");
      vertice(t, V[0][1], V[0][2]);
      expect(arcosSuaves()).toHaveLength(0);
      t.tocar(V[0][2]);
      expect(arcosSuaves().length).toBe(2);
      expect(screen.getAllByText("B′").length).toBeGreaterThan(0);
    });
  });

  describe("giro", () => {
    const O: Pt = [180, 290];
    const th = 60;
    const V: [string, Pt][] = [["A", [330, 290]], ["B", [380, 225]], ["C", [300, 235]]];
    const IMG = V.map(([, p]) => rotarPunto(p, O, th));

    function vertice(t: ReturnType<typeof pantalla>, P: Pt, P2: Pt) {
      const base = ang(O, P);
      t.arrastrar(enCirc(O, 120, base + 20), enCirc(O, 120, base + th));
      expect(t.fase()).toBe("medida");
      t.tocar(O);
      t.tocar(P);
      t.tocar(O);
      expect(t.fase()).toBe("arco");
      const b2 = ang(O, P2);
      t.arrastrar(enCirc(O, d(O, P), b2 - 25), enCirc(O, d(O, P), b2 + 10));
      expect(t.fase()).toBe("punto");
    }

    it("tiene 16 pasos: 5 por vértice (A, B y C) y la unión", () => {
      expect(BENCH_STEPS["giro-practica"]).toBe(16);
    });

    it("cerca de los 60° el segundo lado encaja en el valor exacto y se da por marcado", () => {
      const t = pantalla("giro-practica", { a: th });
      const base = ang(O, V[0][1]);
      t.arrastrar(enCirc(O, 120, base + 20), enCirc(O, 120, base + th + 2));
      expect(t.fase()).toBe("medida");
    });

    it("al marcar A′ no queda el compás en pantalla junto al transportador del vértice siguiente", () => {
      const t = pantalla("giro-practica", { a: th });
      vertice(t, V[0][1], IMG[0]);
      t.tocar(IMG[0]);
      expect(t.fase()).toBe("angulo");
      expect(screen.getByTestId("bench-angulo")).toBeTruthy();
      expect(screen.queryByTestId("bench-compas")).toBeNull();
    });

    it("recorre A, B, C y la unión de los puntos y se supera solo", async () => {
      const t = pantalla("giro-practica", { a: th });
      V.forEach(([, P], i) => {
        vertice(t, P, IMG[i]);
        t.tocar(IMG[i]);
      });
      await unir(t);
      t.superada();
      expect(screen.getByTestId("bench-resultado").textContent).toContain("giro");
    });

    it("el ángulo solo se da por marcado al soltar sobre el valor del giro; si no, avisa y deja seguir", () => {
      const t = pantalla("giro-practica", { a: th });
      t.arrastrar(enCirc(O, 120, 0), enCirc(O, 120, 45));
      expect(t.fase()).toBe("angulo");
      expect(t.aviso()).toContain("ángulo del giro");
      expect(screen.getByTestId("bench-angulo-lectura").textContent).toBe("45°");
      t.arrastrar(enCirc(O, 120, 45), enCirc(O, 120, th));
      expect(t.fase()).toBe("medida");
    });

    it("el teclado también marca el ángulo", () => {
      const t = pantalla("giro-practica", { a: 30 });
      expect(screen.getByTestId("bench-angulo-lectura").textContent).toBe("20°");
      for (let i = 0; i < 10; i += 1) fireEvent.keyDown(t.svg(), { key: "ArrowLeft" });
      expect(t.fase()).toBe("medida");
    });

    it("B parte de su propia recta OB: marcar el ángulo desde la horizontal no vale", () => {
      const t = pantalla("giro-practica", { a: th });
      vertice(t, V[0][1], IMG[0]);
      t.tocar(IMG[0]);
      expect(t.fase()).toBe("angulo");
      t.arrastrar(enCirc(O, 120, 0), enCirc(O, 120, th)); // 60° desde el eje horizontal, no desde OB
      expect(t.fase()).toBe("angulo");
    });

    it("solo vale el punto girado: tocar otro sitio avisa", () => {
      const t = pantalla("giro-practica", { a: th });
      vertice(t, V[0][1], IMG[0]);
      t.tocar(V[0][1]); // el punto sin girar
      expect(t.fase()).toBe("punto");
      expect(t.aviso()).toContain("no es el punto");
    });
  });

  describe("simetría", () => {
    const E1: Pt = [260, 40];
    const E2: Pt = [320, 350];
    const eje = (u: number): Pt => [E1[0] + u * (E2[0] - E1[0]), E1[1] + u * (E2[1] - E1[1])];
    const P = eje(0.3);
    const Q = eje(0.75);
    const refl = (p: Pt): Pt => {
      const v: Pt = [E2[0] - E1[0], E2[1] - E1[1]];
      const l = Math.hypot(v[0], v[1]);
      const u: Pt = [v[0] / l, v[1] / l];
      const k = (p[0] - E1[0]) * u[0] + (p[1] - E1[1]) * u[1];
      const pie: Pt = [E1[0] + u[0] * k, E1[1] + u[1] * k];
      return [2 * pie[0] - p[0], 2 * pie[1] - p[1]];
    };
    const V: Pt[] = [[130, 240], [190, 130], [205, 300]];
    const IMG = V.map(refl);

    function vertice(t: ReturnType<typeof pantalla>, X: Pt, X2: Pt) {
      for (const E of [P, Q]) {
        t.tocar(E);
        t.tocar(X);
        t.tocar(E);
        expect(t.fase()).toBe("arco");
        const b = ang(E, X2);
        t.arrastrar(enCirc(E, d(E, X), b - 25), enCirc(E, d(E, X), b + 10));
      }
      expect(t.fase()).toBe("punto");
    }

    it("tiene 22 pasos: 7 por vértice (A, B y C) y la unión", () => {
      expect(BENCH_STEPS["simetria-practica"]).toBe(22);
    });

    it("recorre A, B, C y la unión de los puntos y se supera solo", async () => {
      const t = pantalla("simetria-practica");
      V.forEach((X, i) => {
        vertice(t, X, IMG[i]);
        t.tocar(IMG[i]);
      });
      await unir(t);
      t.superada();
      expect(screen.getByTestId("bench-resultado").textContent).toContain("simetría");
    });

    it("marcar el otro corte de los arcos (el propio vértice) no vale", () => {
      const t = pantalla("simetria-practica");
      vertice(t, V[0], IMG[0]);
      t.tocar(V[0]);
      expect(t.fase()).toBe("punto");
      expect(t.aviso()).toContain("no es el punto");
    });
  });

  describe("homotecia", () => {
    const O: Pt = [120, 300];
    const V: Pt[] = [[220, 300], [250, 220], [190, 240]];
    const IMG = V.map((p): Pt => [O[0] + 2 * (p[0] - O[0]), O[1] + 2 * (p[1] - O[1])]);

    function vertice(t: ReturnType<typeof pantalla>, X: Pt, X2: Pt) {
      t.tocar(O);
      t.tocar(X);
      expect(t.fase()).toBe("centro");
      t.tocar(X);
      expect(t.fase()).toBe("arco");
      const b = ang(X, X2);
      t.arrastrar(enCirc(X, d(O, X), b - 25), enCirc(X, d(O, X), b + 10));
      expect(t.fase()).toBe("punto");
    }

    it("tiene 13 pasos: 4 por vértice (A, B y C) y la unión", () => {
      expect(BENCH_STEPS["homotecia-practica"]).toBe(13);
    });

    it("recorre A, B, C y la unión de los puntos y se supera solo", async () => {
      const t = pantalla("homotecia-practica");
      V.forEach((X, i) => {
        vertice(t, X, IMG[i]);
        t.tocar(IMG[i]);
      });
      await unir(t);
      t.superada();
      expect(screen.getByTestId("bench-resultado").textContent).toContain("homotecia");
    });

    it("la medida es OA y la punta solo se clava en A", () => {
      const t = pantalla("homotecia-practica");
      t.tocar([500, 100]);
      expect(t.fase()).toBe("medida");
      t.tocar(O);
      t.tocar(V[0]);
      expect(t.fase()).toBe("centro");
      t.tocar(O);
      expect(t.fase()).toBe("centro");
      t.tocar(V[0]);
      expect(t.fase()).toBe("arco");
    });

    it("marcar el otro corte del arco con la recta (el centro O) no vale", () => {
      const t = pantalla("homotecia-practica");
      vertice(t, V[0], IMG[0]);
      t.tocar(O);
      expect(t.fase()).toBe("punto");
      expect(t.aviso()).toContain("no es el punto");
    });
  });
});

/* ───────────── Tema 3: proporcionalidad, equivalencia y semejanza ───────────── */

describe("práctica guiada · proporcionalidad y equivalencia", () => {
  describe("Thales: dividir un segmento", () => {
    const A: Pt = [110, 300];
    const B: Pt = [470, 300];
    const TH = 35;
    const marca = (k: number, r: number): Pt => enCirc(A, k * r, TH);

    function marcas(r: number) {
      const t = pantalla("thales-practica");
      t.tocar(A);
      expect(t.fase()).toBe("abertura");
      t.arrastrar(enCirc(A, r, TH - 22));
      t.fijar();
      expect(t.fase()).toBe("arco");
      t.arrastrar(enCirc(A, r, TH - 22), enCirc(A, r, TH + 10));
      expect(t.fase()).toBe("centro");
      t.tocar(marca(1, r));
      expect(t.fase()).toBe("arco");
      t.arrastrar(enCirc(marca(1, r), r, TH - 22), enCirc(marca(1, r), r, TH + 10));
      t.tocar(marca(2, r));
      t.arrastrar(enCirc(marca(2, r), r, TH - 22), enCirc(marca(2, r), r, TH + 10));
      expect(t.fase()).toBe("trazo");
      return t;
    }

    /** Desliza la escuadra `delta` mm sobre el cartabón, en la dirección en que avanza hacia las marcas. */
    function deslizar(t: ReturnType<typeof pantalla>, r: number, delta: number) {
      const { desliza } = prepararEscuadra([marca(3, r), B], [marca(2, r), marca(1, r)]);
      t.arrastrar([300, 200], [300 + desliza[0] * delta, 200 + desliza[1] * delta]);
    }

    it.each([50, 70, 95])("con abertura %i: marcas, unión con B y paralelas con escuadra y cartabón, todo en un solo ejercicio", (r) => {
      const t = marcas(r);
      t.tocar(marca(3, r));
      t.sinSuperar();
      t.tocar(B);
      expect(t.fase()).toBe("escuadra");
      expect(screen.getByTestId("bench-instrumentos")).toBeTruthy();
      expect(screen.getByTestId("bench-accion").textContent).toContain("arrastra la escuadra");
      const { sps } = prepararEscuadra([marca(3, r), B], [marca(2, r), marca(1, r)]);
      deslizar(t, r, sps[0]);
      expect(screen.getAllByTestId("bench-paralela-trazada")).toHaveLength(1);
      expect(t.fase()).toBe("escuadra");
      t.sinSuperar();
      deslizar(t, r, sps[1] - sps[0]);
      expect(screen.getAllByTestId("bench-paralela-trazada")).toHaveLength(2);
      t.superada();
    });

    it("la escuadra: se ve la línea del filo y la marca; al acercarse encaja, se tiñe de verde y avisa de que se puede soltar", () => {
      const t = marcas(70);
      t.tocar(marca(3, 70));
      t.tocar(B);
      const { sps, desliza } = prepararEscuadra([marca(3, 70), B], [marca(2, 70), marca(1, 70)]);
      expect(screen.getByTestId("bench-filo")).toBeTruthy();
      expect(screen.getByTestId("bench-marca-objetivo")).toBeTruthy();
      expect(screen.queryByTestId("bench-alineada")).toBeNull();
      const svg = t.svg();
      fireEvent.pointerDown(svg, { clientX: 300, clientY: 200, pointerId: 1 });
      fireEvent.pointerMove(svg, { clientX: 300 + desliza[0] * (sps[0] - 6), clientY: 200 + desliza[1] * (sps[0] - 6), pointerId: 1 });
      expect(screen.getByTestId("bench-alineada")).toBeTruthy();
      expect(screen.getByTestId("bench-alineada-texto").textContent).toContain("suelta");
      fireEvent.pointerUp(svg, { pointerId: 1 });
      expect(screen.getAllByTestId("bench-paralela-trazada")).toHaveLength(1);
      expect(screen.queryByTestId("bench-alineada")).toBeNull();
    });

    it("la escuadra: soltar antes de llegar o pasándose avisa y deja volver a intentarlo", () => {
      const t = marcas(70);
      t.tocar(marca(3, 70));
      t.tocar(B);
      const { sps } = prepararEscuadra([marca(3, 70), B], [marca(2, 70), marca(1, 70)]);
      deslizar(t, 70, sps[0] / 2);
      expect(t.aviso()).toContain("Todavía no llega");
      deslizar(t, 70, sps[0] + 40 - sps[0] / 2);
      expect(t.aviso()).toContain("Te has pasado");
      t.sinSuperar();
    });
  });

  describe("media proporcional", () => {
    const O: Pt = [265, 300];
    const B: Pt = [390, 300];
    const H: Pt = [230, 300];
    const C: Pt = [230, 180];
    const R = 125;

    function hasta() {
      const t = pantalla("media-practica");
      t.tocar(O);
      t.tocar(B);
      expect(t.fase()).toBe("centro");
      t.tocar(O);
      expect(t.fase()).toBe("arco");
      t.arrastrar(enCirc(O, R, 10), enCirc(O, R, 90), enCirc(O, R, 176));
      expect(t.fase()).toBe("regla");
      return t;
    }

    it("la perpendicular por H hasta la semicircunferencia supera el ejercicio solo", () => {
      const t = hasta();
      t.tocar(H);
      t.sinSuperar();
      t.tocar([C[0] + 4, C[1] - 3]);
      t.superada();
    });

    it("la semicircunferencia no se da por trazada si solo se dibuja la mitad", () => {
      const t = pantalla("media-practica");
      t.tocar(O);
      t.tocar(B);
      t.tocar(O);
      t.arrastrar(enCirc(O, R, 10), enCirc(O, R, 80));
      expect(t.fase()).toBe("arco");
    });

    it("la perpendicular por otro punto no vale", () => {
      const t = hasta();
      t.tocar([330, 300]);
      expect(t.aviso()).toContain("puntos de la construcción");
      expect(t.fase()).toBe("regla");
    });
  });

  describe("sección áurea", () => {
    const A: Pt = [110, 300];
    const B: Pt = [410, 300];
    const C: Pt = [410, 150];
    const LCB = 150;
    const LAC = d(A, C);
    const D: Pt = [C[0] + ((A[0] - C[0]) * LCB) / LAC, C[1] + ((A[1] - C[1]) * LCB) / LAC];
    const LAD = d(A, D);
    const E: Pt = [A[0] + LAD, 300];

    function hasta() {
      const t = pantalla("aurea-practica");
      t.tocar(C);
      t.tocar(B);
      expect(t.fase()).toBe("centro");
      t.tocar(C);
      const b1 = ang(C, D);
      t.arrastrar(enCirc(C, LCB, b1 - 25), enCirc(C, LCB, b1 + 10));
      expect(t.fase()).toBe("medida");
      t.tocar(A);
      t.tocar(D);
      expect(t.fase()).toBe("centro");
      t.tocar(A);
      t.arrastrar(enCirc(A, LAD, -25), enCirc(A, LAD, 10));
      expect(t.fase()).toBe("regla");
      return t;
    }

    it("marcar E supera el ejercicio solo", () => {
      const t = hasta();
      t.tocar([E[0] + 4, E[1] - 3]);
      t.superada();
    });

    it("marcar otro punto avisa y se puede volver a elegir", () => {
      const t = hasta();
      t.tocar([260, 300]);
      expect(t.aviso()).toContain("puntos de la construcción");
      expect(t.fase()).toBe("regla");
      t.sinSuperar();
    });
  });

  describe("cuadratura del rectángulo", () => {
    const B: Pt = [300, 300];
    const Cc: Pt = [300, 210];
    const H: Pt = [390, 300];
    const O: Pt = [255, 300];
    const R = 135;
    const E: Pt = [300, 300 - Math.sqrt(R * R - 45 * 45)];

    function hasta() {
      const t = pantalla("cuadratura-practica");
      t.tocar(B);
      t.tocar(Cc);
      expect(t.fase()).toBe("centro");
      t.tocar(B);
      t.arrastrar(enCirc(B, 90, -25), enCirc(B, 90, 10));
      expect(t.fase()).toBe("medida");
      t.tocar(O);
      t.tocar(H);
      expect(t.fase()).toBe("centro");
      t.tocar(O);
      t.arrastrar(enCirc(O, R, 10), enCirc(O, R, 90), enCirc(O, R, 176));
      expect(t.fase()).toBe("trazo");
      return t;
    }
    const lado = 300 - E[1];
    const F: Pt = [300 - lado, 300];

    it("la perpendicular por B, BE llevado sobre AB con el compás y el cuadrado sobre el rectángulo, en un solo ejercicio", async () => {
      const t = hasta();
      t.tocar(B);
      t.tocar([E[0] + 4, E[1] - 3]);
      expect(t.fase()).toBe("medida");
      t.sinSuperar();
      t.tocar(B);
      t.tocar(E);
      t.tocar(B);
      t.arrastrar(enCirc(B, lado, 100), enCirc(B, lado, 170));
      expect(t.fase()).toBe("punto");
      t.tocar([300 - lado / 2, 300]);
      expect(t.aviso()).toContain("no es el punto");
      t.tocar(F);
      expect(t.fase()).toBe("auto");
      await esperarAuto();
      t.superada();
      expect(screen.getByTestId("bench-cuadrado-final")).toBeTruthy();
    });

    it("la perpendicular por otro punto no vale", () => {
      const t = hasta();
      t.tocar([350, 300]);
      expect(t.aviso()).toContain("por los que debe pasar la regla");
      t.sinSuperar();
    });
  });
});

describe("mesa de dibujo · triángulos y polígonos", () => {
  const { LA, LB, LC, SEG_A, SEG_B, HO, HV, CC_O } = POLIGONOS_GEOM;

  describe("triángulo dados los tres lados", () => {
    function hasta() {
      const t = pantalla("triangulo-lll-practica");
      t.tocar(SEG_B[0]);
      t.tocar(SEG_B[1]);
      expect(t.fase()).toBe("centro");
      t.tocar(LA);
      const aA = ang(LA, LC);
      t.arrastrar(enCirc(LA, 150, aA - 25), enCirc(LA, 150, aA + 10));
      expect(t.fase()).toBe("medida");
      t.tocar(SEG_A[0]);
      t.tocar(SEG_A[1]);
      t.tocar(LB);
      const aB = ang(LB, LC);
      t.arrastrar(enCirc(LB, 130, aB + 25), enCirc(LB, 130, aB - 10));
      expect(t.fase()).toBe("auto");
      return t;
    }

    it("tomar los dos lados y trazar los arcos: la regla une sola C con A y con B y el ejercicio se supera", async () => {
      const t = hasta();
      t.sinSuperar();
      await esperarAuto();
      t.superada();
      expect(screen.getByTestId("bench-regla-trazo")).toBeTruthy();
    });

    it("la medida solo se toma entre los extremos del segmento que toca", () => {
      const t = pantalla("triangulo-lll-practica");
      t.tocar(SEG_A[0]);
      expect(t.aviso()).toContain("dos puntos marcados");
      expect(t.fase()).toBe("medida");
    });
  });

  describe("hexágono inscrito", () => {
    function hasta(arcos = 5) {
      const t = pantalla("hexagono-practica");
      t.tocar(HO);
      t.tocar(HV[0]);
      for (let i = 0; i < arcos; i += 1) {
        expect(t.fase()).toBe("centro");
        t.tocar(HV[i]);
        const a = ang(HV[i], HV[i + 1]);
        t.arrastrar(enCirc(HV[i], 120, a - 25), enCirc(HV[i], 120, a + 10));
        expect(t.fase()).toBe("punto");
        t.tocar(HV[i + 1]);
      }
      return t;
    }

    it("cinco arcos con el radio marcan los seis vértices y la regla los une sola", async () => {
      const t = hasta();
      expect(t.fase()).toBe("auto");
      t.sinSuperar();
      await esperarAuto();
      t.superada();
      expect(t.svg().querySelectorAll("line").length).toBeGreaterThanOrEqual(6);
    });

    it("los arcos de los vértices ya marcados quedan más suaves que el dibujo final", () => {
      hasta(2);
      const suaves = Array.from(screen.getByTestId("bench-arcos-practica").querySelectorAll("path")).filter((p) => p.getAttribute("stroke") === "#8f98a3");
      expect(suaves.length).toBe(2);
    });

    it("el punto marcado tiene que ser el corte del arco con la circunferencia", () => {
      const t = pantalla("hexagono-practica");
      t.tocar(HO);
      t.tocar(HV[0]);
      t.tocar(HV[0]);
      const a = ang(HV[0], HV[1]);
      t.arrastrar(enCirc(HV[0], 120, a - 25), enCirc(HV[0], 120, a + 10));
      expect(t.fase()).toBe("punto");
      t.tocar(HV[3]);
      expect(t.aviso()).toContain("no es el punto");
      expect(t.fase()).toBe("punto");
    });
  });

  describe("circuncentro con dos mediatrices", () => {
    function hasta() {
      const t = pantalla("circuncentro-practica");
      const mediatriz = (P: Pt, Q: Pt, r: number) => {
        const th = Math.max((Math.acos(Math.min(1, d(P, Q) / (2 * r))) * 180) / Math.PI, 20) + 8;
        t.tocar(P);
        t.arrastrar(enCirc(P, r, ang(P, Q) + 35));
        t.fijar();
        expect(t.fase()).toBe("arco");
        t.arrastrar(enCirc(P, r, ang(P, Q) + th), enCirc(P, r, ang(P, Q) - th));
        expect(t.fase()).toBe("centro");
        t.tocar(Q);
        t.arrastrar(enCirc(Q, r, ang(Q, P) + th), enCirc(Q, r, ang(Q, P) - th));
      };
      mediatriz(PN_A, PN_B, 160);
      mediatriz(PN_A, PN_C, 150);
      expect(t.fase()).toBe("regla");
      return t;
    }

    it("dos mediatrices con la regla supera el ejercicio y marca el circuncentro", () => {
      const t = hasta();
      const [c1, c2] = [
        [PN_A, PN_B, 160],
        [PN_A, PN_C, 150],
      ].map(([P, Q, r]) => {
        const m: Pt = [((P as Pt)[0] + (Q as Pt)[0]) / 2, ((P as Pt)[1] + (Q as Pt)[1]) / 2];
        const h = Math.sqrt((r as number) ** 2 - (d(P as Pt, Q as Pt) / 2) ** 2);
        const u: Pt = [-((Q as Pt)[1] - (P as Pt)[1]) / d(P as Pt, Q as Pt), ((Q as Pt)[0] - (P as Pt)[0]) / d(P as Pt, Q as Pt)];
        return [[m[0] + u[0] * h, m[1] + u[1] * h] as Pt, [m[0] - u[0] * h, m[1] - u[1] * h] as Pt];
      });
      t.tocar(c1[0]);
      t.tocar(c2[0]);
      expect(t.aviso()).toContain("mismo lado");
      t.tocar(c1[1]);
      t.tocar(c2[0]);
      t.sinSuperar();
      t.tocar(c2[1]);
      t.superada();
      expect(screen.getByTestId("bench-circuncentro")).toBeTruthy();
      expect(d(CC_O, PN_A)).toBeCloseTo(d(CC_O, PN_B), 6);
      expect(d(CC_O, PN_A)).toBeCloseTo(d(CC_O, PN_C), 6);
    });
  });

  it("puntos notables: cada paso dibuja las rectas de su familia y el último la recta de Euler", () => {
    const { siguiente } = montar("puntos-notables");
    expect(screen.queryByTestId("bench-euler")).toBeNull();
    siguiente(1);
    expect(screen.getByTestId("bench-inscrita")).toBeTruthy();
    siguiente(1);
    expect(screen.getByTestId("bench-circunscrita")).toBeTruthy();
    siguiente(2);
    expect(screen.getByTestId("bench-euler")).toBeTruthy();
  });

  it("hexágono y triángulo: las explicaciones animadas muestran el compás y el resultado final", () => {
    const h = montar("hexagono-compas");
    h.siguiente(1);
    expect(screen.getByTestId("bench-compas")).toBeTruthy();
    h.siguiente(3);
    expect(screen.queryByTestId("bench-compas")).toBeNull();
    cleanup();
    const t = montar("triangulo-lll-compas");
    t.siguiente(2);
    expect(screen.getByTestId("bench-compas")).toBeTruthy();
    t.siguiente(2);
    expect(screen.getByTestId("bench-lll-final")).toBeTruthy();
  });
});

describe("mesa de dibujo · cuadriláteros, elementos y estrellas", () => {
  const { RA, RC, RB, RD, SEG_LADO, AP, AQ, EO, PV } = POLIGONOS_GEOM_2;
  const th = (Math.acos(120 / 150) * 180) / Math.PI + 8;

  function rombo() {
    const t = pantalla("rombo-practica");
    t.tocar(SEG_LADO[0]);
    t.tocar(SEG_LADO[1]);
    expect(t.fase()).toBe("centro");
    t.tocar(RA);
    t.arrastrar(enCirc(RA, 150, th), enCirc(RA, 150, -th));
    expect(t.fase()).toBe("centro");
    t.tocar(RC);
    t.arrastrar(enCirc(RC, 150, 180 + th), enCirc(RC, 150, 180 - th));
    expect(t.fase()).toBe("punto");
    return t;
  }

  it("rombo: los dos cortes se marcan en orden (B arriba y D abajo) y la regla une los cuatro lados sola", async () => {
    const t = rombo();
    t.tocar(RD);
    expect(t.aviso()).toContain("no es el punto");
    t.tocar(RB);
    expect(t.fase()).toBe("punto");
    t.tocar(RD);
    expect(t.fase()).toBe("auto");
    t.sinSuperar();
    await esperarAuto();
    t.superada();
    expect(t.svg().querySelectorAll("line").length).toBeGreaterThanOrEqual(4);
  });

  it("rombo: el lado se toma entre los extremos de su segmento", () => {
    const t = pantalla("rombo-practica");
    t.tocar(RA);
    expect(t.aviso()).toContain("dos puntos marcados");
    expect(t.fase()).toBe("medida");
  });

  describe("apotema", () => {
    const M: Pt = [(AP[0] + AQ[0]) / 2, (AP[1] + AQ[1]) / 2];
    const r = 100;
    function hasta() {
      const t = pantalla("apotema-practica");
      const tt = Math.max((Math.acos(60 / r) * 180) / Math.PI, 20) + 8;
      t.tocar(AP);
      t.arrastrar(enCirc(AP, r, ang(AP, AQ) + 35));
      t.fijar();
      expect(t.fase()).toBe("arco");
      t.arrastrar(enCirc(AP, r, ang(AP, AQ) + tt), enCirc(AP, r, ang(AP, AQ) - tt));
      t.tocar(AQ);
      t.arrastrar(enCirc(AQ, r, ang(AQ, AP) + tt), enCirc(AQ, r, ang(AQ, AP) - tt));
      expect(t.fase()).toBe("regla");
      return t;
    }
    it("la mediatriz del lado pasa por el centro y el ejercicio se supera solo", () => {
      const t = hasta();
      const h = Math.sqrt(r * r - 60 * 60);
      const u: Pt = [-(AQ[1] - AP[1]) / 120, (AQ[0] - AP[0]) / 120];
      t.tocar([M[0] + u[0] * h, M[1] + u[1] * h]);
      t.sinSuperar();
      t.tocar([M[0] - u[0] * h, M[1] - u[1] * h]);
      t.superada();
      expect(screen.getByTestId("bench-apotema")).toBeTruthy();
      expect(d(M, EO)).toBeCloseTo(Math.sqrt(120 * 120 - 60 * 60), 6);
    });
    it("una abertura menor que la mitad del lado no se acepta", () => {
      const t = pantalla("apotema-practica");
      t.tocar(AP);
      t.arrastrar(enCirc(AP, 50, 35));
      t.fijar();
      expect(t.fase()).toBe("abertura");
      expect(t.aviso()).toContain("mitad");
    });
  });

  describe("pentagrama", () => {
    it("une los vértices de dos en dos: cinco trazos y el ejercicio se supera solo", () => {
      const t = pantalla("pentagrama-practica");
      for (const [i, j] of [[0, 2], [2, 4], [4, 1], [1, 3], [3, 0]]) {
        t.sinSuperar();
        t.tocar(PV[i]);
        t.tocar(PV[j]);
      }
      t.superada();
    });
    it("un trazo entre vértices contiguos o repetido avisa y no se registra", () => {
      const t = pantalla("pentagrama-practica");
      t.tocar(PV[0]);
      t.tocar(PV[1]);
      expect(t.aviso()).toContain("salta un vértice");
    });
  });

  it("elementos del polígono: el paso de la apotema y el del ángulo central dibujan cada elemento", () => {
    const { siguiente } = montar("poligono-elementos");
    expect(screen.getByTestId("bench-el-lado")).toBeTruthy();
    siguiente(2);
    expect(screen.getByTestId("bench-el-central")).toBeTruthy();
    siguiente(1);
    expect(screen.getByTestId("bench-el-apotema")).toBeTruthy();
    siguiente(1);
    expect(screen.getByTestId("bench-el-interior")).toBeTruthy();
  });

  it("estrellas: el pentagrama se traza en el paso 2 y el hexagrama en el 3", () => {
    const { siguiente } = montar("estrella-compas");
    expect(screen.queryByTestId("bench-pentagrama")).toBeNull();
    siguiente(1);
    expect(screen.getByTestId("bench-pentagrama")).toBeTruthy();
    expect(screen.queryByTestId("bench-hexagrama")).toBeNull();
    siguiente(1);
    expect(screen.getByTestId("bench-hexagrama")).toBeTruthy();
  });

  it("rombo: la explicación muestra los arcos, el rombo final y las diagonales", () => {
    const { siguiente } = montar("rombo-compas");
    siguiente(2);
    expect(screen.getByTestId("bench-compas")).toBeTruthy();
    siguiente(1);
    expect(screen.getByTestId("bench-rombo-final")).toBeTruthy();
    siguiente(1);
    expect(screen.getByTestId("bench-rombo-diagonales")).toBeTruthy();
  });
});

describe("mesa de dibujo · tangencias y curvas técnicas", () => {
  const G = TANGENCIAS_GEOM;

  it("tangentes desde un punto: mediatriz de OP, circunferencia de diámetro OP y unión automática", async () => {
    const t = pantalla("tangentes-practica");
    const th = (Math.acos(135 / 160) * 180) / Math.PI + 8;
    t.tocar(G.TO);
    t.arrastrar(enCirc(G.TO, 160, ang(G.TO, G.TP) + 35));
    t.fijar();
    t.arrastrar(enCirc(G.TO, 160, th), enCirc(G.TO, 160, -th));
    t.tocar(G.TP);
    t.arrastrar(enCirc(G.TP, 160, 180 + th), enCirc(G.TP, 160, 180 - th));
    expect(t.fase()).toBe("trazo");
    const h = Math.sqrt(160 * 160 - 135 * 135);
    t.tocar([G.TM[0], G.TM[1] - h]);
    expect(screen.getByTestId("bench-pend")).toBeTruthy();
    t.tocar([G.TM[0], G.TM[1] - h]);
    expect(t.aviso()).toContain("ya lo has usado");
    t.tocar([G.TM[0], G.TM[1] + h]);
    expect(screen.getByTestId("bench-trazo-aux")).toBeTruthy();
    expect(t.fase()).toBe("medida");
    t.tocar(G.TM);
    t.tocar(G.TO);
    expect(t.fase()).toBe("centro");
    t.tocar(G.TM);
    const fi = Math.abs(ang(G.TM, G.T_ARRIBA) - 180) + 12;
    t.arrastrar(enCirc(G.TM, 135, 180 + fi), enCirc(G.TM, 135, 180 - fi));
    expect(t.fase()).toBe("punto");
    t.tocar(G.T_ABAJO);
    expect(t.aviso()).toContain("no es el punto");
    t.tocar(G.T_ARRIBA);
    t.tocar(G.T_ABAJO);
    expect(t.fase()).toBe("auto");
    t.sinSuperar();
    await esperarAuto();
    t.superada();
  });

  it("circunferencia tangente en T: recta de los centros, arco de radio r, centro C y arco por T", () => {
    const t = pantalla("circ-tangente-practica");
    t.tocar(G.CT_O);
    t.tocar(G.CT_T);
    expect(t.fase()).toBe("medida");
    t.tocar(G.CT_SEG[0]);
    t.tocar(G.CT_SEG[1]);
    t.tocar(G.CT_T);
    t.arrastrar(enCirc(G.CT_T, 45, 40 - 25), enCirc(G.CT_T, 45, 40 + 10));
    expect(t.fase()).toBe("punto");
    t.tocar(G.CT_C);
    t.tocar(G.CT_C);
    const b = ang(G.CT_C, G.CT_T);
    t.sinSuperar();
    t.arrastrar(enCirc(G.CT_C, 45, b - 45), enCirc(G.CT_C, 45, b + 45));
    t.superada();
  });

  it("enlace de 90°: T₁ y T₂ a distancia r de V, centro C y arco de enlace (resultado en trazo fuerte)", () => {
    const t = pantalla("enlace-practica");
    t.tocar(G.E_SEG[0]);
    t.tocar(G.E_SEG[1]);
    t.tocar(G.EV0);
    t.arrastrar(enCirc(G.EV0, 70, 5), enCirc(G.EV0, 70, 85));
    expect(t.fase()).toBe("punto");
    t.tocar(G.E_T2);
    expect(t.aviso()).toContain("no es el punto");
    t.tocar(G.E_T1);
    t.tocar(G.E_T2);
    t.tocar(G.E_T1);
    t.arrastrar(enCirc(G.E_T1, 70, 90 - 25), enCirc(G.E_T1, 70, 90 + 10));
    t.tocar(G.E_T2);
    t.arrastrar(enCirc(G.E_T2, 70, -25), enCirc(G.E_T2, 70, 10));
    expect(t.fase()).toBe("punto");
    t.tocar(G.E_C);
    t.tocar(G.E_C);
    t.sinSuperar();
    t.arrastrar(enCirc(G.E_C, 70, 225 - 45), enCirc(G.E_C, 70, 225 + 45));
    t.superada();
    const fuertes = Array.from(screen.getByTestId("bench-arcos-practica").querySelectorAll("path")).filter((p) => p.getAttribute("stroke") !== "#8f98a3");
    expect(fuertes).toHaveLength(1);
  });

  it("óvalo: cuatro centros, cuatro rectas de enlace, dos arcos grandes y dos pequeños", () => {
    const t = pantalla("ovalo-practica");
    t.tocar(G.O1);
    t.tocar(G.O2);
    t.tocar(G.O1);
    t.arrastrar(enCirc(G.O1, 60, 72), enCirc(G.O1, 60, -72));
    t.tocar(G.O2);
    t.arrastrar(enCirc(G.O2, 60, 180 + 72), enCirc(G.O2, 60, 180 - 72));
    expect(t.fase()).toBe("punto");
    t.tocar(G.O3);
    t.tocar(G.O4);
    expect(t.fase()).toBe("trazo");
    for (const [a, b] of [[G.O3, G.O1], [G.O3, G.O2], [G.O4, G.O1], [G.O4, G.O2]]) {
      t.tocar(a);
      t.tocar(b);
    }
    expect(screen.getAllByTestId("bench-trazo-aux")).toHaveLength(4);
    expect(t.fase()).toBe("medida");
    t.tocar(G.O_STRIP[0]);
    t.tocar(G.O_STRIP[1]);
    t.tocar(G.O3);
    t.arrastrar(enCirc(G.O3, 120, -120), enCirc(G.O3, 120, -60));
    t.tocar(G.O4);
    t.arrastrar(enCirc(G.O4, 120, 60), enCirc(G.O4, 120, 120));
    expect(t.fase()).toBe("medida");
    t.tocar(G.O1);
    t.tocar(G.O2);
    t.tocar(G.O1);
    t.arrastrar(enCirc(G.O1, 60, 125), enCirc(G.O1, 60, 235));
    t.sinSuperar();
    t.tocar(G.O2);
    t.arrastrar(enCirc(G.O2, 60, -55), enCirc(G.O2, 60, 55));
    t.superada();
  });

  it("espiral de dos centros: cuatro semicircunferencias alternando A y B", () => {
    const t = pantalla("espiral-practica");
    for (let k = 1; k <= 4; k += 1) {
      const c = G.SA;
      const centro: Pt = k % 2 === 1 ? G.SA : G.SB;
      const inicio = G.SE[k - 1];
      void c;
      t.tocar(centro);
      t.tocar(inicio);
      expect(t.fase()).toBe("centro");
      t.tocar(centro);
      const r = k * G.SD;
      if (k % 2 === 1) t.arrastrar(enCirc(centro, r, 0), enCirc(centro, r, 90), enCirc(centro, r, 180));
      else t.arrastrar(enCirc(centro, r, 180), enCirc(centro, r, 270), enCirc(centro, r, 360));
      if (k < 4) t.sinSuperar();
    }
    t.superada();
  });

  it("posiciones relativas: el punto de tangencia solo aparece cuando d = R + r o d = R − r", () => {
    const { siguiente } = montar("circunferencias-posiciones");
    expect(screen.queryByTestId("bench-tangencia")).toBeNull();
    siguiente(1);
    expect(screen.getByTestId("bench-tangencia")).toBeTruthy();
    siguiente(1);
    expect(screen.queryByTestId("bench-tangencia")).toBeNull();
    siguiente(1);
    expect(screen.getByTestId("bench-tangencia")).toBeTruthy();
  });

  it("explicaciones: tangentes (circunferencia de diámetro OP), enlace, óvalo y evolvente muestran lo que dicen", () => {
    const a = montar("tangentes-compas");
    a.siguiente(2);
    expect(screen.getByTestId("bench-circ-diametro")).toBeTruthy();
    a.siguiente(2);
    expect(screen.getByTestId("bench-tangentes-rectas")).toBeTruthy();
    cleanup();
    const b = montar("enlace-compas");
    b.siguiente(1);
    expect(screen.getByTestId("bench-enlace-paralelas")).toBeTruthy();
    b.siguiente(3);
    expect(screen.getByTestId("bench-enlace-final")).toBeTruthy();
    cleanup();
    const c = montar("ovalo-compas");
    expect(screen.queryByTestId("bench-ovalo-pequenos")).toBeNull();
    c.siguiente(4);
    expect(screen.getByTestId("bench-ovalo-pequenos")).toBeTruthy();
    cleanup();
    const d = montar("evolvente-hilo");
    expect(screen.queryByTestId("bench-evolvente-curva")).toBeNull();
    d.siguiente(3);
    expect(screen.getByTestId("bench-evolvente-normal")).toBeTruthy();
    cleanup();
    const e = montar("espiral-compas");
    e.siguiente(2);
    expect(screen.getByTestId("bench-paso").textContent).toBe("Paso 3 de 5");
    expect(screen.getByTestId("bench-espiral").querySelectorAll("path").length).toBeGreaterThanOrEqual(2);
  });
});

describe("mesa de dibujo · guía, «Tu turno» y construcciones auxiliares", () => {
  const G = TANGENCIAS_GEOM;

  it("en los ejercicios se indica qué hace el alumno en cada paso («Tu turno») y desaparece al terminar", () => {
    const t = pantalla("tangentes-practica");
    expect(screen.getByTestId("bench-accion").textContent).toContain("toca el punto donde clavar el compás");
    t.tocar(G.TO);
    expect(screen.getByTestId("bench-accion").textContent).toContain("Fijar abertura");
  });

  it("las escenas de arrastre con instrumentos también dicen qué hacer", () => {
    const { siguiente } = montar("paralelas-escuadra-cartabon", { a: 0, b: 70 });
    expect(screen.queryByTestId("bench-accion")).toBeNull();
    siguiente(BENCH_STEPS["paralelas-escuadra-cartabon"] - 1);
    expect(screen.getByTestId("bench-accion").textContent).toContain("arrastra la escuadra");
  });

  it("tras dos fallos seguidos se resalta lo que hay que tocar, y al acertar la guía desaparece", () => {
    const t = pantalla("tangentes-practica");
    t.tocar([20, 20]);
    expect(screen.queryAllByTestId("bench-guia")).toHaveLength(0);
    t.tocar([30, 20]);
    expect(screen.getAllByTestId("bench-guia")).toHaveLength(2);
    expect(screen.getByTestId("bench-pista-texto").textContent).toContain("resaltados");
    t.tocar(G.TO);
    expect(screen.queryAllByTestId("bench-guia")).toHaveLength(0);
  });

  it("el botón Pista resalta la acción sin necesidad de fallar y no se puede pulsar al acabar", () => {
    const t = pantalla("tangentes-practica");
    fireEvent.click(screen.getByTestId("bench-pista"));
    expect(screen.getAllByTestId("bench-guia").length).toBeGreaterThan(0);
    t.tocar(G.TO);
    expect(screen.queryAllByTestId("bench-guia")).toHaveLength(0);
    expect((screen.getByTestId("bench-pista") as HTMLButtonElement).disabled).toBe(false);
  });

  it("la pista del arco dibuja el trazo punteado que hay que seguir", () => {
    const t = pantalla("hexagono-practica");
    t.tocar(POLIGONOS_GEOM.HO);
    t.tocar(POLIGONOS_GEOM.HV[0]);
    t.tocar(POLIGONOS_GEOM.HV[0]);
    expect(t.fase()).toBe("arco");
    fireEvent.click(screen.getByTestId("bench-pista"));
    expect(screen.getByTestId("bench-guia-arco")).toBeTruthy();
  });

  it("al hallar un punto medio o una paralela, la explicación enseña cómo se construye", () => {
    const a = montar("tangentes-compas");
    expect(screen.queryByTestId("bench-punto-medio-anim")).toBeNull();
    a.siguiente(1);
    expect(screen.getByTestId("bench-punto-medio-anim")).toBeTruthy();
    cleanup();
    const b = montar("media-compas");
    b.siguiente(1);
    expect(screen.getByTestId("bench-punto-medio-anim")).toBeTruthy();
    cleanup();
    const c = montar("cuadratura-compas");
    c.siguiente(2);
    expect(screen.getByTestId("bench-punto-medio-anim")).toBeTruthy();
    cleanup();
    const d = montar("enlace-compas");
    d.siguiente(1);
    expect(screen.getAllByTestId("bench-paralela-anim")).toHaveLength(2);
  });
});

describe("mesa de dibujo · construcciones auxiliares con instrumentos", () => {
  it("las paralelas se trazan con escuadra y cartabón (equivalencia, Thales y óvalo) y los puntos medios con la mediatriz (medianas)", () => {
    const a = montar("equivalencia-triangulos");
    expect(screen.queryByTestId("bench-paralelo-escuadra")).toBeNull();
    a.siguiente(1);
    expect(screen.getAllByTestId("bench-paralelo-escuadra")).toHaveLength(1);
    expect(screen.getByText("r ∥ AB")).toBeTruthy();
    cleanup();
    const b = montar("thales-dividir");
    b.siguiente(5);
    expect(within(screen.getByTestId("bench-paralelas-thales")).getAllByTestId("bench-paralelo-escuadra")).toHaveLength(2);
    expect(screen.getAllByText("Q").length).toBeGreaterThan(0);
    cleanup();
    const c = montar("ovalo-compas");
    expect(within(screen.getByTestId("bench-ovalo-thales")).getAllByTestId("bench-paralelo-escuadra")).toHaveLength(2);
    expect(screen.getAllByText("O₁").length).toBeGreaterThan(0);
    c.siguiente(1);
    expect(screen.queryByTestId("bench-ovalo-thales")).toBeNull();
    cleanup();
    montar("puntos-notables");
    expect(within(screen.getByTestId("bench-medios-anim")).getAllByTestId("bench-punto-medio-anim")).toHaveLength(3);
  });
});

describe("mesa de dibujo · ángulos con escuadra y cartabón (figura 14 del libro)", () => {
  it("las seis posiciones marcan 15°/165°, 30°/150°, 45°/135°, 60°/120°, 75°/105° y 135°/45°", () => {
    const { siguiente } = montar("escuadra-cartabon-angulos");
    siguiente(3);
    const esperados = [15, 150, 45, 120, 105, 135]; // ángulo de la recta con la horizontal (el otro es su suplementario)
    esperados.forEach((a, i) => {
      const g = screen.getByTestId("bench-posicion-angulos");
      expect(Number(g.getAttribute("data-angulo")), `posición ${i + 1}`).toBe(a);
      expect(g.textContent).toContain(`${a}°`);
      expect(g.textContent).toContain(`${180 - a}°`);
      if (i < esperados.length - 1) siguiente();
    });
  });

  it("15° y 75° usan los dos instrumentos (un cateto de la escuadra en la hipotenusa del cartabón); el resto, una sola pieza", () => {
    const { siguiente } = montar("escuadra-cartabon-angulos");
    siguiente(3);
    const piezas: number[] = [];
    for (let i = 0; i < 6; i += 1) {
      piezas.push(screen.getByTestId("bench-posicion-angulos").querySelectorAll("g[filter]").length);
      if (i < 5) siguiente();
    }
    expect(piezas).toEqual([2, 1, 1, 1, 2, 1]);
  });
});

describe("mesa de dibujo · trazados fundamentales (libro, tema 2, págs. 20-26)", () => {
  const G = TRAZADOS_GEOM;
  const arco = (c: Pt, r: number, base: number, desde: number, hasta: number) => [enCirc(c, r, base + desde), enCirc(c, r, base + hasta)] as const;

  it("transportar un segmento: se toma AB, se clava en C, el arco corta a la recta en D y la regla une C con D", async () => {
    const t = pantalla("transporte-segmento-practica");
    t.tocar(G.TS_A);
    t.tocar(G.TS_B);
    expect(t.fase()).toBe("centro");
    t.tocar(G.TS_C);
    t.arrastrar(...arco(G.TS_C, d(G.TS_A, G.TS_B), 0, -25, 10));
    expect(t.fase()).toBe("punto");
    t.tocar([G.TS_D[0] - 60, G.TS_D[1]]);
    expect(t.aviso()).toContain("no es el punto");
    t.tocar(G.TS_D);
    await esperarAuto();
    t.superada();
  });

  it("suma de tres segmentos: cada uno se lleva a continuación del anterior y NM = a + b + c", async () => {
    const t = pantalla("suma-segmentos-practica");
    G.SUMA_TIRAS.forEach((tira, k) => {
      expect(t.fase()).toBe("medida");
      t.tocar([60, tira.y]);
      t.tocar([60 + tira.len, tira.y]);
      t.tocar(G.SUMA_PUNTOS[k]);
      t.arrastrar(...arco(G.SUMA_PUNTOS[k], tira.len, 0, -25, 10));
      expect(t.fase()).toBe("punto");
      t.tocar(G.SUMA_PUNTOS[k + 1]);
    });
    expect(t.fase()).toBe("auto");
    await esperarAuto();
    t.superada();
  });

  it("diferencia de segmentos: n se lleva sobre m desde A y EB = m − n", async () => {
    const t = pantalla("diferencia-segmentos-practica");
    t.tocar([90, 125]);
    t.tocar([90 + G.DS_N, 125]);
    t.tocar(G.DS_A);
    t.arrastrar(...arco(G.DS_A, G.DS_N, 0, -25, 10));
    t.tocar(G.DS_E);
    await esperarAuto();
    t.superada();
  });

  it("paralela con el compás: N, M y R con arcos del mismo radio y la regla une P con R", async () => {
    const t = pantalla("paralelo-compas-practica");
    const r = 175;
    const g = G.geomPar(r);
    t.tocar(G.PP);
    t.arrastrar(enCirc(G.PP, 110, 35));
    t.fijar();
    expect(t.fase()).toBe("abertura");
    expect(t.aviso()).toContain("no llega a cortar");
    t.arrastrar(enCirc(G.PP, r, 35));
    t.fijar();
    expect(t.fase()).toBe("arco");
    const m1 = -g.tN / 2;
    t.arrastrar(enCirc(G.PP, r, m1 - (g.tN / 2 + 6)), enCirc(G.PP, r, m1 + (g.tN / 2 + 6)));
    expect(t.fase()).toBe("punto");
    t.tocar(g.M);
    expect(t.aviso()).toContain("no es el punto");
    t.tocar(g.N);
    t.tocar(g.N);
    const m2 = 180 - g.tN / 2;
    t.arrastrar(enCirc(g.N, r, m2 - (g.tN / 2 + 6)), enCirc(g.N, r, m2 + (g.tN / 2 + 6)));
    t.tocar(g.M);
    t.tocar(g.M);
    t.tocar(G.PP);
    expect(t.fase()).toBe("centro");
    t.tocar(g.N);
    const m3 = ang(g.N, g.R);
    t.arrastrar(enCirc(g.N, d(g.M, G.PP), m3 - 12), enCirc(g.N, d(g.M, G.PP), m3 + 12));
    t.tocar(g.R);
    expect(t.fase()).toBe("auto");
    await esperarAuto();
    t.superada();
  });

  it("perpendicular por un punto de la recta: A y B a igual distancia de P y mediatriz de AB", () => {
    const t = pantalla("perpendicular-punto-practica");
    const r0 = 90;
    const A: Pt = [G.QP[0] - r0, G.QP[1]];
    const B: Pt = [G.QP[0] + r0, G.QP[1]];
    t.tocar(G.QP);
    t.arrastrar(enCirc(G.QP, r0, 40));
    t.fijar();
    t.arrastrar(enCirc(G.QP, r0, 10), enCirc(G.QP, r0, 90), enCirc(G.QP, r0, 170));
    expect(t.fase()).toBe("punto");
    t.tocar(B);
    expect(t.aviso()).toContain("no es el punto");
    t.tocar(A);
    t.tocar(B);
    expect(t.fase()).toBe("centro");
    t.tocar(A);
    t.arrastrar(enCirc(A, 130, 35));
    t.fijar();
    const th = (Math.acos(r0 / 130) * 180) / Math.PI + 8;
    t.arrastrar(enCirc(A, 130, th), enCirc(A, 130, -th));
    t.tocar(B);
    t.arrastrar(enCirc(B, 130, 180 + th), enCirc(B, 130, 180 - th));
    expect(t.fase()).toBe("regla");
    const [c1, c2] = interseccionCirculos(A, 130, B, 130) as [Pt, Pt];
    t.tocar(c1);
    t.tocar(c2);
    t.superada();
  });

  it("construir 60° y 30°: arcos iguales desde O y A dan B; arcos iguales desde A y B dan C", async () => {
    const t = pantalla("construye-angulos-practica");
    const r = 150;
    const g = G.geomAng(r);
    t.tocar(G.AO);
    t.arrastrar(enCirc(G.AO, r, 20));
    t.fijar();
    t.arrastrar(enCirc(G.AO, r, -4), enCirc(G.AO, r, 64));
    t.tocar(g.A);
    t.tocar(g.A);
    t.arrastrar(enCirc(g.A, r, 100), enCirc(g.A, r, 135));
    t.tocar(g.B);
    t.tocar(G.AO);
    t.tocar(g.B);
    expect(t.fase()).toBe("centro");
    t.tocar(g.A);
    const bC = ang(g.A, g.C);
    t.arrastrar(enCirc(g.A, r, bC - 12), enCirc(g.A, r, bC + 12));
    t.tocar(g.B);
    const bC2 = ang(g.B, g.C);
    t.arrastrar(enCirc(g.B, r, bC2 - 12), enCirc(g.B, r, bC2 + 12));
    expect(t.fase()).toBe("punto");
    t.tocar(g.C);
    await esperarAuto();
    t.superada();
  });

  it("elementos geométricos: cada paso destaca un solo elemento", () => {
    const { siguiente } = montar("elementos-geometricos");
    for (let i = 0; i < 7; i += 1) {
      expect(screen.getAllByTestId("bench-elemento-activo")).toHaveLength(1);
      if (i < 6) siguiente();
    }
  });

  it("las explicaciones muestran sus resultados finales", () => {
    const a = montar("suma-segmentos-compas");
    a.siguiente(4);
    expect(screen.getByTestId("bench-suma-total")).toBeTruthy();
    cleanup();
    const b = montar("diferencia-segmentos-compas");
    b.siguiente(3);
    expect(screen.getByTestId("bench-diferencia")).toBeTruthy();
    cleanup();
    const c = montar("angulos-tipos");
    c.siguiente(11);
    expect(screen.getByTestId("bench-angulos-tipos")).toBeTruthy();
  });
});

describe("mesa de dibujo · integración", () => {
  it("se monta desde una diapositiva (SlideBlockView)", () => {
    render(
      <LessonStepControlProvider>
        <SlideBlockView block={{ kind: "bench", scene: "instrumentos-catalogo", notes: notas(6) }} />
      </LessonStepControlProvider>,
    );
    expect(screen.getByTestId("bench-catalogo")).toBeTruthy();
  });

  it("act está disponible para los tests de intercambio de estado", () => {
    expect(typeof act).toBe("function");
  });
});
