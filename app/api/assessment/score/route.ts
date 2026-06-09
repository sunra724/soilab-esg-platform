import { NextResponse } from "next/server";

import { sampleIndicators } from "@/lib/data";
import { calculateEmissions, calculateScores, type ActivityData, type DomainCode, type ScoreIndicator } from "@/lib/scoring";

type ScorePayload = {
  indicators?: ScoreIndicator[];
  responses?: Array<{ code: string; value: number }>;
  activityData?: ActivityData;
};

const fallbackIndicators: ScoreIndicator[] = sampleIndicators.map((indicator) => ({
  code: indicator.code,
  domain: indicator.domain as DomainCode,
  weight: indicator.weight,
  maxScore: indicator.maxScore
}));

const fallbackResponses = fallbackIndicators.map((indicator) => ({
  code: indicator.code,
  value: 4
}));

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as ScorePayload;
  const indicators = payload.indicators?.length ? payload.indicators : fallbackIndicators;
  const responses = payload.responses?.length ? payload.responses : fallbackResponses;
  const activityData = payload.activityData ?? {
    electricityKwh: 280000,
    cityGasM3: 18500,
    dieselL: 2400,
    wasteTon: 26,
    revenueMillionKrw: 9800
  };

  const scoreResult = calculateScores(indicators, responses);
  const emissions = calculateEmissions(activityData);

  return NextResponse.json({
    ...scoreResult,
    emissions,
    formula: {
      score: "sum(response_value / max_score * weight) by domain",
      emission: "activity_amount * emission_factor"
    }
  });
}
