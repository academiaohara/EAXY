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
    const baseRadius = radius * (0.97 + random() * 0.04);
    const tipRadius = radius * (1.03 + random() * 0.1);

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
    const angle = ((index + random() * 0.8) / count) * TAU;
    const curl = (random() - 0.5) * 0.5;
    const length = radius * (0.14 + random() * 0.22);

    const start = polar(cx, cy, radius * 0.9, angle);
    const control = polar(cx, cy, radius + length * 0.55, angle + curl * 0.6);
    const end = polar(cx, cy, radius + length, angle + curl);

    hairs.push({
      d: `M${pointToString(start)} Q${pointToString(control)} ${pointToString(end)}`,
      width: round(0.9 + random() * 0.9),
      opacity: round(0.45 + random() * 0.35),
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
    // Sesgo hacia la mitad inferior (ángulos 0..PI en coordenadas SVG).
    const angle = random() * Math.PI * 1.35 - Math.PI * 0.18;
    const distance = radius * (0.3 + random() * 0.4);
    const length = radius * (0.08 + random() * 0.14);
    const drift = (random() - 0.5) * 0.7;

    const start = polar(cx, cy, distance, angle);
    const control = polar(cx, cy, distance + length * 0.6, angle + drift * 0.4);
    const end = polar(cx, cy, distance + length, angle + drift);

    strokes.push({
      d: `M${pointToString(start)} Q${pointToString(control)} ${pointToString(end)}`,
      width: round(0.8 + random() * 0.8),
      opacity: round(0.12 + random() * 0.2),
    });
  }

  return strokes;
}
