import type { ProvisionedStudent } from "@/lib/classrooms/types";

function escapeCsvValue(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

export function buildCredentialsCsv(students: ProvisionedStudent[]): string {
  const header = "Nombre,Usuario,Contraseña";
  const rows = students.map((student) =>
    [student.displayName, student.username, student.password]
      .map(escapeCsvValue)
      .join(","),
  );

  return [header, ...rows].join("\n");
}

export function downloadCredentialsCsv(
  students: ProvisionedStudent[],
  filename = "accesos-alumnos.csv",
): void {
  const csv = buildCredentialsCsv(students);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
