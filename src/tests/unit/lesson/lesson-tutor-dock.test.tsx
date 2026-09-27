import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LessonTutorDock } from "@/components/lesson/LessonTutorDock";
import { tutorSpeechDuration } from "@/lib/lesson/tutor-speech";

const SPEECH_KEY = "step-1:none";
const MESSAGES = ["¡Muy bien!", "Lo has clavado."];

/** Avanza el reloj lo que dura la frase que el tutor tiene en pantalla. */
function finishLine(line: string) {
  act(() => {
    vi.advanceTimersByTime(tutorSpeechDuration(line) + 1);
  });
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("LessonTutorDock", () => {
  it("va diciendo el mensaje frase a frase", () => {
    render(
      <LessonTutorDock speechKey={SPEECH_KEY} messages={MESSAGES} onOpenPanel={vi.fn()} />,
    );

    expect(screen.getByTestId("lesson-tutor-bubble")).toHaveTextContent("¡Muy bien!");

    finishLine("¡Muy bien!");

    expect(screen.getByTestId("lesson-tutor-bubble")).toHaveTextContent("Lo has clavado.");
  });

  it("recorre varios bloques del paso en orden", () => {
    render(
      <LessonTutorDock
        speechKey={SPEECH_KEY}
        messages={["Primero el título.", "Segundo bloque de teoría."]}
        onOpenPanel={vi.fn()}
      />,
    );

    expect(screen.getByTestId("lesson-tutor-bubble")).toHaveTextContent("Primero el título.");

    finishLine("Primero el título.");

    expect(screen.getByTestId("lesson-tutor-bubble")).toHaveTextContent(
      "Segundo bloque de teoría.",
    );
  });

  it("se queda sola la bola cuando termina de hablar", () => {
    render(
      <LessonTutorDock speechKey={SPEECH_KEY} messages={MESSAGES} onOpenPanel={vi.fn()} />,
    );

    finishLine("¡Muy bien!");
    finishLine("Lo has clavado.");

    expect(screen.queryByTestId("lesson-tutor-bubble")).not.toBeInTheDocument();
    expect(screen.getByTestId("lesson-tutor-button")).toBeInTheDocument();
  });

  it("vuelve a hablar cuando cambia la cola del paso", () => {
    const { rerender } = render(
      <LessonTutorDock speechKey={SPEECH_KEY} messages={MESSAGES} onOpenPanel={vi.fn()} />,
    );

    finishLine("¡Muy bien!");
    finishLine("Lo has clavado.");
    rerender(
      <LessonTutorDock
        speechKey="step-2:none"
        messages={["Ahora prueba con la segunda."]}
        onOpenPanel={vi.fn()}
      />,
    );

    expect(screen.getByTestId("lesson-tutor-bubble")).toHaveTextContent(
      "Ahora prueba con la segunda.",
    );
  });

  it("calla mientras el panel está abierto", () => {
    render(
      <LessonTutorDock
        speechKey={SPEECH_KEY}
        messages={MESSAGES}
        onOpenPanel={vi.fn()}
        panelOpen
      />,
    );

    expect(screen.queryByTestId("lesson-tutor-bubble")).not.toBeInTheDocument();
  });

  it("abre el historial al pulsar la bola", () => {
    const onOpenPanel = vi.fn();
    render(
      <LessonTutorDock speechKey={SPEECH_KEY} messages={MESSAGES} onOpenPanel={onOpenPanel} />,
    );

    screen.getByTestId("lesson-tutor-button").click();

    expect(onOpenPanel).toHaveBeenCalledTimes(1);
  });

  it("oculta la bola mientras el panel está abierto", () => {
    render(
      <LessonTutorDock
        speechKey={SPEECH_KEY}
        messages={MESSAGES}
        onOpenPanel={vi.fn()}
        panelOpen
      />,
    );

    expect(screen.queryByTestId("lesson-tutor-button")).not.toBeInTheDocument();
  });
});
