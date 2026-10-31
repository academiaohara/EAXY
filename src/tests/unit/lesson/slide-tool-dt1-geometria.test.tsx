import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { buildSlideAnim, SLIDE_ANIM_REGISTRY } from "@/components/lesson/anim/registry";
import {
  arcConstructionGeometry,
  arcInvarianceGeometry,
  bisectorGeometry,
  intersectionExamplesGeometry,
  pythagorasGeometry,
} from "@/components/lesson/anim/scenes/industrial/dt1-fundamentos";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { anguloEn, arcoCapaz, catetoFaltante, cumpleLugar, esTerna, hipotenusa } from "@/components/lesson/slide/tools/DtGeometriaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dt1-pitagoras-explorador", "dt1-lugar-geometrico-explorador", "dt1-arco-capaz-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

const FOUNDATION_SCENES = [
  ["dt1-plano-informacion", ["VISTAS", "MEDIDAS", "ESCALA", "SÍMBOLOS"]],
  ["dt1-geometria-medida-demostracion", ["MEDIR", "DEMOSTRAR"]],
  ["dt1-pitagoras-areas", ["a²", "b²", "c²"]],
  ["dt1-lugares-condiciones", ["EQUIDISTA", "MEDIATRIZ", "BISECTRIZ"]],
  ["dt1-interseccion-lugares", ["0 soluciones", "1 solución", "2 soluciones"]],
  ["dt1-arco-capaz-invariancia", ["α", "MISMO ÁNGULO"]],
  ["dt1-arco-capaz-construccion", ["MEDIATRIZ", "CENTRO O", "ARCO CAPAZ"]],
  ["dt1-documentos-profesionales", ["PLANTA", "TOLERANCIA", "CIRCUITO", "CURVAS DE NIVEL"]],
  ["dt1-plano-revision", ["FORMA", "TAMAÑO", "SÍMBOLOS"]],
  ["dt1-localizacion-dos-arcos", ["40°", "55°", "OBSERVADOR"]],
] as const;

describe("escenas narrativas del tema 1", () => {
  it.each(FOUNDATION_SCENES)("%s existe, progresa y muestra sus ideas clave", (id, labels) => {
    expect(SLIDE_ANIM_REGISTRY[id as keyof typeof SLIDE_ANIM_REGISTRY]).toBeDefined();
    const built = buildSlideAnim(id as never);
    expect(built.captions.length).toBeGreaterThanOrEqual(3);
    const markup = built.captions
      .map((_, beat) => renderToStaticMarkup(<>{built.render(beat)}</>))
      .join(" ");
    for (const label of labels) {
      expect(markup).toContain(label);
    }
  });
});

const distance = (a: readonly [number, number], b: readonly [number, number]) =>
  Math.hypot(a[0] - b[0], a[1] - b[1]);

describe("corrección geométrica de las escenas narrativas", () => {
  it("Pitágoras construye tres cuadrados y conserva la igualdad de áreas", () => {
    const geometry = pythagorasGeometry();
    for (const square of geometry.squares) {
      const sides = square.points.map((point, index) =>
        distance(point, square.points[(index + 1) % 4]!),
      );
      expect(Math.max(...sides) - Math.min(...sides)).toBeLessThan(0.001);
    }
    expect(geometry.squares[0]!.side ** 2 + geometry.squares[1]!.side ** 2).toBeCloseTo(
      geometry.squares[2]!.side ** 2,
      6,
    );
  });

  it("los ejemplos de intersección tienen realmente 0, 1 y 2 soluciones", () => {
    expect(intersectionExamplesGeometry().map((example) => example.solutions)).toEqual([0, 1, 2]);
  });

  it("todos los puntos de invariancia pertenecen a la circunferencia y ven AB con el mismo ángulo", () => {
    const geometry = arcInvarianceGeometry();
    const angles = geometry.points.map((point) => {
      expect(distance(point, geometry.center)).toBeCloseTo(geometry.radius, 6);
      const pa = [geometry.a[0] - point[0], geometry.a[1] - point[1]] as const;
      const pb = [geometry.b[0] - point[0], geometry.b[1] - point[1]] as const;
      return (Math.acos((pa[0] * pb[0] + pa[1] * pb[1]) / (Math.hypot(...pa) * Math.hypot(...pb))) * 180) / Math.PI;
    });
    expect(Math.max(...angles) - Math.min(...angles)).toBeLessThan(0.001);
  });

  it("la construcción une el arco con A y B y el radio es perpendicular a la tangente", () => {
    const geometry = arcConstructionGeometry();
    expect(distance(geometry.arcStart, geometry.a)).toBeLessThan(0.001);
    expect(distance(geometry.arcEnd, geometry.b)).toBeLessThan(0.001);
    const radius = [geometry.a[0] - geometry.center[0], geometry.a[1] - geometry.center[1]] as const;
    expect(radius[0] * geometry.tangent[0] + radius[1] * geometry.tangent[1]).toBeCloseTo(0, 6);
  });

  it("el punto señalado pertenece a la bisectriz y equidista de ambos lados", () => {
    const geometry = bisectorGeometry();
    expect(geometry.distanceToFirstSide).toBeCloseTo(geometry.distanceToSecondSide, 6);
    expect(geometry.point[0] * geometry.direction[1] - geometry.point[1] * geometry.direction[0]).toBeCloseTo(0, 6);
  });
});

describe("herramientas de Dibujo Técnico I, geometría: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas de geometría", () => {
  it("Pitágoras", () => {
    expect(hipotenusa(3, 4)).toBe(5);
    expect(catetoFaltante(13, 5)).toBeCloseTo(12);
    expect(catetoFaltante(5, 5)).toBeNaN();
    expect(esTerna(3, 4, 5)).toBe(true);
    expect(esTerna(6, 8, 10)).toBe(true);
    expect(esTerna(1, 1, Math.SQRT2)).toBe(false);
    expect(esTerna(4, 4, 5)).toBe(false);
  });
  it("lugares geométricos", () => {
    expect(cumpleLugar("circunferencia", [3, 0]).cumple).toBe(true);
    expect(cumpleLugar("circunferencia", [0, 4]).cumple).toBe(false);
    expect(cumpleLugar("mediatriz", [0, 4]).cumple).toBe(true);
    expect(cumpleLugar("mediatriz", [0, 4]).a).toBeCloseTo(5);
    expect(cumpleLugar("mediatriz", [1, 0]).cumple).toBe(false);
    expect(cumpleLugar("paralelas", [1, 2]).cumple).toBe(true);
    expect(cumpleLugar("paralelas", [1, -2]).cumple).toBe(true);
    expect(cumpleLugar("paralelas", [1, 1]).cumple).toBe(false);
    const c = Math.cos(Math.PI / 6);
    const s = Math.sin(Math.PI / 6);
    expect(cumpleLugar("bisectriz", [2 * c, 2 * s]).cumple).toBe(true);
    expect(cumpleLugar("bisectriz", [2, 0.1]).cumple).toBe(false);
  });
  it("arco capaz", () => {
    expect(arcoCapaz(6, 90).R).toBeCloseTo(3);
    expect(arcoCapaz(6, 90).d).toBeCloseTo(0);
    expect(arcoCapaz(6, 30).R).toBeCloseTo(6);
    const a60 = arcoCapaz(6, 60);
    expect(a60.R).toBeCloseTo(3.4641, 3);
    expect(a60.d).toBeCloseTo(1.7321, 3);
    expect(arcoCapaz(6, 120).d).toBeLessThan(0);
    expect(arcoCapaz(6, 0).R).toBeNaN();
    // cualquier punto del arco ve AB bajo α
    const { R, d } = arcoCapaz(6, 60);
    for (const th of [0.9, 1.3, 1.5708, 1.9, 2.2]) {
      expect(anguloEn([R * Math.cos(th), d + R * Math.sin(th)], [-3, 0], [3, 0])).toBeCloseTo(60, 3);
    }
    expect(anguloEn([0, 0.1], [-3, 0], [3, 0])).toBeGreaterThan(170);
  });
});
