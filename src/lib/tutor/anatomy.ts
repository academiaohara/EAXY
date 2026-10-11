/**
 * Medidas del tutor tomadas sobre la ilustración del cuerpo
 * (`public/tutor/pompon-pelo-blanco-esponjoso-sin-ojos.png`, recorte cuadrado sin ojos ni cejas).
 *
 * Todo está en unidades del `viewBox` 0 0 200 200 del componente.
 */

export const TUTOR_BODY_IMAGE =
  "/tutor/pompon-pelo-blanco-esponjoso-sin-ojos.png";

export const TUTOR_VIEWBOX = 200;

/** Pelo del cuerpo (blanco esponjoso, para párpados). */
export const TUTOR_FUR_COLORS = {
  highlight: "#fafafa",
  base: "#ececec",
  shade: "#c8c8c8",
} as const;

export type TutorEyeAnatomy = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  /** Inclinación del ojo, como en el dibujo. */
  rotation: number;
  pupilRadius: number;
  /** Posición de reposo de la pupila: en el dibujo miran hacia dentro. */
  pupilBias: { x: number; y: number };
  /** Dirección del brillo principal dentro de la pupila. */
  glint: { x: number; y: number };
};

export const TUTOR_EYES: readonly TutorEyeAnatomy[] = [
  {
    cx: 80,
    cy: 103,
    rx: 19.5,
    ry: 21,
    rotation: -5,
    pupilRadius: 9.2,
    pupilBias: { x: 3.8, y: 2.2 },
    glint: { x: -0.36, y: -0.4 },
  },
  {
    cx: 141,
    cy: 96,
    rx: 17.5,
    ry: 19.5,
    rotation: 5,
    pupilRadius: 8.8,
    pupilBias: { x: -3.2, y: 2.8 },
    glint: { x: -0.34, y: -0.42 },
  },
] as const;

/** Tono crema del ojo medido en la ilustración. */
export const TUTOR_EYE_COLORS = {
  light: "#fdf8ee",
  shade: "#e6dcc8",
  outline: "#0a0a0a",
  pupil: "#101010",
  /** Pelo que rodea la cara: párpados y cejas usan el tono del cuerpo. */
  fur: TUTOR_FUR_COLORS.shade,
} as const;
