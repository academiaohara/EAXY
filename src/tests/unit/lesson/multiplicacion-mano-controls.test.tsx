import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MultiplicacionManoChalkboard } from "@/components/lesson/stage/modules/mul-div-naturales/MultiplicacionManoChalkboard";

describe("MultiplicacionManoChalkboard", () => {
  it("muestra el aro de unidades en el sub-paso 1 y la fila 68 en el 2", () => {
    const { rerender } = render(
      <MultiplicacionManoChalkboard multiplicand={34} multiplier={12} subStep={1} />,
    );
    expect(screen.getByText("empezamos por las unidades: 2")).toBeInTheDocument();
    expect(screen.queryByText("2 × 34 = 68, ¡primera fila!")).not.toBeInTheDocument();

    rerender(<MultiplicacionManoChalkboard multiplicand={34} multiplier={12} subStep={2} />);
    expect(screen.getAllByText(/primera fila/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText("2 × 34 = 68, ¡primera fila!").length).toBeGreaterThan(0);
  });

  it("dispara onBoardClick al pulsar la pizarra", () => {
    const onBoardClick = vi.fn();
    render(
      <MultiplicacionManoChalkboard
        multiplicand={34}
        multiplier={12}
        subStep={1}
        onBoardClick={onBoardClick}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Pizarra de multiplicación/i }));
    expect(onBoardClick).toHaveBeenCalledTimes(1);
  });
});
