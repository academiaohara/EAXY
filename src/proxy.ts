import { NextResponse, type NextRequest } from "next/server";

const LEARNING_PREFIXES = ["/aprender", "/practicar", "/progreso", "/perfil"];

function isLearningPath(pathname: string): boolean {
  return LEARNING_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function isClassroomPath(pathname: string): boolean {
  return pathname === "/aulas" || pathname.startsWith("/aulas/");
}

function isStudentLoginPath(pathname: string): boolean {
  return pathname === "/entrar" || pathname.startsWith("/entrar/");
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isClassroomPath(pathname) || isStudentLoginPath(pathname)) {
    return NextResponse.redirect(new URL("/aprender", request.url));
  }

  if (isLearningPath(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
