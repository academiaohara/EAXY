import Link from "next/link";
import { AdultRegisterForm } from "@/components/auth/adult-register-form";

export default function RegistroPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <Link
        href="/"
        className="mb-8 font-display text-2xl font-semibold tracking-tight text-ink"
      >
        Eaxy
      </Link>
      <div className="w-full max-w-sm rounded-lg border border-border bg-paper-raised p-6">
        <AdultRegisterForm />
      </div>
    </main>
  );
}
