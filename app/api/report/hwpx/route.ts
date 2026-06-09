import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const serviceUrl = process.env.HWPX_SERVICE_URL;
  const serviceToken = process.env.HWPX_SERVICE_TOKEN;
  const payload = await request.json().catch(() => ({}));

  if (!serviceUrl) {
    return NextResponse.json(
      {
        provider: "mock",
        format: "hwpx",
        filePath: "reports/demo/diagnosis-v1.hwpx",
        message: "HWPX_SERVICE_URL 설정 후 Railway FastAPI로 프록시됩니다."
      },
      { status: 200 }
    );
  }

  const response = await fetch(serviceUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(serviceToken ? { Authorization: `Bearer ${serviceToken}` } : {})
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    return NextResponse.json({ error: "HWPX service failed" }, { status: 502 });
  }

  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data);
}
