export default function InteractiveLessonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden" data-testid="interactive-lesson-layout">
      {children}
    </div>
  );
}
