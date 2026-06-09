"use client";

import { Send } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const serviceOptions = ["ESG 진단", "심화 컨설팅", "교육·아카데미", "보고서 작성", "뉴스레터·콘텐츠"];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Inquiry submission failed.");
      }

      event.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="surface grid gap-4 rounded-md p-5 md:p-6" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-ink-700">
          이름
          <input className="focus-ring min-h-11 rounded-md border border-ink-900/10 bg-white px-3 text-ink-950" name="name" required />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink-700">
          소속
          <input className="focus-ring min-h-11 rounded-md border border-ink-900/10 bg-white px-3 text-ink-950" name="org" required />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-ink-700">
          이메일
          <input className="focus-ring min-h-11 rounded-md border border-ink-900/10 bg-white px-3 text-ink-950" name="email" type="email" required />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink-700">
          연락처
          <input className="focus-ring min-h-11 rounded-md border border-ink-900/10 bg-white px-3 text-ink-950" name="phone" />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-ink-700">
        관심 서비스
        <select className="focus-ring min-h-11 rounded-md border border-ink-900/10 bg-white px-3 text-ink-950" name="service">
          {serviceOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold text-ink-700">
        문의 내용
        <textarea
          className="focus-ring min-h-36 resize-y rounded-md border border-ink-900/10 bg-white px-3 py-3 text-ink-950"
          name="message"
          required
        />
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-ink-500">제출된 정보는 상담 회신과 제안 준비 목적으로만 사용됩니다.</p>
        <Button disabled={status === "submitting"} size="lg" type="submit">
          <Send size={17} aria-hidden />
          {status === "submitting" ? "접수 중" : "문의 접수"}
        </Button>
      </div>
      {status === "success" ? <p className="rounded-md bg-earth-100 px-3 py-2 text-sm font-semibold text-earth-700">문의가 접수되었습니다.</p> : null}
      {status === "error" ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-coral-500">접수 중 오류가 발생했습니다.</p> : null}
    </form>
  );
}
