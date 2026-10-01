import { BookOpenIcon, LineChartIcon, TargetIcon, type LucideIcon } from "lucide-react";
import type { AppSectionKey } from "@/lib/navigation/sections";

export const SECTION_ICONS: Record<AppSectionKey, LucideIcon> = {
  aprender: BookOpenIcon,
  practicar: TargetIcon,
  progreso: LineChartIcon,
};
