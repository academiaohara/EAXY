"use client";

import type { SlideBlock } from "@/lib/lesson/types";
import { FractionProductTool } from "@/components/lesson/slide/tools/FractionProductTool";

type SlideToolProps = {
  block: Extract<SlideBlock, { kind: "tool" }>;
};

/** Monta la herramienta interactiva que pide la diapositiva. */
export function SlideTool({ block }: SlideToolProps) {
  switch (block.tool) {
    case "fraction-product":
      return <FractionProductTool initial={block.initial} />;
    default:
      return null;
  }
}
