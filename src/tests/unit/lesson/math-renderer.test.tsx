import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MathRenderer, plainLessonText } from "@/components/lesson/MathRenderer";

describe("MathRenderer", () => {
  it("renders bold around inline LaTeX", () => {
    const { container } = render(<MathRenderer text="con **$r < d$** al final" />);
    expect(container.querySelector("strong")).toBeTruthy();
    expect(container.textContent).toMatch(/r.*d/);
    expect(container.textContent).not.toContain("**");
  });

  it("renders markdown bold in plain fragments", () => {
    render(<MathRenderer text="Es **exacta** cuando sobra 0." />);
    expect(screen.getByText("exacta").tagName).toBe("STRONG");
  });

  it("alternates mark highlights in presentation mode", () => {
    render(
      <MathRenderer
        text="**Multiplicar** es abreviada de **sumar varias veces**."
        emphasis="mark-alternate"
      />,
    );
    const marks = screen.getAllByText(/Multiplicar|sumar varias veces/);
    expect(marks[0]?.tagName).toBe("MARK");
    expect(marks[0]).not.toHaveClass("suma");
    expect(marks[1]?.tagName).toBe("MARK");
    expect(marks[1]).toHaveClass("suma");
  });

  it("renders allowed title accent spans", () => {
    render(
      <MathRenderer text='Multiplicar es <span class="lesson-step-title-accent">repetir grupos</span>' />,
    );
    expect(screen.getByText("repetir grupos")).toBeTruthy();
    expect(screen.queryByText(/lesson-step-title-accent/)).toBeNull();
  });
});

describe("plainLessonText", () => {
  it("strips inline HTML and markdown for tutor quotes", () => {
    expect(
      plainLessonText(
        'Multiplicar es <span class="lesson-step-title-accent">repetir grupos</span>',
      ),
    ).toBe("Multiplicar es repetir grupos");
    expect(plainLessonText("Es **exacta** cuando sobra 0.")).toBe("Es exacta cuando sobra 0.");
  });
});
