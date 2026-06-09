"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { assessmentSnapshot } from "@/lib/data";

const radarData = assessmentSnapshot.scores.map((item) => ({
  subject: item.domain,
  score: item.score,
  benchmark: item.benchmark
}));

function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

export function EsgRadar() {
  const mounted = useMounted();

  if (!mounted) {
    return <div className="h-[310px] w-full rounded-md bg-cloud-100" />;
  }

  return (
    <div className="h-[310px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData}>
          <PolarGrid stroke="rgba(23,32,51,0.16)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: "#526079", fontSize: 12 }} />
          <Tooltip />
          <Radar dataKey="benchmark" stroke="#2378a8" fill="#2378a8" fillOpacity={0.16} name="업종 평균" />
          <Radar dataKey="score" stroke="#2f9a58" fill="#2f9a58" fillOpacity={0.34} name="진단 점수" />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function EsgBarChart() {
  const mounted = useMounted();

  if (!mounted) {
    return <div className="h-[300px] w-full rounded-md bg-cloud-100" />;
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={radarData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(23,32,51,0.12)" />
          <XAxis dataKey="subject" tick={{ fill: "#526079", fontSize: 12 }} />
          <YAxis domain={[0, 100]} tick={{ fill: "#526079", fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="score" fill="#2f9a58" radius={[4, 4, 0, 0]} name="진단 점수" />
          <Bar dataKey="benchmark" fill="#2378a8" radius={[4, 4, 0, 0]} name="업종 평균" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
