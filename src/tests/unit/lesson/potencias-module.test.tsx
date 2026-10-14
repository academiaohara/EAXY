import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LessonStepControlProvider } from "@/components/lesson/LessonStepControlContext";
import { PotenciasModule } from "@/components/lesson/stage/modules/potencias/PotenciasModule";

vi.mock("@/lib/lesson/stage/use-reduced-motion", () => ({
  useReducedMotion: () => true,
}));

describe("PotenciasModule", () => {
  it("renderiza la escena base-exponente con test id estable", () => {
    render(
      <LessonStepControlProvider>
        <PotenciasModule
          stepId="test"
          scene="base-exponente"
          base={6}
          exponent={4}
          onReadyChange={() => {}}
        />
      </LessonStepControlProvider>,
    );
    expect(screen.getByTestId("potencias-base-exponente")).toBeInTheDocument();
  });
});
