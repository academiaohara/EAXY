/** Paleta Manim (sobre pizarra oscura) compartida por todas las animaciones. */
export const MANIM = {
  blue: "#58c4dd",
  green: "#83c167",
  yellow: "#ffd866",
  red: "#fc6255",
  orange: "#ff862f",
  purple: "#c59bd6",
  ink: "#ffffff",
  muted: "#b8c2d0",
  grid: "#3d4f66",
  surface: "#1a2332",
  panel: "#222f43",
} as const;

export type ManimColor = keyof typeof MANIM;
