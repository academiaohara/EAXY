export type TutorPoint = { x: number; y: number };

export type TutorStroke = {
  d: string;
  width: number;
  opacity: number;
};

export type TutorFurOptions = {
  cx: number;
  cy: number;
  radius: number;
  tufts: number;
  seed: number;
};

export type TutorStrokeOptions = TutorFurOptions & {
  count: number;
};

const TAU = Math.PI * 2;

/**
 * Mulberry32: PRNG determinista para que el pelaje se genere igual en servidor y
 * cliente (si no, la hidratación de React detectaría marcados distintos).
 */
export function createTutorRandom(seed: number): () => number {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

function polar(
  cx: number,
  cy: number,
  radius: number,
  angle: number,
): TutorPoint {
  return {
    x: round(cx + Math.cos(angle) * radius),
    y: round(cy + Math.sin(angle) * radius),
  };
}

function pointToString(point: TutorPoint): string {
  return `${point.x} ${point.y}`;
}

/** Silueta cerrada de la bola con mechones irregulares alrededor del borde. */
export function buildFurOutline({
  cx,
  cy,
  radius,
  tufts,
  seed,
}: TutorFurOptions): string {
  const random = createTutorRandom(seed);
  const commands: string[] = [];

  for (let index = 0; index < tufts; index += 1) {
    const baseAngle = (index / tufts) * TAU;
    const tipAngle = ((index + 0.5) / tufts) * TAU;
    const baseRadius = radius * (0.97 + random() * 0.03);
    const tipRadius = radius * (1.01 + random() * 0.07);

    commands.push(
      index === 0
        ? `M${pointToString(polar(cx, cy, baseRadius, baseAngle))}`
        : `L${pointToString(polar(cx, cy, baseRadius, baseAngle))}`,
    );
    commands.push(`L${pointToString(polar(cx, cy, tipRadius, tipAngle))}`);
  }

  commands.push("Z");
  return commands.join(" ");
}

/** Pelos largos y sueltos que asoman fuera de la silueta. */
export function buildStrayHairs({
  cx,
  cy,
  radius,
  count,
  seed,
}: Omit<TutorStrokeOptions, "tufts">): TutorStroke[] {
  const random = createTutorRandom(seed);
  const hairs: TutorStroke[] = [];

  for (let index = 0; index < count; index += 1) {
    const angle = ((index + random() * 0.85) / count) * TAU;
    const curl = (random() - 0.5) * 0.6;
    const length = radius * (0.09 + random() * 0.16);

    const start = polar(cx, cy, radius * 0.88, angle);
    const control = polar(cx, cy, radius + length * 0.5, angle + curl * 0.6);
    const end = polar(cx, cy, radius + length, angle + curl);

    hairs.push({
      d: `M${pointToString(start)} Q${pointToString(control)} ${pointToString(end)}`,
      width: round(0.45 + random() * 0.35),
      opacity: round(0.72 + random() * 0.28),
    });
  }

  return hairs;
}

/** Textura interior: mechones cortos, más densos en la parte baja del cuerpo. */
export function buildFurTexture({
  cx,
  cy,
  radius,
  count,
  seed,
}: Omit<TutorStrokeOptions, "tufts">): TutorStroke[] {
  const random = createTutorRandom(seed);
  const strokes: TutorStroke[] = [];

  for (let index = 0; index < count; index += 1) {
    // Mitad inferior del cuerpo (ángulos 0..PI en coordenadas SVG), como en el
    // referente: el pelo peinado solo se insinúa bajo la cara.
    const angle = Math.PI * (0.1 + random() * 0.8);
    const distance = radius * (0.55 + random() * 0.27);
    const length = radius * (0.07 + random() * 0.07);
    const drift = (random() - 0.5) * 0.18;

    const start = polar(cx, cy, distance, angle);
    const control = polar(cx, cy, distance + length * 0.6, angle + drift * 0.4);
    const end = polar(cx, cy, distance + length, angle + drift);

    strokes.push({
      d: `M${pointToString(start)} Q${pointToString(control)} ${pointToString(end)}`,
      width: round(0.6 + random() * 0.4),
      opacity: round(0.05 + random() * 0.07),
    });
  }

  return strokes;
}
