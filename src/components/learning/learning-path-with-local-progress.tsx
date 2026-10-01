"use client";

import { useMemo } from "react";
import { LearningPath } from "@/components/learning/learning-path";
import { applyLocalProgressToModules } from "@/lib/local-progress/storage";
import { useLocalProgress } from "@/lib/local-progress/use-local-progress";
import type { ModuleSummary } from "@/lib/curriculum/types";

type LearningPathWithLocalProgressProps = {
  modules: ModuleSummary[];
  moduleNumberOffset?: number;
  hideModuleHeaders?: boolean;
  /** Si false, no mezcla progreso del navegador (usuario con sesión). */
  mergeLocalProgress?: boolean;
};

export function LearningPathWithLocalProgress({
  modules,
  moduleNumberOffset,
  hideModuleHeaders,
  mergeLocalProgress = true,
}: LearningPathWithLocalProgressProps) {
  const localStore = useLocalProgress();

  const mergedModules = useMemo(() => {
    if (!mergeLocalProgress) {
      return modules;
    }
    return applyLocalProgressToModules(modules, localStore);
  }, [mergeLocalProgress, localStore, modules]);

  return (
    <LearningPath
      modules={mergedModules}
      moduleNumberOffset={moduleNumberOffset}
      hideModuleHeaders={hideModuleHeaders}
    />
  );
}
