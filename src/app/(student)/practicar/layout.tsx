import { AppShell } from "@/components/layout/app-shell";

export default function PracticarLayout({ children }: { children: React.ReactNode }) {
  return <AppShell active="aprender">{children}</AppShell>;
}
