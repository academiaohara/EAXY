import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MultiplicacionManoScene } from "@/components/lesson/stage/modules/mul-div-naturales/EscolarAlgorithmViews";

describe("MultiplicacionManoScene controls", () => {
  it("permite avanzar y retroceder pasos manualmente", () => {
    const onReady = vi.fn();
    render(
      <MultiplicacionManoScene
        multiplicand={34}
        multiplier={12}
        autoPlay={false}
        reduced={false}
        onReadyChange={onReady}
      />,
    );
    expect(screen.getByLabelText(/Controles de animación/i)).toBeInTheDocument();
    expect(screen.getByText(/1\//)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Avanzar un paso/i }));
    expect(screen.getByText(/2\//)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Retroceder un paso/i }));
    expect(screen.getByText(/1\//)).toBeInTheDocument();
  });
});
