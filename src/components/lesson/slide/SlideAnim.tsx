"use client";

import { useMemo } from "react";
import { AnimPlayer } from "@/components/lesson/anim/AnimPlayer";
import { buildSlideAnim } from "@/components/lesson/anim/registry";
import type { SlideBlock } from "@/lib/lesson/types";

type SlideAnimProps = {
  block: Extract<SlideBlock, { kind: "anim" }>;
  className?: string;
};

/** Monta una animación registrada dentro de la diapositiva. */
export function SlideAnim({ block, className }: SlideAnimProps) {
  const built = useMemo(
    () => buildSlideAnim(block.scene, block.params, block.captions),
    [block.scene, block.params, block.captions],
  );
  return (
    <AnimPlayer
      label={built.label}
      captions={built.captions}
      render={built.render}
      beatMs={block.beatMs ?? built.beatMs}
      className={className}
    />
  );
}
