import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LessonTutorDock } from "@/components/lesson/LessonTutorDock";
import { tutorSpeechDuration } from "@/lib/lesson/tutor-speech";

const MESSAGE = "¡Muy bien! Lo has clavado.";

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
    render(<LessonTutorDock message={MESSAGE} onOpenPanel={vi.fn()} />);

    expect(screen.getByTestId("lesson-tutor-bubble")).toHaveTextContent("¡Muy bien!");

    finishLine("¡Muy bien!");

    expect(screen.getByTestId("lesson-tutor-bubble")).toHaveTextContent("Lo has clavado.");
  });

  it("se queda sola la bola cuando termina de hablar", () => {
    render(<LessonTutorDock message={MESSAGE} onOpenPanel={vi.fn()} />);

    finishLine("¡Muy bien!");
    finishLine("Lo has clavado.");

    expect(screen.queryByTestId("lesson-tutor-bubble")).not.toBeInTheDocument();
    expect(screen.getByTestId("lesson-tutor-button")).toBeInTheDocument();
  });

  it("vuelve a hablar cuando cambia el mensaje", () => {
    const { rerender } = render(<LessonTutorDock message={MESSAGE} onOpenPanel={vi.fn()} />);

    finishLine("¡Muy bien!");
    finishLine("Lo has clavado.");
    rerender(<LessonTutorDock message="Ahora prueba con la segunda." onOpenPanel={vi.fn()} />);

    expect(screen.getByTestId("lesson-tutor-bubble")).toHaveTextContent(
      "Ahora prueba con la segunda.",
    );
  });

  it("calla mientras el panel está abierto", () => {
    render(<LessonTutorDock message={MESSAGE} onOpenPanel={vi.fn()} panelOpen />);

    expect(screen.queryByTestId("lesson-tutor-bubble")).not.toBeInTheDocument();
  });

  it("abre el historial al pulsar la bola", () => {
    const onOpenPanel = vi.fn();
    render(<LessonTutorDock message={MESSAGE} onOpenPanel={onOpenPanel} />);

    screen.getByTestId("lesson-tutor-button").click();

    expect(onOpenPanel).toHaveBeenCalledTimes(1);
  });

  it("avisa de los mensajes que el alumno no ha leído", () => {
    render(<LessonTutorDock message={MESSAGE} onOpenPanel={vi.fn()} unreadCount={2} />);

    expect(screen.getByTestId("lesson-tutor-unread")).toHaveTextContent("2");
  });
});
