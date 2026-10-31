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

afterEach(cleanup);

const notas = (n: number) => Array.from({ length: n }, (_, i) => ({ title: `Título ${i + 1}`, text: `Texto del paso ${i + 1}`, fact: i === 0 ? "Dato" : undefined }));
const escenas = Object.keys(BENCH_STEPS) as BenchSceneId[];

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

  it("mediatriz: con poca abertura los arcos no se cortan (incorrecto); abriendo el compás, sí (correcto)", () => {
    const mal = montar("mediatriz-compas");
    mal.siguiente(4);
    expect(screen.queryByTestId("bench-recta")).toBeNull();
    act(() => mal.out.control!.onClick()); // abertura inicial: 70 mm < mitad de AB (100 mm)
    expect(mal.onCheck).toHaveBeenCalledWith({ correct: false, snapshot: { kind: "bench_task", isCorrect: false } });
    expect(screen.getByTestId("bench-resultado").textContent).toContain("no llegan a cortarse");
    cleanup();

    const bien = montar("mediatriz-compas");
    bien.siguiente(4);
    const compas = screen.getByTestId("bench-compas");
    for (let i = 0; i < 10; i += 1) fireEvent.keyDown(compas, { key: "ArrowRight" }); // 70 + 40 = 110 mm
    expect(Number(compas.getAttribute("aria-valuenow"))).toBe(110);
    act(() => bien.out.control!.onClick());
    expect(bien.onCheck).toHaveBeenCalledWith({ correct: true, snapshot: { kind: "bench_task", isCorrect: true } });
    expect(screen.getByTestId("bench-recta")).toBeTruthy();
  });

  it("mediatriz: arrastrar la mina cambia la abertura y tiene límites", () => {
    const { siguiente } = montar("mediatriz-compas");
    siguiente(4);
    const compas = screen.getByTestId("bench-compas");
    fireEvent.pointerDown(compas, { clientX: 300, clientY: 150, pointerId: 1 });
    fireEvent.pointerMove(compas, { clientX: 210 + 150, clientY: 190, pointerId: 1 });
    expect(Number(compas.getAttribute("aria-valuenow"))).toBe(150);
    fireEvent.pointerMove(compas, { clientX: 5000, clientY: 190, pointerId: 1 });
    expect(Number(compas.getAttribute("aria-valuenow"))).toBe(170);
    fireEvent.pointerMove(compas, { clientX: 211, clientY: 190, pointerId: 1 });
    expect(Number(compas.getAttribute("aria-valuenow"))).toBe(40);
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

  it("bisectriz: abertura insuficiente es incorrecta y suficiente es correcta", () => {
    const mal = montar("bisectriz-compas", { a: 70 });
    mal.siguiente(4);
    act(() => mal.out.control!.onClick());
    expect(mal.onCheck).toHaveBeenCalledWith({ correct: false, snapshot: { kind: "bench_task", isCorrect: false } });
    cleanup();

    const bien = montar("bisectriz-compas", { a: 70 });
    bien.siguiente(4);
    const compas = screen.getByTestId("bench-compas");
    for (let i = 0; i < 14; i += 1) fireEvent.keyDown(compas, { key: "ArrowRight" });
    act(() => bien.out.control!.onClick());
    expect(bien.onCheck).toHaveBeenCalledWith({ correct: true, snapshot: { kind: "bench_task", isCorrect: true } });
    expect(screen.getByTestId("bench-bisectriz-recta")).toBeTruthy();
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
