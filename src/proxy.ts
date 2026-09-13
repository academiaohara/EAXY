import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import {
  E2E_STUDENT_SESSION_COOKIE,
  isE2EMockClassroomEnabled,
  MOCK_TEACHER_ID,
} from "@/lib/classrooms/e2e-mock";

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

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  if (isE2EMockClassroomEnabled()) {
    const mockUserId = request.cookies.get(E2E_STUDENT_SESSION_COOKIE)?.value ?? MOCK_TEACHER_ID;
    const isTeacher = mockUserId === MOCK_TEACHER_ID;

    if ((isTeacherOnlyPath(pathname) || isTeacherManagementPath(pathname)) && !isTeacher) {
      return NextResponse.redirect(new URL("/aprender", request.url));
    }

    return NextResponse.next();
  }

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
