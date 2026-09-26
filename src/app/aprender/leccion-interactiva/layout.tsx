export default function InteractiveLessonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-20 flex flex-col overflow-hidden bg-paper top-[var(--app-chrome-h,3.5rem)]"
      data-testid="interactive-lesson-layout"
    >
      {children}
    </div>
  );
}
