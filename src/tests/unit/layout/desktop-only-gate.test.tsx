import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DesktopOnlyGate } from "@/components/layout/desktop-only-gate";
import { DESKTOP_MIN_WIDTH_PX } from "@/lib/layout/desktop-only";

describe("DesktopOnlyGate", () => {
  it("muestra aviso de solo escritorio y envuelve el contenido", () => {
    render(
      <DesktopOnlyGate>
        <p data-testid="app-content">Contenido</p>
      </DesktopOnlyGate>,
    );

    expect(screen.getByTestId("desktop-only-blocker")).toHaveTextContent("Solo ordenador");
    expect(screen.getByTestId("desktop-only-blocker")).toHaveTextContent(String(DESKTOP_MIN_WIDTH_PX));
    expect(screen.getByTestId("app-content")).toBeInTheDocument();
  });
});
