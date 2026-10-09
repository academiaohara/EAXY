import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MathRenderer } from "@/components/lesson/MathRenderer";

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
});
