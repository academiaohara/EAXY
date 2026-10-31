import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  initialWorkshopState,
  evaluateWorkshop,
} from "@/components/lesson/tools/dt1-workshop/model";
import { Dt1Workshop } from "@/components/lesson/tools/dt1-workshop/Dt1Workshop";
import { LessonPersistedStateProvider } from "@/components/lesson/LessonPersistedStateContext";
import {
  LessonStepControlProvider,
  useLessonStepControl,
} from "@/components/lesson/LessonStepControlContext";
import type { Dt1WorkshopStep } from "@/lib/lesson/types";

describe("modelos de talleres DT I", () => {
  it("fuera de la proyección del segmento orienta a cambiar también la posición horizontal", () => {
    expect(
      evaluateWorkshop("view-angle", false, { x: 8, y: 2, scale: 1 }).message,
    ).toMatch(/coordenada x/);
  });
  it("un triángulo degenerado no comunica NaN como ángulo", () => {
    const result = evaluateWorkshop("right-angle", false, {
      x: 0,
      y: 0,
      scale: 1,
    });
    expect(result.complete).toBe(false);
    expect(result.readings.join(" ")).not.toMatch(/NaN/);
  });
  it("solo acepta cotas y escala coherentes con el encargo y el documento", () => {
    expect(
      evaluateWorkshop("plan-repair", false, { x: 120, y: 60, scale: 2 })
        .complete,
    ).toBe(true);
    expect(
      evaluateWorkshop("plan-repair", false, { x: 120, y: 60, scale: 5 })
        .complete,
    ).toBe(false);
    expect(
      evaluateWorkshop("plan-repair", true, { x: 150, y: 50, scale: 5 })
        .complete,
    ).toBe(true);
  });
  it("comprueba perpendicularidad y longitudes de la escuadra", () => {
    expect(
      evaluateWorkshop("right-angle", false, { x: 0, y: 3, scale: 1 }).complete,
    ).toBe(true);
    expect(
      evaluateWorkshop("right-angle", false, { x: 2, y: 3, scale: 1 }).complete,
    ).toBe(false);
    expect(
      evaluateWorkshop("right-angle", true, { x: 0, y: 6, scale: 1 }).complete,
    ).toBe(true);
  });
  it("acepta las dos soluciones de distancia y rechaza cumplir solo una condición", () => {
    for (const y of [4, -4])
      expect(
        evaluateWorkshop("locus", false, { x: 0, y, scale: 1 }).complete,
      ).toBe(true);
    expect(
      evaluateWorkshop("locus", false, { x: 0, y: 2, scale: 1 }).complete,
    ).toBe(false);
    expect(
      evaluateWorkshop("locus", true, { x: 0, y: -3, scale: 1 }).complete,
    ).toBe(true);
  });
  it("valida el ángulo real y acepta distintas posiciones del mismo arco", () => {
    for (const [x, y] of [
      [0, 3],
      [1.8, 2.4],
    ])
      expect(
        evaluateWorkshop("view-angle", false, { x, y, scale: 1 }).complete,
      ).toBe(true);
    expect(
      evaluateWorkshop("view-angle", true, { x: 0, y: 5.2, scale: 1 }).complete,
    ).toBe(true);
    expect(
      evaluateWorkshop("view-angle", false, { x: 0, y: 0, scale: 1 }).complete,
    ).toBe(false);
    expect(
      evaluateWorkshop("view-angle", false, { x: -3, y: 0, scale: 1 }).complete,
    ).toBe(false);
  });
  it("los estados iniciales requieren actuar y no aceptan valores no finitos", () => {
    for (const scene of [
      "plan-repair",
      "right-angle",
      "locus",
      "view-angle",
    ] as const) {
      expect(
        evaluateWorkshop(scene, false, initialWorkshopState(scene)).complete,
      ).toBe(false);
      expect(
        evaluateWorkshop(scene, false, { x: NaN, y: Infinity, scale: 0 })
          .complete,
      ).toBe(false);
    }
  });
});

function Probe() {
  const { control } = useLessonStepControl();
  return control ? (
    <button disabled={control.disabled} onClick={() => control.onClick()}>
      {control.label}
    </button>
  ) : null;
}
function Host({
  step,
  onContinue,
}: {
  step: Dt1WorkshopStep;
  onContinue: () => void;
}) {
  const [state, setState] = useState<Record<string, unknown>>({});
  return (
    <LessonPersistedStateProvider
      toolState={state}
      onToolStateChange={setState}
    >
      <LessonStepControlProvider>
        <Dt1Workshop step={step} onContinue={onContinue} />
        <Probe />
      </LessonStepControlProvider>
    </LessonPersistedStateProvider>
  );
}
it("permite corregir un plano, continuar solo al resolverlo y reiniciar", () => {
  const onContinue = vi.fn();
  render(
    <Host
      step={{
        id: "repair",
        type: "interactive_tool",
        tool: "dt1-workshop",
        scene: "plan-repair",
        title: "Repara el plano",
      }}
      onContinue={onContinue}
    />,
  );
  expect(screen.getByRole("button", { name: "Continuar" })).toBeDisabled();
  fireEvent.change(screen.getByLabelText("Cota horizontal (mm)"), {
    target: { value: "120" },
  });
  fireEvent.change(screen.getByLabelText("Cota vertical (mm)"), {
    target: { value: "60" },
  });
  fireEvent.change(screen.getByLabelText("Denominador de escala"), {
    target: { value: "2" },
  });
  expect(screen.getByRole("status")).toHaveTextContent("Listo para fabricar");
  fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
  expect(onContinue).toHaveBeenCalledWith({ completed: true });
  fireEvent.click(screen.getByRole("button", { name: "Reiniciar taller" }));
  expect(screen.getByRole("button", { name: "Continuar" })).toBeDisabled();
});
