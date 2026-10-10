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
        "rounded-xl border-2 border-[color:var(--stage-accent)]/35 bg-[color:var(--stage-accent)]/12 px-4 py-3 text-sm font-medium leading-relaxed text-[color:var(--stage-ink)] sm:text-base",
        className,
      )}
      data-testid="lesson-definition-box"
    >
      <MathRenderer text={text} />
    </div>
  );
}
