import { AppShell } from "@/components/layout/app-shell";

export default function AprenderLayout({ children }: { children: React.ReactNode }) {
  return <AppShell active="aprender">{children}</AppShell>;
}
