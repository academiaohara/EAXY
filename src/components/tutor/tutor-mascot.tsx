"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  TUTOR_BODY_IMAGE,
  TUTOR_EYES,
  TUTOR_EYE_COLORS,
  TUTOR_VIEWBOX,
} from "@/lib/tutor/anatomy";
import { getTutorExpression } from "@/lib/tutor/moods";
import type { TutorMood } from "@/lib/tutor/moods";
import { gazeOffset } from "@/lib/tutor/gaze";
import type { TutorPoint } from "@/lib/tutor/types";

const MAX_GAZE_OFFSET = 5;

export type TutorMascotProps = {
  mood?: TutorMood;
  /** Lado del tutor en píxeles (el dibujo es cuadrado). */
  size?: number;
  /** Las pupilas siguen al puntero cuando es posible. */
  followPointer?: boolean;
  /**
   * Texto alternativo. `null` marca el tutor como decorativo para lectores de
   * pantalla (útil cuando el mensaje ya se muestra como texto al lado).
   */
  label?: string | null;
  className?: string;
};

/**
 * El cuerpo es la ilustración original sin fondo; ojos, párpados y cejas se
 * dibujan en SVG por encima para poder animarlos.
 */
export function TutorMascot({
  mood = "idle",
  size = 96,
  followPointer = false,
  label,
  className,
}: TutorMascotProps) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const svgRef = useRef<SVGSVGElement>(null);
  const [pointerGaze, setPointerGaze] = useState<TutorPoint | null>(null);

  const expression = getTutorExpression(mood);

  useEffect(() => {
    if (!followPointer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;

    function handlePointerMove(event: PointerEvent) {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const node = svgRef.current;
        if (!node) {
          return;
        }

        const rect = node.getBoundingClientRect();
        setPointerGaze(
          gazeOffset({
            pointerX: event.clientX,
            pointerY: event.clientY,
            bounds: rect,
            maxOffset: MAX_GAZE_OFFSET,
          }),
        );
      });
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [followPointer]);

  const activeGaze = followPointer ? pointerGaze : null;
  const gaze = activeGaze ?? expression.pupilOffset;
  const accessibleLabel = label === undefined ? expression.label : label;
  const isDecorative = accessibleLabel === null;

  return (
    <div
      className={cn("tutor-mascot", className)}
      data-testid="tutor-mascot"
      data-mood={mood}
      data-animation={expression.bodyAnimation}
      data-blink={expression.blink ? "true" : "false"}
      data-gaze={activeGaze ? "pointer" : "auto"}
      style={{ width: size, height: size }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${TUTOR_VIEWBOX} ${TUTOR_VIEWBOX}`}
        width={size}
        height={size}
        role={isDecorative ? undefined : "img"}
        aria-label={isDecorative ? undefined : accessibleLabel}
        aria-hidden={isDecorative || undefined}
        focusable="false"
      >
        <defs>
          <linearGradient id={`${uid}-eye`} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor={TUTOR_EYE_COLORS.light} />
            <stop offset="100%" stopColor={TUTOR_EYE_COLORS.shade} />
          </linearGradient>

          {TUTOR_EYES.map((eye, index) => (
            <clipPath key={`clip-${index}`} id={`${uid}-eye-clip-${index}`}>
              <ellipse rx={eye.rx} ry={eye.ry} />
            </clipPath>
          ))}
        </defs>

        <g className="tutor-mascot-body">
          <g className="tutor-mascot-squash">
            <g className="tutor-mascot-fur">
              <image
                className="tutor-mascot-art"
                href={TUTOR_BODY_IMAGE}
                x={0}
                y={0}
                width={TUTOR_VIEWBOX}
                height={TUTOR_VIEWBOX}
                preserveAspectRatio="xMidYMid meet"
              />
            </g>

            <g className="tutor-mascot-face">
              {TUTOR_EYES.map((eye, index) => {
                const mirror = index === 1 ? -1 : 1;

                return (
                  <g
                    key={`eye-${index}`}
                    transform={`translate(${eye.cx} ${eye.cy}) rotate(${eye.rotation})`}
                  >
                    <path
                      className="tutor-mascot-brow"
                      d={`M${-eye.rx * 0.82} ${-eye.ry * 1.16} Q0 ${-eye.ry * 1.42} ${
                        eye.rx * 0.82
                      } ${-eye.ry * 1.2}`}
                      fill="none"
                      stroke={TUTOR_EYE_COLORS.outline}
                      strokeWidth={4}
                      strokeLinecap="round"
                      strokeOpacity={expression.browOpacity}
                      style={{
                        transform: `translateY(${expression.browOffset}px) rotate(${
                          expression.browRotation * mirror
                        }deg)`,
                      }}
                    />

                    <g className="tutor-mascot-eye">
                      <g
                        className="tutor-mascot-eye-shape"
                        style={{ transform: `scaleY(${expression.eyeScaleY})` }}
                      >
                        <ellipse
                          className="tutor-mascot-eye-white"
                          rx={eye.rx}
                          ry={eye.ry}
                          fill={`url(#${uid}-eye)`}
                          stroke={TUTOR_EYE_COLORS.outline}
                          strokeOpacity={0.5}
                          strokeWidth={1.8}
                        />

                        <g className="tutor-mascot-pupil-drift">
                          <g
                            className="tutor-mascot-pupil-aim"
                            style={{
                              transform: `translate(${gaze.x + eye.pupilBias.x}px, ${
                                gaze.y + eye.pupilBias.y
                              }px)`,
                            }}
                          >
                            <circle
                              className="tutor-mascot-pupil"
                              r={eye.pupilRadius * expression.pupilScale}
                              fill={TUTOR_EYE_COLORS.pupil}
                            />
                            <circle
                              cx={eye.pupilRadius * eye.glint.x}
                              cy={eye.pupilRadius * eye.glint.y}
                              r={eye.pupilRadius * 0.26}
                              fill="#ffffff"
                            />
                            <circle
                              cx={eye.pupilRadius * 0.34}
                              cy={eye.pupilRadius * 0.44}
                              r={eye.pupilRadius * 0.11}
                              fill="#ffffff"
                              fillOpacity={0.4}
                            />
                          </g>
                        </g>

                        <g clipPath={`url(#${uid}-eye-clip-${index})`}>
                          <ellipse
                            className="tutor-mascot-lid"
                            rx={eye.rx * 1.7}
                            ry={eye.ry * 1.25}
                            cy={eye.ry * (1 - 2 * expression.lidCoverage) + eye.ry * 1.25}
                            fill={TUTOR_EYE_COLORS.fur}
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                );
              })}
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
