"use client";

import { useState, useTransition } from "react";
import { Loader2Icon, PrinterIcon } from "lucide-react";
import { StudentCredentialCard } from "@/components/classroom/student-credential-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getStudentPassword,
  regenerateStudentPassword,
} from "@/lib/classrooms/actions";
import type { ClassroomStudent } from "@/lib/classrooms/types";

type StudentsTableProps = {
  students: ClassroomStudent[];
  onStudentUpdated: () => void;
};

export function StudentsTable({ students, onStudentUpdated }: StudentsTableProps) {
  const [selectedStudent, setSelectedStudent] = useState<ClassroomStudent | null>(null);
  const [visiblePassword, setVisiblePassword] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isPasswordPending, startPasswordTransition] = useTransition();
  const [regeneratingStudentId, setRegeneratingStudentId] = useState<string | null>(null);
  const [regeneratedPassword, setRegeneratedPassword] = useState<string | null>(null);

  function openPasswordModal(student: ClassroomStudent) {
    setSelectedStudent(student);
    setVisiblePassword(null);
    setPasswordError(null);
  }

  function closePasswordModal() {
    setSelectedStudent(null);
    setVisiblePassword(null);
    setPasswordError(null);
  }

  function handleViewPassword() {
    if (!selectedStudent) {
      return;
    }

    startPasswordTransition(async () => {
      try {
        const password = await getStudentPassword(selectedStudent.studentId);
        setVisiblePassword(password);
        setPasswordError(null);
      } catch (error) {
        setVisiblePassword(null);
        setPasswordError(
          error instanceof Error ? error.message : "No se pudo obtener la contraseña.",
        );
      }
    });
  }

  function handlePrintSingleCard() {
    document.body.classList.add("print-single-card");
    window.print();
    window.setTimeout(() => {
      document.body.classList.remove("print-single-card");
    }, 0);
  }

  async function handleRegenerate(student: ClassroomStudent) {
    setRegeneratingStudentId(student.studentId);
    setRegeneratedPassword(null);

    try {
      const password = await regenerateStudentPassword(student.studentId);
      setRegeneratedPassword(password);
      onStudentUpdated();
    } catch (error) {
      setRegeneratedPassword(null);
      setPasswordError(
        error instanceof Error ? error.message : "No se pudo regenerar la contraseña.",
      );
    } finally {
      setRegeneratingStudentId(null);
    }
  }

  if (students.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Todavía no hay alumnos en esta aula. Usa el formulario de alta para añadir el primero.
      </p>
    );
  }

  return (
    <>
      <Table data-testid="students-table">
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.studentId}>
              <TableCell>{student.displayName}</TableCell>
              <TableCell className="font-mono">{student.username}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => openPasswordModal(student)}
                    data-testid={`view-password-${student.studentId}`}
                  >
                    Ver contraseña
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger
                      render={
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          disabled={regeneratingStudentId === student.studentId}
                          data-testid={`regenerate-password-${student.studentId}`}
                        />
                      }
                    >
                      Regenerar
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Regenerar contraseña?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Se invalidará la contraseña anterior de {student.displayName} y se
                          generará una nueva. Tendrás que comunicarle la nueva contraseña.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleRegenerate(student)}>
                          Regenerar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={selectedStudent !== null}
        onOpenChange={(open) => {
          if (!open) {
            closePasswordModal();
          }
        }}
      >
        <DialogContent className="sm:max-w-md" data-testid="password-modal">
          <DialogHeader>
            <DialogTitle>Contraseña de {selectedStudent?.displayName}</DialogTitle>
            <DialogDescription>
              La contraseña solo se muestra bajo demanda. Ocúltala cuando termines.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {visiblePassword ? (
              <p className="rounded-md border bg-muted/40 px-3 py-2 font-mono text-sm" data-testid="visible-password">
                {visiblePassword}
              </p>
            ) : (
              <Button
                type="button"
                onClick={handleViewPassword}
                disabled={isPasswordPending}
                data-testid="load-password-button"
              >
                {isPasswordPending ? (
                  <>
                    <Loader2Icon className="animate-spin" data-icon="inline-start" />
                    Cargando...
                  </>
                ) : (
                  "Mostrar contraseña"
                )}
              </Button>
            )}

            {passwordError && (
              <p className="text-sm text-destructive" role="alert">{passwordError}</p>
            )}

            {visiblePassword && selectedStudent && (
              <div className="single-card-print hidden print:block">
                <StudentCredentialCard
                  displayName={selectedStudent.displayName}
                  username={selectedStudent.username}
                  password={visiblePassword}
                />
              </div>
            )}
          </div>

          <DialogFooter className="no-print">
            {visiblePassword && (
              <>
                <Button type="button" variant="outline" onClick={() => setVisiblePassword(null)}>
                  Ocultar contraseña
                </Button>
                <Button type="button" onClick={handlePrintSingleCard}>
                  <PrinterIcon data-icon="inline-start" />
                  Imprimir tarjeta de este alumno
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {regeneratedPassword && (
        <div className="no-print mt-4 rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-950">
          Nueva contraseña generada:{" "}
          <span className="font-mono font-medium" data-testid="regenerated-password">
            {regeneratedPassword}
          </span>
        </div>
      )}
    </>
  );
}
