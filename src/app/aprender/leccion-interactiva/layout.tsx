export default function InteractiveLessonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="fixed inset-0 z-20 flex flex-col overflow-hidden bg-[#eef0f3]"
      data-testid="interactive-lesson-layout"
    >
      {children}
    </div>
  );
}
