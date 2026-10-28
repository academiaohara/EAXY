import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { CASOS_ROBOT, accionRobot, anguloServo, blink, decideSeguidor, distanciaCm, echoUs, lecturaPin, mapea, puenteH, pwmTension, temperaturaLm35 } from "@/components/lesson/slide/tools/TecEso3RoboticaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso3-blink-explorador", "eso3-pull-explorador", "eso3-lectura-analogica-explorador", "eso3-pwm-explorador", "eso3-puente-h-explorador", "eso3-seguidor-explorador", "eso3-ultrasonido-explorador", "eso3-robot-pruebas-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 3.º ESO, tema 6: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 6", () => {
  it("parpadeo, pines y sensores analógicos", () => {
    expect(blink(300, 700)).toEqual({ periodo: 1000, freq: 1, duty: 30 });
    expect(blink(0, 0).freq).toBe(0);
    expect(lecturaPin("pull-down", true)).toContain("1");
    expect(lecturaPin("pull-up", true)).toContain("0");
    expect(lecturaPin("ninguna", false)).toContain("indefinido");
    expect(mapea(512, 0, 1023, 0, 180)).toBeCloseTo(90, 0);
    expect(mapea(5, 3, 3, 0, 10)).toBe(0);
    expect(temperaturaLm35(51.15)).toBeCloseTo(25, 0);
  });
  it("PWM, servo y puente en H", () => {
    expect(pwmTension(204)).toBeCloseTo(4);
    expect(pwmTension(999)).toBe(5);
    expect(anguloServo(1.5)).toBe(90);
    expect(anguloServo(3)).toBe(180);
    expect(puenteH(true, false, false, true)).toBe("Gira hacia delante");
    expect(puenteH(false, true, true, false)).toBe("Gira hacia atrás");
    expect(puenteH(true, true, false, false)).toBe("Cortocircuito");
    expect(puenteH(false, false, false, false)).toContain("Parado");
  });
  it("seguidor, ultrasonidos y pruebas", () => {
    expect(decideSeguidor(false, false)).toBe("Avanzar");
    expect(decideSeguidor(true, false)).toBe("Girar a la izquierda");
    expect(decideSeguidor(true, true)).toBe("Parar");
    expect(distanciaCm(1166)).toBeCloseTo(20, 0);
    expect(distanciaCm(echoUs(50))).toBeCloseTo(50);
    expect(accionRobot(12, false, false, 10)).toBe("Avanzar");
    expect(accionRobot(12, false, false, 20)).toBe("Frenar");
    const pasan = (um: number) => CASOS_ROBOT.filter((c) => accionRobot(c.dist, c.izq, c.der, um) === c.esperado).length;
    expect(pasan(10)).toBe(3);
    expect(pasan(20)).toBe(CASOS_ROBOT.length);
  });
});
