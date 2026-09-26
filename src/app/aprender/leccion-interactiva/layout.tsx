export default function InteractiveLessonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="fixed inset-0 z-20 flex flex-col overflow-hidden bg-gradient-to-b from-[#f3f5f8] to-[#e6eaef]"
      data-testid="interactive-lesson-layout"
    >
      {children}
    </div>
  );
}
