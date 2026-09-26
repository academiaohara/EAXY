"use client";

import { useState } from "react";
import { TutorMascot } from "@/components/tutor/tutor-mascot";
import { Button } from "@/components/ui/button";
import { TUTOR_MOODS, getTutorExpression } from "@/lib/tutor/moods";
import type { TutorMood } from "@/lib/tutor/moods";

const moodLabels: Record<TutorMood, string> = {
  idle: "Tranquilo",
  happy: "Contento",
  celebrate: "Celebrando",
  thinking: "Pensando",
  sad: "Animando",
  surprised: "Sorprendido",
};

export function TutorShowcase() {
  const [mood, setMood] = useState<TutorMood>("idle");
  const [followPointer, setFollowPointer] = useState(true);

  return (
    <div className="space-y-10">
      <section className="flex flex-col items-center gap-6">
        <div className="flex min-h-[260px] items-center justify-center">
          <TutorMascot mood={mood} size={220} followPointer={followPointer} />
        </div>

        <div
          className="flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Estados del tutor"
        >
          {TUTOR_MOODS.map((option) => (
            <Button
              key={option}
              type="button"
              size="sm"
              variant={option === mood ? "default" : "outline"}
              className="rounded-full"
              aria-pressed={option === mood}
              onClick={() => setMood(option)}
            >
              {moodLabels[option]}
            </Button>
          ))}
        </div>

        <div className="space-y-2 text-center">
          <p className="text-sm text-ink-muted">
            {getTutorExpression(mood).label}
          </p>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="rounded-full"
            aria-pressed={followPointer}
            onClick={() => setFollowPointer((previous) => !previous)}
          >
            {followPointer ? "Mirada: sigue al ratón" : "Mirada: automática"}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-medium text-ink">Tamaños</h2>
        <div className="flex flex-wrap items-end gap-8">
          {[40, 64, 96, 140].map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <TutorMascot mood={mood} size={size} label={null} />
              <span className="text-xs text-ink-muted">{size} px</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-medium text-ink">
          Todos los estados
        </h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {TUTOR_MOODS.map((option) => (
            <div key={option} className="flex flex-col items-center gap-2">
              <TutorMascot mood={option} size={96} label={null} />
              <span className="text-xs text-ink-muted">
                {moodLabels[option]}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
