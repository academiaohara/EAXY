import { AtomIcon, CpuIcon, PencilRulerIcon, SigmaIcon, type LucideIcon } from "lucide-react";
import type { SubjectKey } from "@/lib/navigation/subjects";

export const SUBJECT_ICONS: Record<SubjectKey, LucideIcon> = {
  matematicas: SigmaIcon,
  fisica: AtomIcon,
  tecnologia: CpuIcon,
  dibujo: PencilRulerIcon,
};
