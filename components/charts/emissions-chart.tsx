"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { assessmentSnapshot } from "@/lib/data";

export function EmissionsChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[280px] w-full rounded-md bg-cloud-100" />;
  }

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={assessmentSnapshot.emissions}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(23,32,51,0.12)" />
          <XAxis dataKey="source" tick={{ fill: "#526079", fontSize: 12 }} />
          <YAxis tick={{ fill: "#526079", fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="amount" fill="#dca43b" radius={[4, 4, 0, 0]} name="tCO2eq" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
