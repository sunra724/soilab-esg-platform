"use client";

import { Calculator, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { sampleIndicators } from "@/lib/data";
import type { ActivityData } from "@/lib/scoring";

type ScoreResult = {
  totalScore: number;
  grade: string;
  domainScores: Array<{ domain: string; raw: number; weighted: number; grade: string }>;
  emissions: {
    total: number;
    intensity: number | null;
    rows: Array<{ source: string; scope: number; activityAmount: number; unit: string; factor: number; tco2eq: number }>;
  };
};

const defaultResponses = Object.fromEntries(sampleIndicators.map((indicator) => [indicator.code, 4]));

const defaultActivity: ActivityData = {
  electricityKwh: 280000,
  cityGasM3: 18500,
  dieselL: 2400,
  wasteTon: 26,
  revenueMillionKrw: 9800
};

export function AssessmentWizard() {
  const [responses, setResponses] = useState<Record<string, number>>(defaultResponses);
  const [activity, setActivity] = useState<ActivityData>(defaultActivity);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const groupedIndicators = useMemo(() => {
    return sampleIndicators.reduce<Record<string, typeof sampleIndicators>>((acc, indicator) => {
      acc[indicator.domain] = [...(acc[indicator.domain] ?? []), indicator];
      return acc;
    }, {});
  }, []);

  function updateActivity(key: keyof ActivityData, value: string) {
    setActivity((current) => ({
      ...current,
      [key]: Number(value)
    }));
  }

  async function calculate() {
    setIsLoading(true);
    const payload = {
      indicators: sampleIndicators.map((indicator) => ({
        code: indicator.code,
        domain: indicator.domain,
        weight: indicator.weight,
        maxScore: indicator.maxScore
      })),
      responses: Object.entries(responses).map(([code, value]) => ({ code, value })),
      activityData: activity
    };

    const response = await fetch("/api/assessment/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = (await response.json()) as ScoreResult;
    setResult(data);
    setIsLoading(false);
  }

  function reset() {
    setResponses(defaultResponses);
    setActivity(defaultActivity);
    setResult(null);
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="grid gap-5">
        {Object.entries(groupedIndicators).map(([domain, indicators]) => (
          <section className="surface rounded-md p-5" key={domain}>
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-water-600">Domain {domain}</span>
                <h2 className="mt-1 text-xl font-bold text-ink-950">
                  {domain === "E" ? "환경" : domain === "S" ? "사회" : "지배구조"}
                </h2>
              </div>
              <span className="rounded-md bg-cloud-100 px-2.5 py-1 text-xs font-semibold text-ink-600">{indicators.length} indicators</span>
            </div>
            <div className="grid gap-5">
              {indicators.map((indicator) => (
                <label className="grid gap-3 rounded-md border border-ink-900/10 bg-white p-4" key={indicator.code}>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <span className="text-xs font-bold text-earth-700">{indicator.code}</span>
                      <span className="ml-2 text-xs font-semibold text-ink-500">{indicator.category}</span>
                      <p className="mt-1 text-sm font-semibold leading-6 text-ink-800">{indicator.question}</p>
                    </div>
                    <strong className="text-xl text-ink-950">{responses[indicator.code]}</strong>
                  </div>
                  <input
                    className="h-2 w-full accent-earth-600"
                    max={indicator.maxScore}
                    min={0}
                    onChange={(event) => setResponses((current) => ({ ...current, [indicator.code]: Number(event.target.value) }))}
                    step={1}
                    type="range"
                    value={responses[indicator.code]}
                  />
                </label>
              ))}
            </div>
          </section>
        ))}
      </div>

      <aside className="grid gap-5">
        <section className="surface rounded-md p-5">
          <h2 className="text-xl font-bold text-ink-950">활동데이터</h2>
          <div className="mt-5 grid gap-4">
            {[
              ["electricityKwh", "전력 사용량", "kWh"],
              ["cityGasM3", "도시가스", "m3"],
              ["dieselL", "경유", "L"],
              ["wasteTon", "폐기물", "ton"],
              ["revenueMillionKrw", "매출액", "백만원"]
            ].map(([key, label, unit]) => (
              <label className="grid gap-2 text-sm font-semibold text-ink-700" key={key}>
                {label}
                <div className="flex rounded-md border border-ink-900/10 bg-white">
                  <input
                    className="focus-ring min-h-11 min-w-0 flex-1 rounded-l-md px-3 text-ink-950"
                    onChange={(event) => updateActivity(key as keyof ActivityData, event.target.value)}
                    type="number"
                    value={activity[key as keyof ActivityData] ?? 0}
                  />
                  <span className="flex min-w-20 items-center justify-center border-l border-ink-900/10 px-3 text-xs font-bold text-ink-500">
                    {unit}
                  </span>
                </div>
              </label>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button className="flex-1" disabled={isLoading} onClick={calculate} type="button">
              <Calculator size={17} aria-hidden />
              {isLoading ? "계산 중" : "채점 계산"}
            </Button>
            <Button onClick={reset} type="button" variant="secondary">
              <RotateCcw size={17} aria-hidden />
              초기화
            </Button>
          </div>
        </section>

        <section className="surface rounded-md p-5">
          <h2 className="text-xl font-bold text-ink-950">계산 결과</h2>
          {result ? (
            <div className="mt-5 space-y-4">
              <div className="rounded-md bg-earth-100 p-4">
                <span className="text-xs font-bold text-earth-700">종합 등급</span>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <strong className="text-5xl text-earth-700">{result.grade}</strong>
                  <span className="text-2xl font-black text-ink-950">{result.totalScore}</span>
                </div>
              </div>
              <div className="grid gap-2">
                {result.domainScores.map((score) => (
                  <div className="flex items-center justify-between rounded-md border border-ink-900/10 px-3 py-2" key={score.domain}>
                    <span className="text-sm font-semibold text-ink-700">{score.domain}</span>
                    <strong className="text-sm text-ink-950">
                      {score.weighted} · {score.grade}
                    </strong>
                  </div>
                ))}
              </div>
              <div className="rounded-md bg-cloud-100 p-4">
                <span className="text-xs font-bold text-ink-500">총 배출량</span>
                <strong className="mt-2 block text-2xl text-ink-950">{result.emissions.total} tCO2eq</strong>
                <span className="mt-1 block text-xs font-semibold text-ink-500">
                  매출 원단위 {result.emissions.intensity ?? "-"} tCO2eq/백만원
                </span>
              </div>
            </div>
          ) : (
            <p className="mt-5 rounded-md bg-cloud-100 p-4 text-sm leading-6 text-ink-600">좌측 응답과 활동데이터를 조정한 뒤 계산하면 등급과 배출량이 표시됩니다.</p>
          )}
        </section>
      </aside>
    </div>
  );
}
