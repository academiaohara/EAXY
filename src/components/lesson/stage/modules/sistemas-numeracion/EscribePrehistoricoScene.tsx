"use client";

import type { ReactNode } from "react";
import type { SistemasNumeracionConfig } from "@/lib/lesson/types";
import { prehistoricBreakdown } from "@/lib/lesson/stage/numeracion";
import { HandGlyph, PersonGlyph, StickGlyph } from "./numeracion-glyphs";
import { MUTED, StageSvg } from "./numeracion-shared";

function PrehistoricRow({ people, hands, sticks, x, y }: { people: number; hands: number; sticks: number; x: number; y: number }) {
  let offset = 0;
  const items: ReactNode[] = [];
  for (let i = 0; i < people; i += 1) {
    items.push(<PersonGlyph key={`p${i}`} x={x + offset} y={y} scale={0.75} />);
    offset += 36;
  }
  for (let i = 0; i < hands; i += 1) {
    items.push(<HandGlyph key={`h${i}`} x={x + offset} y={y} scale={0.75} />);
    offset += 28;
  }
  for (let i = 0; i < sticks; i += 1) {
    items.push(<StickGlyph key={`s${i}`} x={x + offset} y={y} scale={0.65} />);
    offset += 12;
  }
  return <g>{items}</g>;
}

/** Ilustración estática para el predict «escribe el 38». */
export function EscribePrehistoricoScene({ config }: { config: SistemasNumeracionConfig }) {
  const target = config.value ?? 38;
  const correct = prehistoricBreakdown(target);
  const wrongA = prehistoricBreakdown(58);
  const wrongB = prehistoricBreakdown(43);

  return (
    <StageSvg viewBox="0 0 420 160" testId="numeracion-escribe-prehistorico">
      <text x={210} y={24} textAnchor="middle" fill={MUTED} fontSize={12}>
        Elige el dibujo que representa {target}
      </text>
      <PrehistoricRow {...correct} x={30} y={70} />
      <text x={70} y={110} fill={MUTED} fontSize={10}>
        A
      </text>
      <PrehistoricRow {...wrongA} x={30} y={130} />
      <text x={70} y={150} fill={MUTED} fontSize={10}>
        B
      </text>
      <PrehistoricRow {...wrongB} x={240} y={70} />
      <text x={280} y={110} fill={MUTED} fontSize={10}>
        C
      </text>
    </StageSvg>
  );
}
