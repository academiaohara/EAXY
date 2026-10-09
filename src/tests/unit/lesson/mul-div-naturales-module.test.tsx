import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MulDivNaturalesModule } from "@/components/lesson/stage/modules/mul-div-naturales/MulDivNaturalesModule";

describe("MulDivNaturalesModule", () => {
  it("muestra el bloque conmutativo 3×5 y permite girarlo al terminar", async () => {
    vi.useFakeTimers();
    const onReady = vi.fn();
    render(
      <MulDivNaturalesModule
        stepId="test"
        scene="conmutativa-producto"
        a={3}
        b={5}
        onReadyChange={onReady}
      />,
    );
    expect(screen.getByLabelText(/Propiedad conmutativa/i)).toBeInTheDocument();
    expect(onReady).not.toHaveBeenCalledWith(true);
    expect(screen.getByLabelText(/Propiedad conmutativa/i)).toHaveTextContent("3·5=15");
    fireEvent.click(screen.getByRole("button", { name: /Girar el bloque/i }));
    expect(onReady).toHaveBeenCalledWith(true);
    await vi.advanceTimersByTimeAsync(800);
    expect(screen.getByLabelText(/Propiedad conmutativa/i)).toHaveTextContent("5·3=15");
    expect(screen.getByLabelText(/Propiedad conmutativa/i)).toHaveTextContent("3·5=5·3");
    vi.useRealTimers();
  });

  it("asociativa huevos pide probar las dos agrupaciones antes de continuar", () => {
    const onReady = vi.fn();
    render(
      <MulDivNaturalesModule
        stepId="test"
        scene="asociativa-huevos"
        a={8}
        b={5}
        c={2}
        onReadyChange={onReady}
      />,
    );
    expect(onReady).not.toHaveBeenCalledWith(true);
    fireEvent.click(screen.getByRole("button", { name: /8 · \(5 · 2\)/i }));
    expect(onReady).toHaveBeenCalledWith(true);
    expect(screen.getByText(/¡Mismo resultado!/i)).toBeInTheDocument();
  });

  it("reparto manual avisa cuando las cajas están llenas", async () => {
    const onReady = vi.fn();
    let counts = [0, 0, 0, 0];
    const onCounts = vi.fn((next: number[]) => {
      counts = next;
    });
    const { rerender } = render(
      <MulDivNaturalesModule
        stepId="test"
        scene="reparto-manual"
        total={60}
        boxes={4}
        perBox={15}
        boxCounts={counts}
        onBoxCountsChange={onCounts}
        onReadyChange={onReady}
      />,
    );
    const rerenderModule = () =>
      rerender(
        <MulDivNaturalesModule
          stepId="test"
          scene="reparto-manual"
          total={60}
          boxes={4}
          perBox={15}
          boxCounts={counts}
          onBoxCountsChange={onCounts}
          onReadyChange={onReady}
        />,
      );
    const addToBox = (boxIndex: number, amount: number) => {
      fireEvent.click(
        screen.getByRole("button", { name: `Añadir ${amount} bombones a la caja ${boxIndex + 1}` }),
      );
      rerenderModule();
    };
    for (let i = 0; i < 4; i++) {
      addToBox(i, 10);
      addToBox(i, 5);
    }
    expect(onCounts).toHaveBeenCalled();
    expect(onReady).toHaveBeenLastCalledWith(true);
  });
});
