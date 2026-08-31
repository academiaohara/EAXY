"use client";

import { useState } from "react";
import {
  getGamificationState,
  recordVisit,
  type GamificationState,
} from "@/lib/gamification";

export function GamificationBar() {
  const [state] = useState<GamificationState>(() => recordVisit());

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div
        className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-sm font-semibold text-amber-700"
        title="Racha de días"
      >
        <span aria-hidden>🔥</span>
        <span>{state.streak}</span>
      </div>
      <div
        className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-sm font-semibold text-emerald-700"
        title="Estrellas ganadas"
      >
        <span aria-hidden>⭐</span>
        <span>{state.stars}</span>
      </div>
    </div>
  );
}

export function useGamification() {
  const [state, setState] = useState<GamificationState>(getGamificationState);

  const refresh = () => setState(getGamificationState());

  return { state, refresh };
}
