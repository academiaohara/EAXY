"use client";

import { useCallback, useState } from "react";
import type { SistemasNumeracionConfig } from "@/lib/lesson/types";
import {
  CalloutLayer,
  ENTER,
  MUTED,
  ROSE,
  StageSvg,
  TEAL,
  VIOLET,
  fmt,
} from "./numeracion-shared";

export function CeroGuardianScene({
  config,
  onReadyChange,
}: {
  config: SistemasNumeracionConfig;
  onReadyChange?: (ready: boolean) => void;
}) {
  const [removed, setRemoved] = useState(false);
  const n = config.value ?? 305;

  const removeZero = useCallback(() => {
    setRemoved(true);
    onReadyChange?.(true);
  }, [onReadyChange]);

  const digits = removed ? ["3", "5"] : ["3", "0", "5"];
  const value = removed ? 35 : n;

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <StageSvg viewBox="0 0 420 160" testId="numeracion-cero-guardian">
        <text x={120} y={70} fill={MUTED} fontSize={12}>
          305
        </text>
        <text x={280} y={70} fill={MUTED} fontSize={12}>
          35
        </text>
        <g transform="translate(160,90)">
          {digits.map((d, i) => (
            <text
              key={`${d}-${i}`}
              x={i * 36}
              y={0}
              textAnchor="middle"
              fill={d === "0" && !removed ? ROSE : i === 0 ? VIOLET : TEAL}
              fontSize={36}
              fontWeight={600}
              className={ENTER}
              style={{
                transform: removed ? `translateX(${i === 1 ? -36 : 0}px)` : undefined,
                transition: "transform 0.65s cubic-bezier(.65,0,.35,1)",
              }}
            >
              {d}
            </text>
          ))}
        </g>
        <text x={210} y={140} textAnchor="middle" fill={removed ? ROSE : MUTED} fontSize={14}>
          Valor: {fmt(value)}
        </text>
        <CalloutLayer callouts={config.callouts} phase={removed ? 1 : 0} anchor={{ x: 300, y: 70 }} />
      </StageSvg>
      <button
        type="button"
        onClick={removeZero}
        disabled={removed}
        className="rounded-full border border-[color:var(--stage-accent,#58c4dd)]/50 px-5 py-2 text-sm font-medium text-[color:var(--stage-ink,#e8edf5)] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--stage-accent,#58c4dd)]"
        aria-label="Quitar el cero de 305"
      >
        Quitar el cero
      </button>
    </div>
  );
}
