export default function NestedInteractiveLessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="lesson-stage-theme-board fixed inset-0 z-20 flex flex-col overflow-hidden bg-[color:var(--stage-surface,#1a2332)] text-[color:var(--stage-ink,#e8edf5)]"
      data-testid="interactive-lesson-layout"
    >
      {children}
    </div>
  );
}
