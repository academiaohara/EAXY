"use client";

import { Button } from "@/components/ui/button";
import { ConceptCard } from "@/components/lesson/steps/ConceptCard";
import { SystemGraphTool } from "@/components/lesson/tools/SystemGraphTool";
import type { InteractiveToolStep as InteractiveToolStepType } from "@/lib/lesson/types";

type InteractiveToolStepProps = {
  step: InteractiveToolStepType;
  onContinue: () => void;
};

export function InteractiveToolStepView({ step, onContinue }: InteractiveToolStepProps) {
  return (
    <div className="space-y-6" data-testid="lesson-interactive-tool">
      <ConceptCard
        title={step.title}
        content={step.content}
        math={step.math}
        warning={step.warning}
      />

      {step.tool === "system-graph" ? <SystemGraphTool config={step.graph} /> : null}

      <Button type="button" onClick={onContinue} data-testid="lesson-continue-button">
        Continuar
      </Button>
    </div>
  );
}
