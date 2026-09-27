/**
 * Medidas del tutor tomadas sobre la ilustración original
 * (`public/tutor/tutor-body.webp`, un recorte cuadrado sin fondo al que se le
 * han borrado ojos y cejas para poder animarlos por encima).
 *
 * Todo está en unidades del `viewBox` 0 0 200 200 del componente.
 */

export const TUTOR_BODY_IMAGE = "/tutor/tutor-body.webp";

export const TUTOR_VIEWBOX = 200;

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
    cx: 79.9,
    cy: 98.8,
    rx: 22,
    ry: 23.3,
    rotation: -6,
    pupilRadius: 9.8,
    pupilBias: { x: 4.2, y: 2.4 },
    glint: { x: -0.36, y: -0.4 },
  },
  {
    cx: 141.6,
    cy: 91.3,
    rx: 19.3,
    ry: 21.8,
    rotation: 5,
    pupilRadius: 9.4,
    pupilBias: { x: -3.4, y: 3.2 },
    glint: { x: -0.34, y: -0.42 },
  },
] as const;

/** Tono crema del ojo medido en la ilustración. */
export const TUTOR_EYE_COLORS = {
  light: "#fdf8ee",
  shade: "#e6dcc8",
  outline: "#0a0a0a",
  pupil: "#101010",
  /** Pelo que rodea la cara: párpados y cejas usan este tono. */
  fur: "#171717",
} as const;
