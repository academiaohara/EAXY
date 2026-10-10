import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LessonTutorDock } from "@/components/lesson/LessonTutorDock";
import { tutorSpeechDuration } from "@/lib/lesson/tutor-speech";
import { TUTOR_HOVER_DWELL_MS, TUTOR_HOVER_REACTION_MOODS } from "@/lib/tutor/hover-reaction";

const SPEECH_KEY = "step-1:none";
const MESSAGES = ["¡Muy bien!", "Lo has clavado."];

function stubMatchMedia(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

/** Avanza el reloj lo que dura la frase que el tutor tiene en pantalla. */
async function finishLine(line: string) {
  await act(async () => {
    vi.advanceTimersByTime(tutorSpeechDuration(line) + 1);
    await Promise.resolve();
  });
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("LessonTutorDock", () => {
  it("va diciendo el mensaje frase a frase", async () => {
    render(
      <LessonTutorDock speechKey={SPEECH_KEY} messages={MESSAGES} onOpenPanel={vi.fn()} />,
    );

    expect(screen.getByTestId("lesson-tutor-bubble")).toHaveTextContent("¡Muy bien!");

    await finishLine("¡Muy bien!");

    expect(screen.getByTestId("lesson-tutor-bubble")).toHaveTextContent("Lo has clavado.");
  });

  it("recorre varios bloques del paso en orden", async () => {
    render(
      <LessonTutorDock
        speechKey={SPEECH_KEY}
        messages={["Primero el título.", "Segundo bloque de teoría."]}
        onOpenPanel={vi.fn()}
      />,
    );

    expect(screen.getByTestId("lesson-tutor-bubble")).toHaveTextContent("Primero el título.");

    await finishLine("Primero el título.");

    expect(screen.getByTestId("lesson-tutor-bubble")).toHaveTextContent(
      "Segundo bloque de teoría.",
    );
  });

  it("se queda sola la bola cuando termina de hablar", async () => {
    render(
      <LessonTutorDock speechKey={SPEECH_KEY} messages={MESSAGES} onOpenPanel={vi.fn()} />,
    );

    await finishLine("¡Muy bien!");
    await finishLine("Lo has clavado.");

    expect(screen.queryByTestId("lesson-tutor-bubble")).not.toBeInTheDocument();
    expect(screen.getByTestId("lesson-tutor-button")).toBeInTheDocument();
  });

  it("vuelve a hablar cuando cambia la cola del paso", async () => {
    const { rerender } = render(
      <LessonTutorDock speechKey={SPEECH_KEY} messages={MESSAGES} onOpenPanel={vi.fn()} />,
    );

    await finishLine("¡Muy bien!");
    await finishLine("Lo has clavado.");
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

  it("avisa de cada frase que dice para guardarla en el historial", async () => {
    const onSpeak = vi.fn();
    render(
      <LessonTutorDock
        speechKey={SPEECH_KEY}
        messages={MESSAGES}
        onOpenPanel={vi.fn()}
        onSpeak={onSpeak}
      />,
    );

    expect(onSpeak).toHaveBeenLastCalledWith(0, "¡Muy bien!");

    await finishLine("¡Muy bien!");

    expect(onSpeak).toHaveBeenLastCalledWith(1, "Lo has clavado.");
  });

  it("reacciona al quedarse encima un rato y vuelve al ánimo de lección al salir", async () => {
    stubMatchMedia(false);
    vi.spyOn(Math, "random").mockReturnValue(0);

    render(
      <LessonTutorDock speechKey={SPEECH_KEY} messages={[]} onOpenPanel={vi.fn()} />,
    );

    const button = screen.getByTestId("lesson-tutor-button");
    const mascot = screen.getByTestId("tutor-mascot");

    expect(mascot).toHaveAttribute("data-mood", "idle");

    fireEvent.pointerEnter(button);

    await act(async () => {
      vi.advanceTimersByTime(TUTOR_HOVER_DWELL_MS);
    });

    expect(button).toHaveAttribute("data-hover-reaction", TUTOR_HOVER_REACTION_MOODS[0]);
    expect(mascot).toHaveAttribute("data-mood", TUTOR_HOVER_REACTION_MOODS[0]);

    fireEvent.pointerLeave(button);

    expect(button).not.toHaveAttribute("data-hover-reaction");
    expect(mascot).toHaveAttribute("data-mood", "idle");

    vi.mocked(Math.random).mockRestore();
  });

  it("no activa reacción al hover tras un acierto", async () => {
    render(
      <LessonTutorDock
        speechKey={SPEECH_KEY}
        messages={MESSAGES}
        reaction="correct"
        onOpenPanel={vi.fn()}
      />,
    );

    const button = screen.getByTestId("lesson-tutor-button");
    fireEvent.pointerEnter(button);

    await act(async () => {
      vi.advanceTimersByTime(TUTOR_HOVER_DWELL_MS + 500);
    });

    expect(button).not.toHaveAttribute("data-hover-reaction");
    expect(screen.getByTestId("tutor-mascot")).toHaveAttribute("data-mood", "celebrate");
  });

  it("no dice nada nuevo mientras el panel está abierto", () => {
    const onSpeak = vi.fn();
    render(
      <LessonTutorDock
        speechKey={SPEECH_KEY}
        messages={MESSAGES}
        onOpenPanel={vi.fn()}
        onSpeak={onSpeak}
        panelOpen
      />,
    );

    finishLine("¡Muy bien!");

    expect(onSpeak).not.toHaveBeenCalled();
  });
});
