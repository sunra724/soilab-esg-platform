import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "soilab_admin_access";

function unauthorized() {
  return new NextResponse(
    `<!doctype html>
    <html lang="ko">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Admin Access Required</title>
        <style>
          body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: system-ui, sans-serif; background: #f8faf9; color: #172033; }
          main { width: min(420px, calc(100% - 32px)); border: 1px solid rgba(23,32,51,.12); border-radius: 8px; background: white; padding: 28px; box-shadow: 0 18px 70px rgba(23,32,51,.10); }
          h1 { margin: 0; font-size: 24px; }
          p { color: #526079; line-height: 1.6; }
          code { background: #eff4f1; padding: 2px 6px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <main>
          <h1>관리자 접근 확인</h1>
          <p>관리자 화면은 접근 토큰이 필요합니다. <code>/admin?token=...</code> 형식으로 한 번 접속하면 세션 쿠키가 설정됩니다.</p>
        </main>
      </body>
    </html>`,
    {
      status: 401,
      headers: {
        "content-type": "text/html; charset=utf-8"
      }
    }
  );
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const expectedToken = process.env.ADMIN_ACCESS_TOKEN || process.env.CRON_SECRET;

  if (!expectedToken) {
    return unauthorized();
  }

  const cookieToken = request.cookies.get(ADMIN_COOKIE)?.value;
  const queryToken = searchParams.get("token") || searchParams.get("admin_token");

  if (cookieToken === expectedToken) {
    return NextResponse.next();
  }

  if (queryToken === expectedToken) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete("token");
    cleanUrl.searchParams.delete("admin_token");

    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set(ADMIN_COOKIE, expectedToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 8,
      path: "/admin",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    });
    return response;
  }

  return unauthorized();
}

export const config = {
  matcher: ["/admin/:path*"]
};
