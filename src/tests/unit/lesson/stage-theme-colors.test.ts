import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("tema pizarra (Manim)", () => {
  it("define tokens claros y remapea ink para contraste en fondo oscuro", () => {
    const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");
    expect(css).toContain("--stage-ink: #ffffff");
    expect(css).toContain("--stage-accent: #58c4dd");
    expect(css).toContain("--stage-highlight: #ffff00");
    expect(css).toMatch(/\.lesson-stage-theme-board\[data-testid="lesson-frame"\] \.text-ink/);
    expect(css).toMatch(/\.lesson-stage-theme-board \.katex/);
  });
});
