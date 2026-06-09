import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as { type?: string; assessmentId?: string };

  return NextResponse.json({
    provider: "mock",
    assessmentId: payload.assessmentId ?? "demo",
    type: payload.type ?? "diagnosis",
    format: "pdf",
    version: 1,
    filePath: "reports/demo/diagnosis-v1.pdf",
    message: "Supabase Storage와 PDF 렌더러를 연결하면 실제 파일 저장으로 전환됩니다."
  });
}
