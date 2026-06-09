import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://esg.soilabcoop.kr"),
  title: {
    default: "SOILAB ESG Platform",
    template: "%s | SOILAB ESG Platform"
  },
  description: "ESG 진단, 분석, 보고서 발행, 뉴스 클리핑을 하나로 묶은 소이랩 통합 플랫폼입니다.",
  openGraph: {
    title: "SOILAB ESG Platform",
    description: "기관 과업지시서가 반복 요구하는 ESG 기능을 하나의 플랫폼으로 구현합니다.",
    url: "https://esg.soilabcoop.kr",
    siteName: "SOILAB ESG Platform",
    locale: "ko_KR",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
