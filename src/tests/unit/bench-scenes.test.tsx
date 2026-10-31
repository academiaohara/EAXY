// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useEffect } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LessonStepControlProvider, useLessonStepControl, type LessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { BenchPracticeContext } from "@/components/lesson/bench/practice";
import { BENCH_STEPS } from "@/components/lesson/bench/scenes";
import { SlideBench } from "@/components/lesson/bench/SlideBench";
import { SlideBlockView } from "@/components/lesson/slide/SlideBlocks";
import type { BenchSceneId } from "@/lib/lesson/types";
import type { Pt } from "@/components/lesson/bench/geometry";

afterEach(cleanup);

const notas = (n: number) => Array.from({ length: n }, (_, i) => ({ title: `Título ${i + 1}`, text: `Texto del paso ${i + 1}`, fact: i === 0 ? "Dato" : undefined }));
const todas = Object.keys(BENCH_STEPS) as BenchSceneId[];
/** Escenas donde los pasos se recorren con «Anterior / Siguiente» (las de práctica avanzan al hacer la acción). */
const escenas = todas.filter((e) => !e.endsWith("-practica"));

/** Lee el control que la escena registra en el pie de la lección. */
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

  it("sin ejercicio (diapositiva suelta) no se registra «Comprobar» y no hay botones sueltos", () => {
    const { out } = montar("paralelas-escuadra-cartabon", undefined, false);
    expect(out.control).toBeNull();
    expect(document.querySelectorAll("button")).toHaveLength(2);
  });
});

describe("mesa de dibujo · «Comprobar» en el pie de la lección", () => {
  it("paralelas: el botón existe siempre y solo se activa en el último paso", () => {
    const { out, siguiente } = montar("paralelas-escuadra-cartabon", { a: 0, b: 70 });
    expect(out.control?.label).toBe("Comprobar");
    expect(out.control?.disabled).toBe(true);
    siguiente();
    expect(out.control?.disabled).toBe(true);
    siguiente();
    expect(out.control?.disabled).toBe(false);
    // no hay botón «Trazar» ni lectura de distancia dentro de la escena
    expect(screen.queryByTestId("bench-trazar")).toBeNull();
    expect(screen.queryByTestId("bench-dist")).toBeNull();
    expect(screen.queryByTestId("bench-pista")).toBeNull();
  });

  it("el botón «Comprobar» está en el centro del pie, desactivado hasta el último paso, y comprueba al pulsarlo", () => {
    const { onCheck, siguiente } = montar("paralelas-escuadra-cartabon", { a: 0, b: 70 });
    const boton = () => screen.getByTestId("bench-comprobar") as HTMLButtonElement;
    expect(screen.getByTestId("pie-centro").contains(boton())).toBe(true);
    expect(boton().disabled).toBe(true);
    siguiente(2);
    expect(boton().disabled).toBe(false);
    for (let i = 0; i < 49; i += 1) fireEvent.keyDown(screen.getByTestId("bench-escuadra"), { key: "ArrowUp" });
    fireEvent.click(boton());
    expect(onCheck).toHaveBeenCalledWith({ correct: true, snapshot: { kind: "bench_task", isCorrect: true } });
    expect(screen.queryByTestId("bench-comprobar")).toBeNull(); // el pie de la lección pone la barra verde/naranja
  });

  it("sin ejercicio no hay botón «Comprobar» en el pie", () => {
    montar("paralelas-escuadra-cartabon", undefined, false);
    expect(screen.queryByTestId("bench-comprobar")).toBeNull();
  });

  it("paralelas: bien colocada es correcta y dibuja el trazo; mal colocada, no", () => {
    for (const a of [-10, 0, 12, 30]) {
      const { out, onCheck, siguiente } = montar("paralelas-escuadra-cartabon", { a, b: 70 });
      siguiente(2);
      const esc = screen.getByTestId("bench-escuadra");
      for (let i = 0; i < 49; i += 1) fireEvent.keyDown(esc, { key: "ArrowUp" }); // 98 mm ≈ 70·√2
      act(() => out.control!.onClick());
      expect(onCheck).toHaveBeenCalledWith({ correct: true, snapshot: { kind: "bench_task", isCorrect: true } });
      expect(screen.getByTestId("bench-trazo")).toBeTruthy();
      expect(screen.getByTestId("bench-resultado").getAttribute("data-ok")).toBe("true");
      cleanup();
    }
    const { out, onCheck, siguiente } = montar("paralelas-escuadra-cartabon", { a: 12, b: 70 });
    siguiente(2);
    act(() => out.control!.onClick()); // sin mover la escuadra
    expect(onCheck).toHaveBeenCalledWith({ correct: false, snapshot: { kind: "bench_task", isCorrect: false } });
    expect(screen.queryByTestId("bench-trazo")).toBeNull();
    expect(screen.getByTestId("bench-resultado").getAttribute("data-ok")).toBe("false");
  });

  it("paralelas: arrastrando con el puntero la escuadra se desplaza y tiene tope", () => {
    const { siguiente } = montar("paralelas-escuadra-cartabon", { a: 0, b: 70 });
    siguiente(2);
    const esc = screen.getByTestId("bench-escuadra");
    fireEvent.pointerDown(esc, { clientX: 100, clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(esc, { clientX: 30, clientY: 170, pointerId: 1 }); // 70·√2 ≈ 99 mm
    expect(esc.getAttribute("aria-valuenow")).toBe("99");
    fireEvent.pointerMove(esc, { clientX: -900, clientY: 900, pointerId: 1 });
    expect(esc.getAttribute("aria-valuenow")).toBe("125");
    fireEvent.pointerMove(esc, { clientX: 900, clientY: -900, pointerId: 1 });
    expect(esc.getAttribute("aria-valuenow")).toBe("0");
  });

  it("paralelas: antes del último paso la escuadra no se mueve", () => {
    montar("paralelas-escuadra-cartabon");
    const esc = screen.getByTestId("bench-escuadra");
    fireEvent.keyDown(esc, { key: "ArrowUp" });
    expect(esc.getAttribute("aria-valuenow")).toBe("0");
  });

  it("perpendicular: llegar a P es correcto y dibuja la perpendicular", () => {
    const { out, onCheck, siguiente } = montar("perpendicular-escuadra-cartabon", { a: 0, b: 80 });
    siguiente(2);
    const esc = screen.getByTestId("bench-escuadra");
    fireEvent.pointerDown(esc, { clientX: 100, clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(esc, { clientX: 260, clientY: 100, pointerId: 1 }); // P está a 160 mm de la posición inicial
    expect(esc.getAttribute("aria-valuenow")).toBe("160");
    act(() => out.control!.onClick());
    expect(onCheck).toHaveBeenCalledWith({ correct: true, snapshot: { kind: "bench_task", isCorrect: true } });
    expect(screen.getByTestId("bench-trazo")).toBeTruthy();
  });

  it("perpendicular: quedarse corto es incorrecto", () => {
    const { out, onCheck, siguiente } = montar("perpendicular-escuadra-cartabon", { a: 0 });
    siguiente(2);
    const esc = screen.getByTestId("bench-escuadra");
    fireEvent.pointerDown(esc, { clientX: 100, clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(esc, { clientX: 150, clientY: 100, pointerId: 1 });
    act(() => out.control!.onClick());
    expect(onCheck).toHaveBeenCalledWith({ correct: false, snapshot: { kind: "bench_task", isCorrect: false } });
    expect(screen.queryByTestId("bench-trazo")).toBeNull();
  });

  it("transportador: en el paso de medir hay lectura; en el ejercicio, no (no se regala la respuesta)", () => {
    const { siguiente } = montar("transportador-medir", { a: 37, b: 130 });
    expect(screen.queryByTestId("bench-lectura")).toBeNull();
    siguiente();
    expect(screen.getByTestId("bench-lectura").textContent).toBe("37°");
    siguiente();
    expect(screen.queryByTestId("bench-lectura")).toBeNull();
  });

  it("transportador: 130° es correcto y cualquier otro valor, no", () => {
    const V = [240, 262];
    const punto = (deg: number) => [V[0] + 100 * Math.cos((deg * Math.PI) / 180), V[1] - 100 * Math.sin((deg * Math.PI) / 180)];
    const arrastrar = (deg: number) => {
      const lado = screen.getByTestId("bench-lado");
      const p = punto(deg);
      fireEvent.pointerDown(lado, { clientX: p[0], clientY: p[1], pointerId: 1 });
      fireEvent.pointerMove(lado, { clientX: p[0], clientY: p[1], pointerId: 1 });
      fireEvent.pointerUp(lado, { pointerId: 1 });
    };
    const bien = montar("transportador-medir", { a: 37, b: 130 });
    bien.siguiente(2);
    arrastrar(130);
    expect(screen.getByTestId("bench-lado").getAttribute("aria-valuenow")).toBe("130");
    act(() => bien.out.control!.onClick());
    expect(bien.onCheck).toHaveBeenCalledWith({ correct: true, snapshot: { kind: "bench_task", isCorrect: true } });
    cleanup();
    const mal = montar("transportador-medir", { a: 37, b: 130 });
    mal.siguiente(2);
    arrastrar(128);
    act(() => mal.out.control!.onClick());
    expect(mal.onCheck).toHaveBeenCalledWith({ correct: false, snapshot: { kind: "bench_task", isCorrect: false } });
    expect(screen.getByTestId("bench-resultado").textContent).toContain("te faltan 2°");
  });

  it("transportador: el teclado ajusta y el ángulo se limita a 0°–180°", () => {
    const { siguiente } = montar("transportador-medir");
    siguiente();
    const lado = screen.getByTestId("bench-lado");
    fireEvent.keyDown(lado, { key: "ArrowLeft" });
    expect(screen.getByTestId("bench-lectura").textContent).toBe("38°");
    fireEvent.keyDown(lado, { key: "ArrowRight", shiftKey: true });
    expect(screen.getByTestId("bench-lectura").textContent).toBe("28°");
    fireEvent.pointerDown(lado, { clientX: 240, clientY: 400, pointerId: 1 });
    fireEvent.pointerMove(lado, { clientX: 400, clientY: 400, pointerId: 1 });
    expect(Number(lado.getAttribute("aria-valuenow"))).toBe(0);
  });

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

/* ───────────── Práctica paso a paso con compás y regla ───────────── */

const A: Pt = [210, 190];
const B: Pt = [410, 190];
const enCirc = (c: Pt, r: number, ang: number): Pt => [c[0] + r * Math.cos((ang * Math.PI) / 180), c[1] - r * Math.sin((ang * Math.PI) / 180)];
const ang = (v: Pt, p: Pt) => (Math.atan2(-(p[1] - v[1]), p[0] - v[0]) * 180) / Math.PI;

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
  const comprobar = () => screen.getByTestId("bench-comprobar") as HTMLButtonElement;
  return { ...m, svg, tocar, arrastrar, fase, fijar, comprobar };
}

describe("práctica paso a paso · mediatriz", () => {
  /** Recorre toda la construcción con la abertura `r`; devuelve las funciones para seguir. */
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
    // en B la dirección de referencia es 180°: ρ = ángulo − 180°
    t.arrastrar(enCirc(B, r, 180 + th), enCirc(B, r, 180 - th));
    expect(t.fase()).toBe("regla");
    return t;
  }

  it("el botón «Comprobar» está en el pie y no se activa hasta pasar la regla", () => {
    const t = construir(130);
    expect(t.comprobar().disabled).toBe(true);
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
    expect(screen.getByTestId("bench-aviso").textContent).toContain("punta seca");
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

  it("marcando los dos cortes de los arcos, la regla traza la mediatriz y es correcto", () => {
    const t = construir(130);
    const h = Math.sqrt(130 * 130 - 100 * 100);
    const C: Pt = [310, 190 - h];
    const D: Pt = [310, 190 + h];
    t.tocar([C[0] + 5, C[1] - 4]); // se ajusta al corte aunque no sea exacto
    expect(t.fase()).toBe("regla");
    t.tocar([D[0] - 3, D[1] + 5]);
    expect(t.fase()).toBe("hecha");
    expect(screen.getByTestId("bench-regla-trazo")).toBeTruthy();
    expect(t.comprobar().disabled).toBe(false);
    act(() => t.out.control!.onClick());
    expect(t.onCheck).toHaveBeenCalledWith({ correct: true, snapshot: { kind: "bench_task", isCorrect: true } });
    expect(screen.getByTestId("bench-resultado").getAttribute("data-ok")).toBe("true");
  });

  it("pasar la regla por otros puntos es incorrecto", () => {
    const t = construir(130);
    t.tocar([300, 100]);
    t.tocar([320, 300]);
    act(() => t.out.control!.onClick());
    expect(t.onCheck).toHaveBeenCalledWith({ correct: false, snapshot: { kind: "bench_task", isCorrect: false } });
    expect(screen.getByTestId("bench-resultado").textContent).toContain("no pasa por los dos puntos");
  });

  it("con una abertura menor que la mitad los arcos no se cortan y se explica el motivo", () => {
    const t = construir(70);
    t.tocar([300, 120]);
    t.tocar([320, 260]);
    act(() => t.out.control!.onClick());
    expect(t.onCheck).toHaveBeenCalledWith({ correct: false, snapshot: { kind: "bench_task", isCorrect: false } });
    expect(screen.getByTestId("bench-resultado").textContent).toContain("no se cortan");
  });

  it("«Deshacer» vuelve a la fase anterior y no existe tras comprobar", () => {
    const t = pantalla("mediatriz-practica");
    expect((screen.getByTestId("bench-deshacer") as HTMLButtonElement).disabled).toBe(true);
    t.tocar(A);
    expect((screen.getByTestId("bench-deshacer") as HTMLButtonElement).disabled).toBe(false);
    fireEvent.click(screen.getByTestId("bench-deshacer"));
    expect(t.fase()).toBe("centro");
    expect(screen.queryByTestId("bench-compas")).toBeNull();
  });

  it("no hay botones Anterior / Siguiente en la práctica", () => {
    pantalla("mediatriz-practica");
    expect(screen.queryByTestId("bench-siguiente")).toBeNull();
    expect(screen.queryByTestId("bench-anterior")).toBeNull();
  });
});

describe("práctica paso a paso · bisectriz", () => {
  const V: Pt = [170, 315];
  const alfa = 70;
  function signo(c: Pt, otro: Pt, r: number) {
    const base = ang(c, otro);
    return Math.hypot(...([enCirc(c, r, base + 40)[0] - V[0], enCirc(c, r, base + 40)[1] - V[1]] as Pt)) > Math.hypot(...([enCirc(c, r, base - 40)[0] - V[0], enCirc(c, r, base - 40)[1] - V[1]] as Pt)) ? 1 : -1;
  }

  /** Construye todo salvo el paso de la regla, con aperturas `r0` (desde V) y `r2` (desde P y Q). */
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
    const cu = Math.hypot(P[0] - Q[0], P[1] - Q[1]);
    const th = r2 > cu / 2 ? (Math.acos(Math.min(1, cu / (2 * r2))) * 180) / Math.PI : 45;
    const sQ = signo(Q, P, r2);
    const baseQ = ang(Q, P);
    t.arrastrar(enCirc(Q, r2, baseQ + sQ * 40), enCirc(Q, r2, baseQ + sQ * (th + 10)), enCirc(Q, r2, baseQ + sQ * (th - 10)));
    return { t, P, Q, cu, th, r2 };
  }

  it("recorre los nueve pasos: vértice, abertura, arco, punto, abertura, arco, punto, arco, regla", () => {
    const { t, P, Q, cu, th, r2 } = construir(100, 90);
    expect(t.fase()).toBe("centro");
    expect(screen.getByTestId("bench-paso").textContent).toBe("Paso 7 de 9");
    t.tocar(P);
    expect(t.fase()).toBe("arco");
    const sP = signo(P, Q, r2);
    const baseP = ang(P, Q);
    t.arrastrar(enCirc(P, r2, baseP + sP * 40), enCirc(P, r2, baseP + sP * (th + 10)), enCirc(P, r2, baseP + sP * (th - 10)));
    expect(t.fase()).toBe("regla");
    expect(cu).toBeGreaterThan(0);
  });

  it("marcar el vértice y el corte T es correcto", () => {
    const { t, P, Q, th, r2 } = construir(100, 90);
    t.tocar(P);
    const sP = signo(P, Q, r2);
    const baseP = ang(P, Q);
    t.arrastrar(enCirc(P, r2, baseP + sP * 40), enCirc(P, r2, baseP + sP * (th + 10)), enCirc(P, r2, baseP + sP * (th - 10)));
    // T: en la dirección de la bisectriz, desde el punto medio de PQ hacia fuera
    const M: Pt = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
    const h = Math.sqrt(r2 * r2 - Math.pow(Math.hypot(P[0] - Q[0], P[1] - Q[1]) / 2, 2));
    const T = enCirc(M, h, alfa / 2);
    t.tocar([V[0] + 3, V[1] - 2]);
    t.tocar([T[0] + 4, T[1] - 3]);
    expect(t.fase()).toBe("hecha");
    act(() => t.out.control!.onClick());
    expect(t.onCheck).toHaveBeenCalledWith({ correct: true, snapshot: { kind: "bench_task", isCorrect: true } });
  });

  it("si la regla no pasa por V y por T, es incorrecto", () => {
    const { t, P, Q, th, r2 } = construir(100, 90);
    t.tocar(P);
    const sP = signo(P, Q, r2);
    const baseP = ang(P, Q);
    t.arrastrar(enCirc(P, r2, baseP + sP * 40), enCirc(P, r2, baseP + sP * (th + 10)), enCirc(P, r2, baseP + sP * (th - 10)));
    t.tocar(P);
    t.tocar(Q);
    act(() => t.out.control!.onClick());
    expect(t.onCheck).toHaveBeenCalledWith({ correct: false, snapshot: { kind: "bench_task", isCorrect: false } });
    expect(screen.getByTestId("bench-resultado").textContent).toContain("vértice V");
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

describe("mesa de dibujo · integración", () => {
  it("se monta desde una diapositiva (SlideBlockView)", () => {
    render(
      <LessonStepControlProvider>
        <SlideBlockView block={{ kind: "bench", scene: "instrumentos-catalogo", notes: notas(6) }} />
      </LessonStepControlProvider>,
    );
    expect(screen.getByTestId("bench-catalogo")).toBeTruthy();
  });
});
