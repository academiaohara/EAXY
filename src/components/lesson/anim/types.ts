import type { ReactNode } from "react";

/** Lo que una escena entrega al reproductor. */
export type AnimBuild = {
  label: string;
  captions: string[];
  render: (beat: number) => ReactNode;
  /** Milisegundos por paso (si la escena necesita más calma). */
  beatMs?: number;
};
