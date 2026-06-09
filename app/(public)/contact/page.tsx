import type { Metadata } from "next";

import { ContactForm } from "@/components/product/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "문의",
  description: "SOILAB ESG Platform 상담을 요청합니다."
};

export default function ContactPage() {
  return (
    <section className="page-shell grid gap-10 py-16 md:py-20 lg:grid-cols-[0.8fr_1.2fr]">
      <SectionHeading
        eyebrow="Contact"
        title="ESG 플랫폼 구축과 과업 대응을 상담하세요"
        description="진단 플랫폼, 보고서 발행, 뉴스레터, 지원사업 캘린더 중 필요한 범위를 선택해 시작할 수 있습니다."
      />
      <ContactForm />
    </section>
  );
}
