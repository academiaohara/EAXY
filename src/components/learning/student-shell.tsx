import { StudentNav } from "@/components/learning/student-nav";

type StudentShellProps = {
  children: React.ReactNode;
};

export function StudentShell({ children }: StudentShellProps) {
  return (
    <div className="flex flex-1 flex-col">
      <StudentNav />
      {children}
    </div>
  );
}
