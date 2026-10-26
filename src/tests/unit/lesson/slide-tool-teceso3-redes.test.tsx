import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { cablesTopologia, combinacionesClave, envios, formatoLargo, paquetes, redIp, segundosFuerzaBruta, senalWifi, vidaBateria } from "@/components/lesson/slide/tools/TecEso3RedesTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso3-periferico-explorador", "eso3-topologia-explorador", "eso3-ip-explorador", "eso3-wifi-explorador", "eso3-paquetes-explorador", "eso3-bateria-iot-explorador", "eso3-clave-wifi-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 3.º ESO, tema 7: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 7", () => {
  it("topologías y direcciones IP", () => {
    expect(cablesTopologia("malla", 6)).toBe(15);
    expect(cablesTopologia("estrella", 8)).toBe(8);
    expect(cablesTopologia("bus", 5)).toBe(6);
    const r = redIp([192, 168, 1, 25], 24);
    expect(r).toEqual({ mascara: "255.255.255.0", red: "192.168.1.0", difusion: "192.168.1.255", equipos: 254 });
    expect(redIp([192, 168, 1, 25], 26)).toMatchObject({ red: "192.168.1.0", difusion: "192.168.1.63", equipos: 62 });
    expect(redIp([10, 0, 5, 200], 16)).toMatchObject({ red: "10.0.0.0", difusion: "10.0.255.255", mascara: "255.255.0.0" });
  });
  it("Wi-Fi, paquetes y batería", () => {
    expect(senalWifi(1, 0, 2.4).calidad).toBe("Excelente");
    expect(senalWifi(40, 4, 5).calidad).toBe("Mala");
    expect(senalWifi(10, 2, 2.4).rssi).toBeGreaterThan(senalWifi(10, 2, 5).rssi);
    expect(paquetes(14600)).toBe(10);
    expect(paquetes(0)).toBe(0);
    expect(envios(200, 10)).toBeCloseTo(222.2, 1);
    expect(envios(10, 100)).toBe(Infinity);
    const b = vidaBateria(2000, 10, 3, 80, 10);
    expect(b.dias).toBeGreaterThan(vidaBateria(2000, 1, 3, 80, 10).dias);
    expect(vidaBateria(2000, 1, 3, 80, 0).mediaMa).toBeCloseTo((80 * 3) / 60);
  });
  it("fuerza bruta", () => {
    expect(combinacionesClave(26, 4)).toBe(456976);
    expect(segundosFuerzaBruta(2e9)).toBe(1);
    expect(formatoLargo(0.1)).toBe("menos de 1 segundo");
    expect(formatoLargo(90000)).toContain("día");
    expect(formatoLargo(1e30)).toBe("más que la edad del universo");
  });
});
