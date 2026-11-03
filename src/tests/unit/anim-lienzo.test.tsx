// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { AnimLienzo } from "@/components/lesson/slide/AnimLienzo";
import { DIAGRAMAS } from "@/components/lesson/anim/diagramas";

afterEach(cleanup);

describe("AnimLienzo: lienzo con la explicación que cambia", () => {
  it("muestra el título, el paso 1 y cambia el texto al avanzar y retroceder", () => {
    render(<AnimLienzo block={{ kind: "anim", scene: "dt1-diagrama", params: { clave: "d12-trazas" } }} titulo="Trazas de una recta" />);
    const n = DIAGRAMAS["d12-trazas"]!.pasos.length;
    expect(screen.getByTestId("anim-lienzo-titulo").textContent).toBe("Trazas de una recta");
    expect(screen.getByTestId("anim-lienzo-paso").textContent).toBe(`Paso 1 de ${n}`);
    expect((screen.getByTestId("anim-lienzo-anterior") as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByTestId("anim-lienzo-siguiente"));
    expect(screen.getByTestId("anim-lienzo-paso").textContent).toBe(`Paso 2 de ${n}`);
    expect(screen.getByTestId("anim-lienzo").getAttribute("data-beat")).toBe("1");
    fireEvent.click(screen.getByTestId("anim-lienzo-anterior"));
    expect(screen.getByTestId("anim-lienzo").getAttribute("data-beat")).toBe("0");
  });
  it("llega al último paso y desactiva Siguiente; Repetir vuelve al primero", () => {
    render(<AnimLienzo block={{ kind: "anim", scene: "dt1-diagrama", params: { clave: "d12-recta" } }} titulo="Recta" />);
    const n = DIAGRAMAS["d12-recta"]!.pasos.length;
    for (let i = 0; i < n; i += 1) fireEvent.click(screen.getByTestId("anim-lienzo-siguiente"));
    expect((screen.getByTestId("anim-lienzo-siguiente") as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByTestId("anim-lienzo-repetir"));
    expect(screen.getByTestId("anim-lienzo").getAttribute("data-beat")).toBe("0");
  });
});
