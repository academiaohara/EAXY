import { cn } from "@/lib/utils";

export const objectShadow =
  "drop-shadow-[0_4px_6px_rgba(15,23,42,0.12)]";

export function objectSize(className?: string) {
  return cn("shrink-0", objectShadow, className);
}
