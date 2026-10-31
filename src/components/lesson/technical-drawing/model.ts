export type TechnicalPoint = readonly [number, number];
export type TechnicalSegment = readonly [TechnicalPoint, TechnicalPoint];

export type SteppedBlock = {
  width: number;
  depth: number;
  baseHeight: number;
  topHeight: number;
  stepWidth: number;
};

export type OrthographicView = {
  outline: TechnicalPoint[];
  visible: TechnicalSegment[];
  hidden: TechnicalSegment[];
  size: readonly [number, number];
};

const validPositive = (value: number) => Number.isFinite(value) && value > 0;

export function drawingLength(
  real: number,
  numerator: number,
  denominator: number,
): number | null {
  if (![real, numerator, denominator].every(validPositive)) return null;
  return (real * numerator) / denominator;
}

export function projectSteppedBlock(block: SteppedBlock): {
  front: OrthographicView;
  top: OrthographicView;
  left: OrthographicView;
} {
  const values = [block.width, block.depth, block.baseHeight, block.stepWidth];
  if (!values.every(validPositive) || !Number.isFinite(block.topHeight)) {
    throw new Error(
      "Las dimensiones de la pieza deben ser finitas y positivas.",
    );
  }
  const width = block.width;
  const depth = block.depth;
  const baseHeight = block.baseHeight;
  const topHeight = Math.max(0, block.topHeight);
  const stepWidth = Math.min(width, Math.max(0, block.stepWidth));
  const height = baseHeight + topHeight;
  const isPrism = topHeight === 0 || stepWidth === width;
  const rectangle = (w: number, h: number): TechnicalPoint[] => [
    [0, 0],
    [w, 0],
    [w, h],
    [0, h],
  ];

  return {
    front: {
      outline: isPrism
        ? rectangle(width, height)
        : [
            [0, 0],
            [width, 0],
            [width, baseHeight],
            [stepWidth, baseHeight],
            [stepWidth, height],
            [0, height],
          ],
      visible: [],
      hidden: [],
      size: [width, height],
    },
    top: {
      outline: rectangle(width, depth),
      visible: isPrism
        ? []
        : [
            [
              [stepWidth, 0],
              [stepWidth, depth],
            ],
          ],
      hidden: [],
      size: [width, depth],
    },
    left: {
      outline: rectangle(depth, height),
      visible: [],
      hidden: [],
      size: [depth, height],
    },
  };
}

type LinearDimensionInput = {
  from: TechnicalPoint;
  to: TechnicalPoint;
  offset: number;
  value: number;
};

export type LinearDimensionGeometry = {
  extensions: TechnicalSegment[];
  dimensionLines: TechnicalSegment[];
  arrows: readonly [TechnicalPoint[], TechnicalPoint[]];
  label: { at: TechnicalPoint; text: string };
};

export function linearDimensionGeometry({
  from,
  to,
  offset,
  value,
}: LinearDimensionInput): LinearDimensionGeometry {
  if (![...from, ...to, offset, value].every(Number.isFinite)) {
    throw new Error("La geometría de la cota debe contener valores finitos.");
  }
  const horizontal = Math.abs(to[0] - from[0]) >= Math.abs(to[1] - from[1]);
  const arrowLength = 7;
  const arrowHalfWidth = 3;
  const textGap = Math.max(14, String(value).length * 4 + 2);

  if (horizontal) {
    const y = from[1] + offset;
    const middle = (from[0] + to[0]) / 2;
    return {
      extensions: [
        [
          [from[0], from[1] + 2],
          [from[0], y + 4],
        ],
        [
          [to[0], to[1] + 2],
          [to[0], y + 4],
        ],
      ],
      dimensionLines: [
        [
          [from[0], y],
          [middle - textGap / 2, y],
        ],
        [
          [middle + textGap / 2, y],
          [to[0], y],
        ],
      ],
      arrows: [
        [
          [from[0], y],
          [from[0] + arrowLength, y - arrowHalfWidth],
          [from[0] + arrowLength, y + arrowHalfWidth],
        ],
        [
          [to[0], y],
          [to[0] - arrowLength, y - arrowHalfWidth],
          [to[0] - arrowLength, y + arrowHalfWidth],
        ],
      ],
      label: { at: [middle, y + 3], text: String(value) },
    };
  }

  const x = from[0] + offset;
  const middle = (from[1] + to[1]) / 2;
  return {
    extensions: [
      [
        [from[0] + 2, from[1]],
        [x + 4, from[1]],
      ],
      [
        [to[0] + 2, to[1]],
        [x + 4, to[1]],
      ],
    ],
    dimensionLines: [
      [
        [x, from[1]],
        [x, middle - textGap / 2],
      ],
      [
        [x, middle + textGap / 2],
        [x, to[1]],
      ],
    ],
    arrows: [
      [
        [x, from[1]],
        [x - arrowHalfWidth, from[1] + arrowLength],
        [x + arrowHalfWidth, from[1] + arrowLength],
      ],
      [
        [x, to[1]],
        [x - arrowHalfWidth, to[1] - arrowLength],
        [x + arrowHalfWidth, to[1] - arrowLength],
      ],
    ],
    label: { at: [x + 3, middle], text: String(value) },
  };
}
