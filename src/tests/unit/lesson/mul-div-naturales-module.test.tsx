import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MulDivNaturalesModule } from "@/components/lesson/stage/modules/mul-div-naturales/MulDivNaturalesModule";

describe("MulDivNaturalesModule", () => {
  it("muestra la retícula conmutativa y permite girarla", async () => {
    const onReady = vi.fn();
    render(
      <MulDivNaturalesModule
        stepId="test"
        scene="conmutativa-producto"
        a={8}
        b={5}
        onReadyChange={onReady}
      />,
    );
    expect(screen.getByLabelText(/Propiedad conmutativa/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Girar la retícula/i }));
    expect(onReady).toHaveBeenCalledWith(true);
  });

  it("reparto manual avisa cuando las cajas están llenas", async () => {
    const onReady = vi.fn();
    let counts = [0, 0, 0];
    const onCounts = vi.fn((next: number[]) => {
      counts = next;
    });
    const { rerender } = render(
      <MulDivNaturalesModule
        stepId="test"
        scene="reparto-manual"
        total={6}
        boxes={3}
        perBox={2}
        boxCounts={counts}
        onBoxCountsChange={onCounts}
        onReadyChange={onReady}
      />,
    );
    const clickAdd = (index: number) => {
      const addButtons = screen.getAllByRole("button", { name: /Añadir un bombón/i });
      fireEvent.click(addButtons[index]!);
      rerender(
        <MulDivNaturalesModule
          stepId="test"
          scene="reparto-manual"
          total={6}
          boxes={3}
          perBox={2}
          boxCounts={counts}
          onBoxCountsChange={onCounts}
          onReadyChange={onReady}
        />,
      );
    };
    clickAdd(0);
    clickAdd(0);
    clickAdd(1);
    clickAdd(1);
    clickAdd(2);
    clickAdd(2);
    expect(onCounts).toHaveBeenCalled();
    expect(onReady).toHaveBeenLastCalledWith(true);
  });
});
