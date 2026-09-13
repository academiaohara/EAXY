import { AppShell } from "@/components/layout/app-shell";

export default function ProgresoLayout({ children }: { children: React.ReactNode }) {
  return <AppShell active="progreso">{children}</AppShell>;
}
