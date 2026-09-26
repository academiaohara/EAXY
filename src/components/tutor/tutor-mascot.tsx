"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  buildFurOutline,
  buildFurTexture,
  buildStrayHairs,
} from "@/lib/tutor/geometry";
import type { TutorPoint } from "@/lib/tutor/geometry";
import { getTutorExpression } from "@/lib/tutor/moods";
import type { TutorMood } from "@/lib/tutor/moods";
import { gazeOffset } from "@/lib/tutor/gaze";

const BODY = { cx: 100, cy: 100, radius: 64 } as const;
const MAX_GAZE_OFFSET = 5.5;

const EYES = [
  {
    cx: 81,
    cy: 98,
    rx: 18.5,
    ry: 20.5,
    rotation: -8,
    pupilRadius: 9.6,
    pupilBias: { x: 1, y: 1 },
  },
  {
    cx: 123,
    cy: 92,
    rx: 17.5,
    ry: 19.5,
    rotation: 6,
    pupilRadius: 9.1,
    pupilBias: { x: -0.5, y: 1 },
  },
] as const;

export type TutorMascotProps = {
  mood?: TutorMood;
  /** Lado del tutor en píxeles (el SVG es cuadrado). */
  size?: number;
  /** Las pupilas siguen al puntero cuando es posible. */
  followPointer?: boolean;
  /**
   * Texto alternativo. `null` marca el tutor como decorativo para lectores de
   * pantalla (útil cuando el mensaje ya se muestra como texto al lado).
   */
  label?: string | null;
  /** Semilla del pelaje: misma semilla, mismo personaje. */
  seed?: number;
  className?: string;
};

export function TutorMascot({
  mood = "idle",
  size = 96,
  followPointer = false,
  label,
  seed = 7,
  className,
}: TutorMascotProps) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const svgRef = useRef<SVGSVGElement>(null);
  const [pointerGaze, setPointerGaze] = useState<TutorPoint | null>(null);

  const expression = getTutorExpression(mood);

  const fur = useMemo(
    () => ({
      outline: buildFurOutline({ ...BODY, tufts: 156, seed }),
      hairs: buildStrayHairs({ ...BODY, count: 7, seed: seed + 31 }),
      texture: buildFurTexture({ ...BODY, count: 16, seed: seed + 97 }),
    }),
    [seed],
  );

  useEffect(() => {
    if (
      !followPointer ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
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

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

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
        viewBox="0 0 200 200"
        width={size}
        height={size}
        role={isDecorative ? undefined : "img"}
        aria-label={isDecorative ? undefined : accessibleLabel}
        aria-hidden={isDecorative || undefined}
        focusable="false"
      >
        <defs>
          <radialGradient id={`${uid}-body`} cx="34%" cy="26%" r="78%">
            <stop offset="0%" stopColor="#4a4a4a" />
            <stop offset="45%" stopColor="#242424" />
            <stop offset="100%" stopColor="#0b0b0b" />
          </radialGradient>

          <linearGradient id={`${uid}-eye`} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#fffdf6" />
            <stop offset="100%" stopColor="#ebe3d1" />
          </linearGradient>

          <filter
            id={`${uid}-fuzz`}
            x="-25%"
            y="-25%"
            width="150%"
            height="150%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.42"
              numOctaves={3}
              seed={seed}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="7"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter
            id={`${uid}-soft`}
            x="-15%"
            y="-15%"
            width="130%"
            height="130%"
          >
            <feGaussianBlur stdDeviation="2.4" />
          </filter>

          {EYES.map((eye, index) => (
            <clipPath key={`clip-${index}`} id={`${uid}-eye-clip-${index}`}>
              <ellipse rx={eye.rx} ry={eye.ry} />
            </clipPath>
          ))}
        </defs>

        <g className="tutor-mascot-body">
          <g className="tutor-mascot-squash">
            <g className="tutor-mascot-fur">
              <circle
                cx={BODY.cx}
                cy={BODY.cy}
                r={BODY.radius * 0.99}
                fill={`url(#${uid}-body)`}
                filter={`url(#${uid}-soft)`}
              />
              <path
                d={fur.outline}
                fill={`url(#${uid}-body)`}
                filter={`url(#${uid}-fuzz)`}
              />

              {fur.hairs.map((hair, index) => (
                <path
                  key={`hair-${index}`}
                  d={hair.d}
                  fill="none"
                  stroke="#161616"
                  strokeWidth={hair.width}
                  strokeOpacity={hair.opacity}
                  strokeLinecap="round"
                />
              ))}

              {fur.texture.map((stroke, index) => (
                <path
                  key={`texture-${index}`}
                  d={stroke.d}
                  fill="none"
                  stroke="#d5d5d5"
                  strokeWidth={stroke.width}
                  strokeOpacity={stroke.opacity}
                  strokeLinecap="round"
                />
              ))}
            </g>
          </g>

          <g className="tutor-mascot-face">
            {EYES.map((eye, index) => {
              const mirror = index === 1 ? -1 : 1;

              return (
                <g
                  key={`eye-${index}`}
                  transform={`translate(${eye.cx} ${eye.cy}) rotate(${eye.rotation})`}
                >
                  <path
                    className="tutor-mascot-brow"
                    d="M-13 -24 Q0 -30 13 -25"
                    fill="none"
                    stroke="#050505"
                    strokeWidth={3.2}
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
                        stroke="#0a0a0a"
                        strokeOpacity={0.18}
                        strokeWidth={1.2}
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
                            fill="#0a0a0a"
                          />
                          <circle
                            cx={-eye.pupilRadius * 0.32}
                            cy={-eye.pupilRadius * 0.38}
                            r={eye.pupilRadius * 0.26}
                            fill="#ffffff"
                          />
                          <circle
                            cx={eye.pupilRadius * 0.36}
                            cy={eye.pupilRadius * 0.42}
                            r={eye.pupilRadius * 0.1}
                            fill="#ffffff"
                            fillOpacity={0.35}
                          />
                        </g>
                      </g>

                      <g clipPath={`url(#${uid}-eye-clip-${index})`}>
                        <ellipse
                          className="tutor-mascot-lid"
                          rx={eye.rx * 1.7}
                          ry={eye.ry * 1.25}
                          cy={
                            eye.ry * (1 - 2 * expression.lidCoverage) +
                            eye.ry * 1.25
                          }
                          fill="#242424"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
}
