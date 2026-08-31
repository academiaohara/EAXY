import { PageContainer } from "./PageContainer";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200 py-6 text-center text-xs text-slate-400">
      <PageContainer as="div" width="wide">
        Eaxy — Plataforma de aprendizaje interactivo
      </PageContainer>
    </footer>
  );
}
