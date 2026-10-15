import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LessonStepControlProvider } from "@/components/lesson/LessonStepControlContext";
import { RaicesCuadradasModule } from "@/components/lesson/stage/modules/raices-cuadradas/RaicesCuadradasModule";

vi.mock("@/lib/lesson/stage/use-reduced-motion", () => ({
  useReducedMotion: () => true,
}));

describe("RaicesCuadradasModule", () => {
  it("renderiza la escena inversa-cuadrado con test id estable", () => {
    render(
      <LessonStepControlProvider>
        <RaicesCuadradasModule
          stepId="test"
          scene="inversa-cuadrado"
          root={5}
          onReadyChange={() => {}}
        />
      </LessonStepControlProvider>,
    );
    expect(screen.getByTestId("raices-inversa-cuadrado")).toBeInTheDocument();
  });
});
