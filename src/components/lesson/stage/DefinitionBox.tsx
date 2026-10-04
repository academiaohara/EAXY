import { MathRenderer } from "@/components/lesson/MathRenderer";
import { cn } from "@/lib/utils";

type DefinitionBoxProps = {
  text: string;
  className?: string;
};

export function DefinitionBox({ text, className }: DefinitionBoxProps) {
  return (
    <div
      className={cn(
        "rounded-xl border-2 border-cobalt/25 bg-cobalt-tint/40 px-4 py-3 text-sm font-medium leading-relaxed text-ink sm:text-base",
        "lesson-stage-theme-board:border-[color:var(--stage-accent)]/35 lesson-stage-theme-board:bg-[color:var(--stage-accent)]/12 lesson-stage-theme-board:text-[color:var(--stage-ink)]",
        className,
      )}
      data-testid="lesson-definition-box"
    >
      <MathRenderer text={text} />
    </div>
  );
}
