"use client";

import { useMemo } from "react";
import type { Dt1WorkshopStep } from "@/lib/lesson/types";
import type { LessonContinueMeta } from "@/components/lesson/LessonStepControlContext";
import { useRegisterLessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
import {
  evaluateWorkshop,
  initialWorkshopState,
  workshopSpec,
  type WorkshopState,
} from "./model";

const PAPER_WIDTH = 720,
  PAPER_HEIGHT = 430;
export function Dt1Workshop({
  step,
  onContinue,
}: {
  step: Dt1WorkshopStep;
  onContinue: (meta?: LessonContinueMeta) => void;
}) {
  const createDefault = useMemo(
    () => () => initialWorkshopState(step.scene),
    [step.scene],
  );
  const [stored, setState] = usePersistedLessonToolState<WorkshopState>(
    `dt1-workshop:${step.id}`,
    createDefault,
  );
  const state =
    stored && [stored.x, stored.y, stored.scale].every(Number.isFinite)
      ? stored
      : createDefault();
  const result = evaluateWorkshop(step.scene, Boolean(step.transfer), state);
  const spec = workshopSpec(step.scene, Boolean(step.transfer));
  const isPlan = step.scene === "plan-repair";
  const isRight = step.scene === "right-angle";
  const half = step.scene === "locus" ? spec.half : 3;
  const origin = isRight ? 160 : 360;
  const px = (x: number) => origin + x * 27;
  const py = (y: number) => 285 - y * 27;
  const set = (field: keyof WorkshopState, value: number) => {
    if (Number.isFinite(value)) {
      const bounded = isPlan
        ? Math.max(0, Math.min(1000, value))
        : Math.max(-4, Math.min(field === "x" ? 8 : 9, value));
      setState({ ...state, [field]: bounded });
    }
  };
  const control = useMemo(
    () => ({
      label: "Continuar",
      disabled: !result.complete,
      onClick: () => {
        if (result.complete) onContinue({ completed: true });
      },
      testId: "lesson-continue-button",
    }),
    [onContinue, result.complete],
  );
  useRegisterLessonStepControl(control);
  const fields = isPlan
    ? [
        { key: "x" as const, label: "Cota horizontal (mm)" },
        { key: "y" as const, label: "Cota vertical (mm)" },
        { key: "scale" as const, label: "Denominador de escala" },
      ]
    : [
        { key: "x" as const, label: `Coordenada x de ${isRight ? "C" : "P"}` },
        { key: "y" as const, label: `Coordenada y de ${isRight ? "C" : "P"}` },
      ];
  const dimensions = isPlan
    ? {
        w: (spec.width / spec.denominator) * 4,
        h: (spec.planHeight / spec.denominator) * 4,
      }
    : null;
  return (
    <section
      data-testid="dt1-workshop"
      className="grid w-full items-start gap-6 xl:grid-cols-[minmax(0,1.9fr)_minmax(270px,1fr)]"
    >
      <div className="overflow-hidden rounded-xl bg-slate-50 text-slate-900 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3 text-xs font-semibold tracking-wide">
          <span>EAXY / ESTUDIO TÉCNICO</span>
          <span>{isPlan ? "PLANO DE FABRICACIÓN" : "MESA DE GEOMETRÍA"}</span>
        </div>
        <svg
          viewBox={`0 0 ${PAPER_WIDTH} ${PAPER_HEIGHT}`}
          className="w-full"
          role="img"
          aria-label={
            isPlan
              ? "Plano de placa con cotas editables y escala"
              : "Plano cartesiano: posición y medidas calculadas del punto móvil"
          }
          onClick={(event) => {
            if (isPlan) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            if (!bounds.width || !bounds.height) return;
            const x =
              (((event.clientX - bounds.left) / bounds.width) * PAPER_WIDTH -
                origin) /
              27;
            const y =
              (285 -
                ((event.clientY - bounds.top) / bounds.height) * PAPER_HEIGHT) /
              27;
            setState({
              ...state,
              x: Math.max(-4, Math.min(8, Math.round(x * 10) / 10)),
              y: Math.max(-4, Math.min(9, Math.round(y * 10) / 10)),
            });
          }}
        >
          <defs>
            <pattern
              id={`grid-${step.id}`}
              x={isPlan ? 0 : origin}
              y={isPlan ? 0 : 285}
              width="27"
              height="27"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 27 0 H 0 V 27"
                fill="none"
                stroke="#dce4ed"
                strokeWidth="0.7"
              />
            </pattern>
          </defs>
          <rect
            width={PAPER_WIDTH}
            height={PAPER_HEIGHT}
            fill={`url(#grid-${step.id})`}
          />
          {isPlan && dimensions ? (
            <g>
              <text x="40" y="40" fontSize="17" fill="#475569">
                PLACA · ALZADO · cotas en mm
              </text>
              <rect
                x="150"
                y="100"
                width={dimensions.w}
                height={dimensions.h}
                fill="#e2e8f0"
                stroke="#0f172a"
                strokeWidth="3"
              />
              <line
                x1="150"
                y1={135 + dimensions.h}
                x2={150 + dimensions.w}
                y2={135 + dimensions.h}
                stroke="#2563eb"
                strokeWidth="2"
              />
              <text
                x={150 + dimensions.w / 2}
                y={162 + dimensions.h}
                textAnchor="middle"
                fontSize="22"
                fill="#1d4ed8"
              >
                {state.x}
              </text>
              <line
                x1={180 + dimensions.w}
                y1="100"
                x2={180 + dimensions.w}
                y2={100 + dimensions.h}
                stroke="#2563eb"
                strokeWidth="2"
              />
              <text
                x={195 + dimensions.w}
                y={105 + dimensions.h / 2}
                fontSize="22"
                fill="#1d4ed8"
              >
                {state.y}
              </text>
              <rect
                x="370"
                y="350"
                width="310"
                height="55"
                fill="white"
                stroke="#64748b"
              />
              <text x="385" y="375" fontSize="16">
                ESCALA 1:{state.scale}
              </text>
              <text x="385" y="395" fontSize="12">
                Documento de trabajo · revisar antes de fabricar
              </text>
            </g>
          ) : (
            <g>
              <line x1="50" y1={py(0)} x2="670" y2={py(0)} stroke="#64748b" />
              <line
                x1={px(0)}
                y1="35"
                x2={px(0)}
                y2="400"
                stroke="#64748b"
                strokeDasharray="4 5"
              />
              <path
                d={`M ${px(isRight ? 0 : -half)} ${py(0)} L ${px(state.x)} ${py(state.y)} L ${px(isRight ? spec.base : half)} ${py(0)}`}
                fill="#2563eb12"
                stroke="#2563eb"
                strokeWidth="3"
              />
              <line
                x1={px(isRight ? 0 : -half)}
                y1={py(0)}
                x2={px(isRight ? spec.base : half)}
                y2={py(0)}
                stroke="#0f172a"
                strokeWidth="3"
              />
              <circle
                cx={px(state.x)}
                cy={py(state.y)}
                r="9"
                fill={result.complete ? "#059669" : "#2563eb"}
                stroke="white"
                strokeWidth="3"
              />
              <text
                x={px(state.x) + 15}
                y={py(state.y) - 12}
                fontSize="20"
                fill="#1d4ed8"
              >
                {isRight ? "C" : "P"}
              </text>
              <text
                x={px(isRight ? 0 : -half) - 15}
                y={py(0) + 28}
                fontSize="18"
              >
                A
              </text>
              <text
                x={px(isRight ? spec.base : half) + 8}
                y={py(0) + 28}
                fontSize="18"
              >
                B
              </text>
              <text x="35" y="40" fontSize="16" fill="#475569">
                {step.scene === "locus"
                  ? "1 cuadrícula = 1 km"
                  : "1 cuadrícula = 1 unidad"}
              </text>
              <text x="35" y="410" fontSize="13" fill="#475569">
                Clic para situar el punto · coordenadas editables en el panel
              </text>
            </g>
          )}
        </svg>
      </div>
      <div className="space-y-5 text-[color:var(--stage-ink,#f8fafc)]">
        <div>
          <p className="mb-2 text-xs font-semibold tracking-widest text-cyan-300 uppercase">
            {step.transfer ? "Nuevo encargo" : "Tu encargo"}
          </p>
          <p className="text-lg leading-relaxed">{spec.brief}</p>
        </div>
        <div className="grid gap-3">
          {fields.map((field) => (
            <label
              key={field.key}
              className="grid grid-cols-[1fr_6rem] items-center gap-3 text-sm"
            >
              {field.label}
              <input
                type="number"
                step={isPlan ? "1" : "0.1"}
                value={state[field.key]}
                onChange={(event) => {
                  if (event.target.value !== "")
                    set(field.key, Number(event.target.value));
                }}
                className="w-full rounded-md border border-slate-500 bg-slate-900 px-3 py-2 text-white"
              />
            </label>
          ))}
        </div>
        <div className="space-y-2 border-y border-slate-600 py-4 text-sm tabular-nums">
          {result.readings.map((reading) => (
            <p key={reading}>{reading}</p>
          ))}
        </div>
        <p
          role="status"
          className={`text-sm leading-relaxed ${result.complete ? "text-emerald-300" : "text-slate-200"}`}
        >
          {result.message}
        </p>
        <button
          type="button"
          onClick={() => setState(createDefault())}
          className="rounded-lg border border-slate-500 px-4 py-2 text-sm hover:bg-white/10"
        >
          Reiniciar taller
        </button>
      </div>
    </section>
  );
}
