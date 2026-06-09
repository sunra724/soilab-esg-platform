import { NextResponse } from "next/server";

import { assessmentSnapshot } from "@/lib/data";

export async function POST() {
  return NextResponse.json({
    provider: process.env.ANTHROPIC_API_KEY ? "anthropic-ready" : "mock",
    assessmentId: "demo",
    weaknesses: [
      { domain: "E", title: "Scope 1·2 산정 근거와 검토 로그가 부족합니다." },
      { domain: "S", title: "협력사 ESG 평가 절차가 문서화되어 있지 않습니다." },
      { domain: "G", title: "ESG KPI의 이사회 보고 주기가 명확하지 않습니다." }
    ],
    tasks: assessmentSnapshot.tasks,
    roadmap: {
      short: assessmentSnapshot.tasks.filter((task) => task.horizon === "short"),
      midLong: assessmentSnapshot.tasks.filter((task) => task.horizon !== "short")
    }
  });
}
