import type { ReactNode } from "react";
import {
  linearDimensionGeometry,
  type OrthographicView,
  type TechnicalPoint,
} from "./model";

const INK = "#172033";
const FINE = "#475569";

export function SheetFrame({
  width,
  height,
  title,
  scale,
  children,
}: {
  width: number;
  height: number;
  title: string;
  scale: string;
  children: ReactNode;
}) {
  const boxWidth = 220;
  const boxHeight = 34;
  const divider = 165;
  return (
    <>
      <rect width={width} height={height} fill="#fdfcf8" />
      <rect
        x="12"
        y="12"
        width={width - 24}
        height={height - 24}
        fill="none"
        stroke={INK}
        strokeWidth="1.4"
      />
      {children}
      <g
        data-testid="sheet-title-block"
        transform={`translate(${width - boxWidth - 12} ${height - boxHeight - 12})`}
      >
        <rect width={boxWidth} height={boxHeight} fill="#fff" stroke={INK} />
        <line x1={divider} y1="0" x2={divider} y2={boxHeight} stroke={INK} />
        <text x="7" y="13" fontSize="7" fontWeight="700" fill={INK}>
          {title}
        </text>
        <text x="7" y="26" fontSize="7" fill={FINE}>
          COTAS EN mm
        </text>
        <text x={divider + 8} y="13" fontSize="7" fill={FINE}>
          ESCALA
        </text>
        <text x={divider + 8} y="27" fontSize="10" fontWeight="700" fill={INK}>
          {scale}
        </text>
      </g>
    </>
  );
}

const points = (
  list: readonly TechnicalPoint[],
  origin: TechnicalPoint,
  factor: number,
  invertY: boolean,
) =>
  list
    .map(([x, y]) =>
      [
        origin[0] + x * factor,
        origin[1] + y * factor * (invertY ? -1 : 1),
      ].join(","),
    )
    .join(" ");

export function OrthographicShape({
  view,
  origin,
  factor,
  invertY = true,
  testId,
}: {
  view: OrthographicView;
  origin: TechnicalPoint;
  factor: number;
  invertY?: boolean;
  testId: string;
}) {
  const transformPoint = ([x, y]: TechnicalPoint): TechnicalPoint => [
    origin[0] + x * factor,
    origin[1] + y * factor * (invertY ? -1 : 1),
  ];
  return (
    <g data-testid={testId} data-size={`${view.size[0]}x${view.size[1]}`}>
      <polygon
        points={points(view.outline, origin, factor, invertY)}
        fill="none"
        stroke={INK}
        strokeWidth="2.2"
        strokeLinejoin="miter"
      />
      {view.visible.map(([a, b], index) => {
        const aa = transformPoint(a);
        const bb = transformPoint(b);
        return (
          <line
            key={`visible-${index}`}
            x1={aa[0]}
            y1={aa[1]}
            x2={bb[0]}
            y2={bb[1]}
            stroke={INK}
            strokeWidth="2.2"
          />
        );
      })}
      {view.hidden.map(([a, b], index) => {
        const aa = transformPoint(a);
        const bb = transformPoint(b);
        return (
          <line
            key={`hidden-${index}`}
            x1={aa[0]}
            y1={aa[1]}
            x2={bb[0]}
            y2={bb[1]}
            stroke={FINE}
            strokeWidth="1.2"
            strokeDasharray="6 4"
          />
        );
      })}
    </g>
  );
}

export function LinearDimension({
  from,
  to,
  offset,
  value,
  tolerance,
}: {
  from: TechnicalPoint;
  to: TechnicalPoint;
  offset: number;
  value: number;
  tolerance?: string;
}) {
  const geometry = linearDimensionGeometry({ from, to, offset, value });
  return (
    <g aria-label={`Cota ${value}${tolerance ? ` ${tolerance}` : ""}`}>
      {geometry.extensions.map(([a, b], index) => (
        <line
          key={`extension-${index}`}
          data-testid="dimension-extension"
          x1={a[0]}
          y1={a[1]}
          x2={b[0]}
          y2={b[1]}
          stroke={FINE}
          strokeWidth="1"
        />
      ))}
      {geometry.dimensionLines.map(([a, b], index) => (
        <line
          key={`dimension-${index}`}
          x1={a[0]}
          y1={a[1]}
          x2={b[0]}
          y2={b[1]}
          stroke={FINE}
          strokeWidth="1"
        />
      ))}
      {geometry.arrows.map((arrow, index) => (
        <polygon
          key={`arrow-${index}`}
          data-testid="dimension-arrow"
          points={arrow.map((point) => point.join(",")).join(" ")}
          fill={INK}
        />
      ))}
      <text
        data-testid="dimension-label"
        x={geometry.label.at[0]}
        y={geometry.label.at[1]}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="10"
        fill={INK}
      >
        {geometry.label.text}
        {tolerance ? ` ${tolerance}` : ""}
      </text>
    </g>
  );
}
