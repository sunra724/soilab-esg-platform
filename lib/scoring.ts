export type DomainCode = "E" | "S" | "G";

export type ScoreIndicator = {
  code: string;
  domain: DomainCode;
  weight: number;
  maxScore: number;
};

export type IndicatorResponse = {
  code: string;
  value: number;
};

export type ActivityData = {
  electricityKwh?: number;
  cityGasM3?: number;
  dieselL?: number;
  wasteTon?: number;
  revenueMillionKrw?: number;
};

export const emissionFactors = {
  electricityKwh: { label: "전력", scope: 2, unit: "kWh", factor: 0.0004541 },
  cityGasM3: { label: "도시가스", scope: 1, unit: "m3", factor: 0.002182 },
  dieselL: { label: "경유", scope: 1, unit: "L", factor: 0.002582 },
  wasteTon: { label: "폐기물", scope: 3, unit: "ton", factor: 0.45 }
} as const;

export function gradeFromScore(score: number) {
  if (score >= 90) return "S";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  return "D";
}

export function calculateScores(indicators: ScoreIndicator[], responses: IndicatorResponse[]) {
  const responseMap = new Map(responses.map((response) => [response.code, response.value]));
  const domains: DomainCode[] = ["E", "S", "G"];

  const domainScores = domains.map((domain) => {
    const scoped = indicators.filter((indicator) => indicator.domain === domain);
    const weightedMax = scoped.reduce((sum, indicator) => sum + indicator.weight, 0);
    const weightedRaw = scoped.reduce((sum, indicator) => {
      const value = Math.min(Math.max(responseMap.get(indicator.code) ?? 0, 0), indicator.maxScore);
      return sum + (value / indicator.maxScore) * indicator.weight;
    }, 0);
    const score = weightedMax > 0 ? (weightedRaw / weightedMax) * 100 : 0;

    return {
      domain,
      raw: Math.round(weightedRaw * 100) / 100,
      weighted: Math.round(score * 10) / 10,
      grade: gradeFromScore(score)
    };
  });

  const totalScore =
    domainScores.length > 0
      ? Math.round((domainScores.reduce((sum, item) => sum + item.weighted, 0) / domainScores.length) * 10) / 10
      : 0;

  return {
    totalScore,
    grade: gradeFromScore(totalScore),
    domainScores
  };
}

export function calculateEmissions(activityData: ActivityData) {
  const rows = Object.entries(emissionFactors).map(([key, factor]) => {
    const amount = activityData[key as keyof ActivityData] ?? 0;
    return {
      source: factor.label,
      scope: factor.scope,
      activityAmount: amount,
      unit: factor.unit,
      factor: factor.factor,
      tco2eq: Math.round(amount * factor.factor * 100) / 100
    };
  });

  const total = Math.round(rows.reduce((sum, row) => sum + row.tco2eq, 0) * 100) / 100;
  const intensity =
    activityData.revenueMillionKrw && activityData.revenueMillionKrw > 0
      ? Math.round((total / activityData.revenueMillionKrw) * 1000) / 1000
      : null;

  return {
    rows,
    total,
    intensity
  };
}
