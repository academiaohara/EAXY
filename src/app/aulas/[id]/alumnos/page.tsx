import { AlumnosPage } from "@/components/classroom/alumnos-page";
import { getClassroomName, getClassroomStudents } from "@/lib/classrooms/actions";

type AlumnosRoutePageProps = {
  params: Promise<{ id: string }>;
};

export default async function AlumnosRoutePage({ params }: AlumnosRoutePageProps) {
  const { id: classroomId } = await params;

  const [classroomName, initialStudents] = await Promise.all([
    getClassroomName(classroomId),
    getClassroomStudents(classroomId),
  ]);

  return (
    <AlumnosPage
      classroomId={classroomId}
      classroomName={classroomName}
      initialStudents={initialStudents}
    />
  );
}
