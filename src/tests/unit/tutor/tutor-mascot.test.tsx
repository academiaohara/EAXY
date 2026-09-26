import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TutorMascot } from "@/components/tutor/tutor-mascot";
import { getTutorExpression } from "@/lib/tutor/moods";

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

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("TutorMascot", () => {
  it("describe el estado de ánimo a los lectores de pantalla", () => {
    render(<TutorMascot mood="thinking" />);

    expect(
      screen.getByRole("img", { name: getTutorExpression("thinking").label }),
    ).toBeVisible();
  });

  it("acepta una etiqueta propia", () => {
    render(
      <TutorMascot label="El tutor celebra la lección" mood="celebrate" />,
    );

    expect(
      screen.getByRole("img", { name: "El tutor celebra la lección" }),
    ).toBeVisible();
  });

  it("se marca como decorativo con label nulo", () => {
    render(<TutorMascot label={null} />);

    expect(screen.queryByRole("img")).toBeNull();
    expect(
      screen.getByTestId("tutor-mascot").querySelector("svg"),
    ).toHaveAttribute("aria-hidden", "true");
  });

  it("expone el estado de ánimo y su animación como atributos de datos", () => {
    render(<TutorMascot mood="celebrate" />);

    const mascot = screen.getByTestId("tutor-mascot");

    expect(mascot).toHaveAttribute("data-mood", "celebrate");
    expect(mascot).toHaveAttribute("data-animation", "bounce");
    expect(mascot).toHaveAttribute("data-blink", "true");
    expect(mascot).toHaveAttribute("data-gaze", "auto");
  });

  it("desactiva el parpadeo en los estados que no parpadean", () => {
    render(<TutorMascot mood="surprised" />);

    expect(screen.getByTestId("tutor-mascot")).toHaveAttribute(
      "data-blink",
      "false",
    );
  });

  it("dibuja dos ojos con pupila, párpado y ceja", () => {
    render(<TutorMascot label={null} />);

    const mascot = screen.getByTestId("tutor-mascot");

    expect(mascot.querySelectorAll(".tutor-mascot-eye-white")).toHaveLength(2);
    expect(mascot.querySelectorAll(".tutor-mascot-pupil")).toHaveLength(2);
    expect(mascot.querySelectorAll(".tutor-mascot-lid")).toHaveLength(2);
    expect(mascot.querySelectorAll(".tutor-mascot-brow")).toHaveLength(2);
  });

  it("baja el párpado al sonreír y lo sube en reposo", () => {
    const { unmount } = render(<TutorMascot label={null} mood="idle" />);
    const idleLid = Number(
      screen
        .getByTestId("tutor-mascot")
        .querySelector(".tutor-mascot-lid")
        ?.getAttribute("cy"),
    );
    unmount();

    render(<TutorMascot label={null} mood="happy" />);
    const happyLid = Number(
      screen
        .getByTestId("tutor-mascot")
        .querySelector(".tutor-mascot-lid")
        ?.getAttribute("cy"),
    );

    expect(happyLid).toBeLessThan(idleLid);
  });

  it("aplica el tamaño pedido al SVG", () => {
    render(<TutorMascot label={null} size={140} />);

    const svg = screen.getByTestId("tutor-mascot").querySelector("svg");

    expect(svg).toHaveAttribute("width", "140");
    expect(svg).toHaveAttribute("height", "140");
  });

  it("genera el mismo pelaje con la misma semilla", () => {
    const { unmount } = render(<TutorMascot label={null} seed={12} />);
    const first = screen
      .getByTestId("tutor-mascot")
      .querySelector("path")
      ?.getAttribute("d");
    unmount();

    render(<TutorMascot label={null} seed={12} />);
    const second = screen
      .getByTestId("tutor-mascot")
      .querySelector("path")
      ?.getAttribute("d");

    expect(first).toBeTruthy();
    expect(second).toBe(first);
  });

  it("cambia de pelaje al cambiar la semilla", () => {
    const { unmount } = render(<TutorMascot label={null} seed={1} />);
    const first = screen
      .getByTestId("tutor-mascot")
      .querySelector("path")
      ?.getAttribute("d");
    unmount();

    render(<TutorMascot label={null} seed={2} />);
    const second = screen
      .getByTestId("tutor-mascot")
      .querySelector("path")
      ?.getAttribute("d");

    expect(second).not.toBe(first);
  });

  it("sigue al puntero cuando se le pide", async () => {
    stubMatchMedia(false);
    render(<TutorMascot label={null} followPointer />);

    window.dispatchEvent(
      new MouseEvent("pointermove", { clientX: 400, clientY: 20 }),
    );

    await waitFor(() => {
      expect(screen.getByTestId("tutor-mascot")).toHaveAttribute(
        "data-gaze",
        "pointer",
      );
    });
  });

  it("no sigue al puntero si se prefiere reducir el movimiento", async () => {
    stubMatchMedia(true);
    render(<TutorMascot label={null} followPointer />);

    window.dispatchEvent(
      new MouseEvent("pointermove", { clientX: 400, clientY: 20 }),
    );

    await new Promise((resolve) => setTimeout(resolve, 30));

    expect(screen.getByTestId("tutor-mascot")).toHaveAttribute(
      "data-gaze",
      "auto",
    );
  });
});
