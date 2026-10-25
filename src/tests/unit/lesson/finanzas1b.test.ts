import { describe, expect, it } from "vitest";
import {
  aportacionParaCapital, capitalizacion, cuotaAmortizacion, deudaDeCuota, montante, periodosHasta, round, saldoTras, tae, variacionEncadenada,
} from "@/components/lesson/anim/finanzas1b";

describe("matemática financiera de CCSS I", () => {
  it("interés compuesto", () => {
    expect(round(montante(3600, 3, 25))).toBe(7537.6);
    expect(round(montante(3600, 1.5, 50))).toBe(7578.87);
    expect(periodosHasta(12000, 12325, 0.5)).toBeCloseTo(5.358, 3);
    expect(periodosHasta(18, 36, 5)).toBeCloseTo(14.207, 3);
    expect(periodosHasta(0, 5, 5)).toBeNull();
  });
  it("anualidades de capitalización", () => {
    expect(round(capitalizacion(90, 3, 4, 80))).toBe(9890.15);
    expect(round(capitalizacion(60, 3, 12, 48))).toBe(3063.51);
    expect(round(aportacionParaCapital(18000, 3, 1, 12))).toBe(1231.38);
    expect(round(capitalizacion(1000, 5, 1, 4))).toBe(4525.63);
    expect(capitalizacion(100, 0, 1, 10)).toBe(1000);
  });
  it("anualidades de amortización", () => {
    expect(round(cuotaAmortizacion(1800, 2, 12, 24))).toBe(76.57);
    expect(round(cuotaAmortizacion(72000, 2, 12, 240))).toBe(364.24);
    expect(round(deudaDeCuota(16200, 3, 1, 13))).toBe(172286.28);
    expect(round(deudaDeCuota(5000, 2, 1, 10))).toBe(44912.93);
    expect(cuotaAmortizacion(1200, 0, 12, 12)).toBe(100);
  });
  it("la deuda se salda: saldo final cero", () => {
    expect(Math.abs(saldoTras(72000, 2, 12, 240, 240))).toBeLessThan(1e-6);
    expect(round(saldoTras(1000, 5, 1, 2, 1))).toBe(512.2);
  });
  it("TAE y variaciones encadenadas", () => {
    expect(round(tae(2, 4), 3)).toBe(2.015);
    expect(round(tae(4, 12), 2)).toBe(4.07);
    expect(tae(3, 1)).toBeCloseTo(3, 10);
    expect(round(variacionEncadenada(3, 2), 2)).toBe(5.06);
  });
});
