import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/aprender", "/practicar", "/progreso", "/aulas"];
const TEACHER_PREFIXES = ["/aulas/nueva"];

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function isTeacherOnlyPath(pathname: string): boolean {
  return TEACHER_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function isTeacherManagementPath(pathname: string): boolean {
  return /^\/aulas\/[^/]+\/(alumnos|asignaciones|reglas|sesiones)/.test(pathname);
}

function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}

/** Lógica duplicada a propósito: el proxy edge no debe importar módulos de app. */
function isContentPreviewEnabled(): boolean {
  if (process.env.CONTENT_PREVIEW_MODE === "false") {
    return false;
  }

  if (process.env.CONTENT_PREVIEW_MODE === "true") {
    return true;
  }

  if (process.env.NODE_ENV === "test") {
    return false;
  }

  // Temporal en Vercel: catálogo abierto mientras el registro no esté listo.
  if (process.env.VERCEL === "1") {
    return true;
  }

  return !isSupabaseConfigured();
}

function openLearningAccessRedirect(pathname: string, request: NextRequest) {
  if (pathname.startsWith("/aulas")) {
    return NextResponse.redirect(new URL("/aprender", request.url));
  }

  return NextResponse.next();
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  if (isContentPreviewEnabled() || !isSupabaseConfigured()) {
    return openLearningAccessRedirect(pathname, request);
  }

  const isE2EMock =
    process.env.NODE_ENV !== "production" &&
    process.env.E2E_MOCK_CLASSROOM === "true";

  if (isE2EMock) {
    const mockUserId =
      request.cookies.get("e2e_student_session")?.value ?? "e2e-teacher-id";
    const isTeacher = mockUserId === "e2e-teacher-id";

    if ((isTeacherOnlyPath(pathname) || isTeacherManagementPath(pathname)) && !isTeacher) {
      return NextResponse.redirect(new URL("/aprender", request.url));
    }

    return NextResponse.next();
  }

  const { createServerClient } = await import("@supabase/ssr");

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = pathname.startsWith("/aulas")
      ? new URL("/login", request.url)
      : new URL("/entrar", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isTeacherOnlyPath(pathname) || isTeacherManagementPath(pathname)) {
    const { data: ownedClassroom } = await supabase
      .from("classrooms")
      .select("id")
      .eq("teacher_id", user.id)
      .limit(1);

    const { data: coTeacher } = await supabase
      .from("classroom_members")
      .select("classroom_id")
      .eq("profile_id", user.id)
      .eq("role", "teacher")
      .limit(1);

    const isTeacher = (ownedClassroom?.length ?? 0) > 0 || (coTeacher?.length ?? 0) > 0;

    if (!isTeacher) {
      return NextResponse.redirect(new URL("/aprender", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
