import { redirect } from "next/navigation";
import { StudentShell } from "@/components/learning/student-shell";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";

export default async function AprenderLayout({ children }: LayoutProps<"/aprender">) {
  const studentId = await getAuthenticatedUserIdOrNull();

  if (!studentId) {
    redirect("/entrar");
  }

  return <StudentShell>{children}</StudentShell>;
}
