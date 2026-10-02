import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LessonPrimaryAction } from "@/components/lesson/LessonPrimaryAction";
import {
  LessonStepControlProvider,
  useLessonStepControl,
} from "@/components/lesson/LessonStepControlContext";
import { Classify } from "@/components/lesson/steps/Classify";
import { FractionPick } from "@/components/lesson/steps/FractionPick";
import { NumberLinePick } from "@/components/lesson/steps/NumberLinePick";
import type { ClassifyStep, FractionPickStep, NumberLinePickStep } from "@/lib/lesson/types";

afterEach(() => {
  cleanup();
});

function CheckButton() {
  const { control } = useLessonStepControl();
  return control ? <LessonPrimaryAction control={control} /> : null;
}

function renderStep(node: React.ReactNode) {
  return render(
    <LessonStepControlProvider>
      {node}
      <CheckButton />
    </LessonStepControlProvider>,
  );
}

const pieces = () => screen.getAllByTestId("fraction-piece");

describe("FractionPick", () => {
  const step: FractionPickStep = {
    id: "p",
    type: "fraction_pick",
    title: "Colorea",
    question: "Colorea $\\frac{3}{8}$",
    shape: "bar",
    numerator: 3,
    denominator: 8,
  };

  it("colorea y descolorea partes y da por buena la fracción pedida", () => {
    const onCheck = vi.fn();
    renderStep(<FractionPick step={step} onCheck={onCheck} />);

    expect(pieces()).toHaveLength(8);
    expect(screen.getByTestId("lesson-check-button")).toBeDisabled();

    [0, 1, 2, 3].forEach((index) => fireEvent.click(pieces()[index]));
    fireEvent.click(pieces()[3]);
    expect(screen.getByTestId("fraction-readout")).toHaveTextContent("3 partes");

    fireEvent.click(screen.getByTestId("lesson-check-button"));
    expect(onCheck).toHaveBeenCalledWith(true);
  });

  it("deja que el alumno divida la unidad antes de colorear", () => {
    const onCheck = vi.fn();
    renderStep(
      <FractionPick
        step={{ ...step, numerator: 1, denominator: 2, adjustableParts: true, exactParts: true }}
        onCheck={onCheck}
      />,
    );

    expect(pieces()).toHaveLength(1);
    fireEvent.click(screen.getByTestId("fraction-parts-plus"));
    expect(pieces()).toHaveLength(2);

    fireEvent.click(pieces()[0]);
    fireEvent.click(screen.getByTestId("lesson-check-button"));
    expect(onCheck).toHaveBeenCalledWith(true);
  });

  it("marca como fallo un número de partes que no corresponde", () => {
    const onCheck = vi.fn();
    renderStep(<FractionPick step={step} onCheck={onCheck} />);

    fireEvent.click(pieces()[0]);
    fireEvent.click(screen.getByTestId("lesson-check-button"));
    expect(onCheck).toHaveBeenCalledWith(false);
  });
});

describe("Classify", () => {
  const step: ClassifyStep = {
    id: "c",
    type: "classify",
    title: "Clasifica",
    question: "¿Primo o compuesto?",
    groups: [
      { id: "primo", label: "Primo" },
      { id: "compuesto", label: "Compuesto" },
    ],
    items: [
      { id: "7", text: "7", group: "primo" },
      { id: "9", text: "9", group: "compuesto" },
    ],
  };

  function place(itemText: string, groupLabel: string) {
    fireEvent.click(screen.getByRole("button", { name: itemText }));
    fireEvent.click(screen.getByRole("button", { name: `Grupo ${groupLabel}` }));
  }

  it("coloca tarjetas tocando la tarjeta y luego el grupo", () => {
    const onCheck = vi.fn();
    renderStep(<Classify step={step} onCheck={onCheck} />);

    place("7", "Primo");
    expect(screen.getByTestId("lesson-check-button")).toBeDisabled();
    place("9", "Compuesto");

    fireEvent.click(screen.getByTestId("lesson-check-button"));
    expect(onCheck).toHaveBeenCalledWith(true);
  });

  it("señala dónde iba la tarjeta mal colocada", () => {
    const onCheck = vi.fn();
    renderStep(<Classify step={step} onCheck={onCheck} />);

    place("7", "Primo");
    place("9", "Primo");
    fireEvent.click(screen.getByTestId("lesson-check-button"));

    expect(onCheck).toHaveBeenCalledWith(false);
    expect(screen.getByText(/va en «Compuesto»/)).toBeInTheDocument();
  });
});

describe("NumberLinePick", () => {
  const step: NumberLinePickStep = {
    id: "n",
    type: "number_line_pick",
    title: "Recta",
    question: "Marca $-2$",
    min: -5,
    max: 5,
    target: -2,
  };

  it("mueve el punto con el teclado y comprueba el valor", () => {
    const onCheck = vi.fn();
    renderStep(<NumberLinePick step={step} onCheck={onCheck} />);

    const slider = screen.getByRole("slider");
    fireEvent.keyDown(slider, { key: "ArrowLeft" });
    fireEvent.keyDown(slider, { key: "ArrowLeft" });
    expect(slider).toHaveAttribute("aria-valuenow", "-2");

    fireEvent.click(screen.getByTestId("lesson-check-button"));
    expect(onCheck).toHaveBeenCalledWith(true);
  });
});
