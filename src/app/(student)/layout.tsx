import { redirect } from "next/navigation";
import { StudentShell } from "@/components/learning/student-shell";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const studentId = await getAuthenticatedUserIdOrNull();

  if (!studentId) {
    redirect("/entrar");
  }

  return <StudentShell>{children}</StudentShell>;
}
