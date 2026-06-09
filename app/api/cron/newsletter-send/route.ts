import { NextResponse } from "next/server";

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;

  const url = new URL(request.url);
  return request.headers.get("x-cron-secret") === secret || url.searchParams.get("secret") === secret;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    provider: process.env.RESEND_API_KEY ? "resend-ready" : "mock",
    recipientGroup: "all",
    sent: process.env.RESEND_API_KEY ? 0 : 0,
    message: "Resend API 연결 후 subscribers 그룹별 발송 로그를 기록합니다."
  });
}
