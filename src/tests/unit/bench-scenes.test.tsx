// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { BENCH_STEPS } from "@/components/lesson/bench/scenes";
import { SlideBench } from "@/components/lesson/bench/SlideBench";
import { SlideBlockView } from "@/components/lesson/slide/SlideBlocks";
import type { BenchSceneId } from "@/lib/lesson/types";

afterEach(cleanup);

const notas = (n: number) => Array.from({ length: n }, (_, i) => ({ title: `Título ${i + 1}`, text: `Texto del paso ${i + 1}`, fact: i === 0 ? "Dato" : undefined }));
const escenas = Object.keys(BENCH_STEPS) as BenchSceneId[];

describe("mesa de dibujo · pasos dentro de la diapositiva", () => {
  it.each(escenas)("%s: recorre todos los pasos y enseña el texto de cada uno", (scene) => {
    render(<SlideBench block={{ kind: "bench", scene, notes: notas(BENCH_STEPS[scene]) }} />);
    for (let i = 0; i < BENCH_STEPS[scene]; i += 1) {
      expect(screen.getByTestId("bench-paso").textContent).toBe(`Paso ${i + 1} de ${BENCH_STEPS[scene]}`);
      expect(screen.getByTestId("bench-titulo").textContent).toBe(`Título ${i + 1}`);
      if (i < BENCH_STEPS[scene] - 1) fireEvent.click(screen.getByTestId("bench-siguiente"));
    }
    expect((screen.getByTestId("bench-siguiente") as HTMLButtonElement).disabled).toBe(true);
    for (let i = BENCH_STEPS[scene] - 1; i > 0; i -= 1) fireEvent.click(screen.getByTestId("bench-anterior"));
    expect((screen.getByTestId("bench-anterior") as HTMLButtonElement).disabled).toBe(true);
  });

  it("catálogo: cada paso destaca un solo instrumento", () => {
    render(<SlideBench block={{ kind: "bench", scene: "instrumentos-catalogo", notes: notas(6) }} />);
    for (let i = 0; i < 6; i += 1) {
      expect(document.querySelectorAll('[data-foco="true"]')).toHaveLength(1);
      if (i < 5) fireEvent.click(screen.getByTestId("bench-siguiente"));
    }
  });

  it("catálogo: no tiene controles interactivos salvo los pasos", () => {
    render(<SlideBench block={{ kind: "bench", scene: "instrumentos-catalogo", notes: notas(6) }} />);
    expect(document.querySelectorAll("input")).toHaveLength(0);
    expect(document.querySelectorAll("button")).toHaveLength(2);
  });
});

describe("mesa de dibujo · paralelas con la escuadra arrastrable", () => {
  const abrir = (a = 12, b = 70) => {
    render(<SlideBench block={{ kind: "bench", scene: "paralelas-escuadra-cartabon", notes: notas(3), params: { a, b } }} />);
    fireEvent.click(screen.getByTestId("bench-siguiente"));
    fireEvent.click(screen.getByTestId("bench-siguiente"));
  };

  it("no hay deslizadores ni giro de r", () => {
    abrir();
    expect(document.querySelectorAll("input")).toHaveLength(0);
  });

  it("el cartabón aparece en el segundo paso", () => {
    render(<SlideBench block={{ kind: "bench", scene: "paralelas-escuadra-cartabon", notes: notas(3) }} />);
    expect(screen.getByTestId("bench-cartabon").getAttribute("style")).toContain("opacity: 0");
    fireEvent.click(screen.getByTestId("bench-siguiente"));
    expect(screen.getByTestId("bench-cartabon").getAttribute("style")).toContain("opacity: 1");
  });

  it("antes del tercer paso la escuadra no se mueve", () => {
    render(<SlideBench block={{ kind: "bench", scene: "paralelas-escuadra-cartabon", notes: notas(3) }} />);
    const esc = screen.getByTestId("bench-escuadra");
    fireEvent.keyDown(esc, { key: "ArrowUp" });
    expect(esc.getAttribute("aria-valuenow")).toBe("0");
  });

  it("no se puede trazar hasta que el borde pasa por P; después sí", () => {
    for (const a of [-10, 0, 12, 30]) {
      abrir(a, 70);
      const trazar = screen.getByTestId("bench-trazar") as HTMLButtonElement;
      const esc = screen.getByTestId("bench-escuadra");
      expect(trazar.disabled).toBe(true);
      for (let i = 0; i < 20; i += 1) fireEvent.keyDown(esc, { key: "ArrowUp" }); // 40 mm: aún lejos
      expect(trazar.disabled).toBe(true);
      for (let i = 0; i < 29; i += 1) fireEvent.keyDown(esc, { key: "ArrowUp" }); // 98 mm ≈ 70·√2
      expect(trazar.disabled).toBe(false);
      fireEvent.click(trazar);
      expect(screen.getByTestId("bench-trazo")).toBeTruthy();
      cleanup();
    }
  });

  it("arrastrando con el puntero la escuadra se desplaza y se puede trazar", () => {
    abrir(0, 70);
    const esc = screen.getByTestId("bench-escuadra");
    // jsdom no tiene matriz de pantalla: las coordenadas del puntero se usan tal cual (1 px = 1 mm).
    fireEvent.pointerDown(esc, { clientX: 100, clientY: 100, pointerId: 1 });
    // con r horizontal, la escuadra baja por su hipotenusa: h = (−√½, +√½); 70·√2 ≈ 99 mm de recorrido
    fireEvent.pointerMove(esc, { clientX: 100 - 70, clientY: 100 + 70, pointerId: 1 });
    expect(Number(esc.getAttribute("aria-valuenow"))).toBe(99);
    expect((screen.getByTestId("bench-trazar") as HTMLButtonElement).disabled).toBe(false);
    fireEvent.pointerUp(esc, { pointerId: 1 });
    fireEvent.click(screen.getByTestId("bench-trazar"));
    expect(screen.getByTestId("bench-trazo")).toBeTruthy();
  });

  it("el recorrido de la escuadra tiene tope", () => {
    abrir(0, 70);
    const esc = screen.getByTestId("bench-escuadra");
    fireEvent.pointerDown(esc, { clientX: 0, clientY: 0, pointerId: 1 });
    fireEvent.pointerMove(esc, { clientX: -900, clientY: 900, pointerId: 1 });
    expect(Number(esc.getAttribute("aria-valuenow"))).toBe(125);
    fireEvent.pointerMove(esc, { clientX: 900, clientY: -900, pointerId: 1 });
    expect(Number(esc.getAttribute("aria-valuenow"))).toBe(0);
  });

  it("volver al paso 1 reinicia la escuadra y borra el trazo", () => {
    abrir(0, 70);
    const esc = screen.getByTestId("bench-escuadra");
    fireEvent.pointerDown(esc, { clientX: 100, clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(esc, { clientX: 30, clientY: 170, pointerId: 1 });
    fireEvent.pointerUp(esc, { pointerId: 1 });
    fireEvent.click(screen.getByTestId("bench-trazar"));
    fireEvent.click(screen.getByTestId("bench-anterior"));
    expect(screen.queryByTestId("bench-trazo")).toBeNull();
    expect(screen.getByTestId("bench-escuadra").getAttribute("aria-valuenow")).toBe("0");
  });
});

describe("mesa de dibujo · perpendicular, transportador, mediatriz y bisectriz", () => {
  it("perpendicular: arrastrando la escuadra por r llega a P y se puede trazar", () => {
    render(<SlideBench block={{ kind: "bench", scene: "perpendicular-escuadra-cartabon", notes: notas(3), params: { a: 0, b: 80 } }} />);
    const esc = screen.getByTestId("bench-escuadra");
    expect(esc.getAttribute("aria-valuenow")).toBe("0");
    fireEvent.click(screen.getByTestId("bench-siguiente"));
    fireEvent.click(screen.getByTestId("bench-siguiente"));
    const trazar = screen.getByTestId("bench-trazar") as HTMLButtonElement;
    expect(trazar.disabled).toBe(true);
    // con r horizontal, 1 px = 1 mm: P está a 160 mm de la posición inicial
    fireEvent.pointerDown(esc, { clientX: 100, clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(esc, { clientX: 100 + 160, clientY: 100, pointerId: 1 });
    expect(esc.getAttribute("aria-valuenow")).toBe("160");
    expect(trazar.disabled).toBe(false);
    fireEvent.pointerUp(esc, { pointerId: 1 });
    fireEvent.click(trazar);
    expect(screen.getByTestId("bench-trazo")).toBeTruthy();
  });

  it("perpendicular: tiene tope y no avanza hacia atrás de la posición inicial", () => {
    render(<SlideBench block={{ kind: "bench", scene: "perpendicular-escuadra-cartabon", notes: notas(3), params: { a: 0 } }} />);
    fireEvent.click(screen.getByTestId("bench-siguiente"));
    fireEvent.click(screen.getByTestId("bench-siguiente"));
    const esc = screen.getByTestId("bench-escuadra");
    fireEvent.pointerDown(esc, { clientX: 0, clientY: 0, pointerId: 1 });
    fireEvent.pointerMove(esc, { clientX: 900, clientY: 0, pointerId: 1 });
    expect(esc.getAttribute("aria-valuenow")).toBe("260");
    fireEvent.pointerMove(esc, { clientX: -900, clientY: 0, pointerId: 1 });
    expect(esc.getAttribute("aria-valuenow")).toBe("0");
  });

  it("transportador: la lectura sigue al lado arrastrado y reconoce el objetivo", () => {
    render(<SlideBench block={{ kind: "bench", scene: "transportador-medir", notes: notas(3), params: { a: 37, b: 130 } }} />);
    expect(screen.queryByTestId("bench-lado")).toBeNull();
    fireEvent.click(screen.getByTestId("bench-siguiente"));
    const lado = screen.getByTestId("bench-lado");
    expect(screen.getByTestId("bench-lectura").textContent).toBe("37°");
    fireEvent.click(screen.getByTestId("bench-siguiente"));
    expect(screen.getByTestId("bench-estado").textContent).toContain("130°");
    // vértice V = (240, 262): un punto a 130° está arriba-izquierda
    const V = [240, 262];
    const p = [V[0] + 100 * Math.cos((130 * Math.PI) / 180), V[1] - 100 * Math.sin((130 * Math.PI) / 180)];
    fireEvent.pointerDown(lado, { clientX: p[0], clientY: p[1], pointerId: 1 });
    fireEvent.pointerMove(lado, { clientX: p[0], clientY: p[1], pointerId: 1 });
    expect(screen.getByTestId("bench-lectura").textContent).toBe("130°");
    expect(screen.getByTestId("bench-estado").textContent).toContain("Correcto");
  });

  it("transportador: el ángulo se limita a 0°–180° y el teclado lo ajusta", () => {
    render(<SlideBench block={{ kind: "bench", scene: "transportador-medir", notes: notas(3) }} />);
    fireEvent.click(screen.getByTestId("bench-siguiente"));
    const lado = screen.getByTestId("bench-lado");
    fireEvent.keyDown(lado, { key: "ArrowLeft" });
    expect(screen.getByTestId("bench-lectura").textContent).toBe("38°");
    fireEvent.keyDown(lado, { key: "ArrowRight", shiftKey: true });
    expect(screen.getByTestId("bench-lectura").textContent).toBe("28°");
    fireEvent.pointerDown(lado, { clientX: 240, clientY: 400, pointerId: 1 }); // debajo del vértice
    fireEvent.pointerMove(lado, { clientX: 400, clientY: 400, pointerId: 1 });
    expect(Number(lado.getAttribute("aria-valuenow"))).toBe(0);
  });

  it("mediatriz: los arcos aparecen por pasos y Q equidista de A y B", () => {
    render(<SlideBench block={{ kind: "bench", scene: "mediatriz-compas", notes: notas(4) }} />);
    expect(screen.getByTestId("bench-compas")).toBeTruthy();
    expect(screen.queryByTestId("bench-arcos-b")).toBeNull();
    fireEvent.click(screen.getByTestId("bench-siguiente"));
    expect(screen.getByTestId("bench-arcos-b")).toBeTruthy();
    expect(screen.queryByTestId("bench-recta")).toBeNull();
    fireEvent.click(screen.getByTestId("bench-siguiente"));
    expect(screen.getByTestId("bench-recta")).toBeTruthy();
    expect(screen.queryByTestId("bench-compas")).toBeNull();
    fireEvent.click(screen.getByTestId("bench-siguiente"));
    const q = screen.getByTestId("bench-q");
    for (const y of [60, 150, 300]) {
      fireEvent.pointerDown(q, { clientX: 310, clientY: 150, pointerId: 1 });
      fireEvent.pointerMove(q, { clientX: 310, clientY: y, pointerId: 1 });
      fireEvent.pointerUp(q, { pointerId: 1 });
      const [qa, qb] = (screen.getByTestId("bench-dists").textContent ?? "").match(/[\d,]+(?= mm)/g) ?? [];
      expect(qa).toBe(qb);
    }
  });

  it("bisectriz: cuatro pasos y la bisectriz solo al final", () => {
    render(<SlideBench block={{ kind: "bench", scene: "bisectriz-compas", notes: notas(4), params: { a: 110 } }} />);
    for (let i = 0; i < 3; i += 1) {
      expect(screen.queryByTestId("bench-bisectriz-recta")).toBeNull();
      fireEvent.click(screen.getByTestId("bench-siguiente"));
    }
    expect(screen.getByTestId("bench-bisectriz-recta")).toBeTruthy();
    expect(screen.queryByTestId("bench-compas")).toBeNull();
  });
});

describe("mesa de dibujo · integración", () => {
  it("se monta desde una diapositiva (SlideBlockView)", () => {
    render(<SlideBlockView block={{ kind: "bench", scene: "instrumentos-catalogo", notes: notas(6) }} />);
    expect(screen.getByTestId("bench-catalogo")).toBeTruthy();
  });
});
