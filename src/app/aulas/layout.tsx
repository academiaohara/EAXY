import { AppShell } from "@/components/layout/app-shell";

export default function AulasLayout({ children }: { children: React.ReactNode }) {
  return <AppShell active="aulas">{children}</AppShell>;
}
