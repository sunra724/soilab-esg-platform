import { Download, Mail } from "lucide-react";

import { ReportPreview } from "@/components/product/report-preview";
import { Button } from "@/components/ui/button";

export default function AssessmentReportPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <ReportPreview />
      <aside className="surface h-fit rounded-md p-5">
        <h1 className="text-2xl font-black text-ink-950">보고서 발행</h1>
        <p className="mt-3 text-sm leading-6 text-ink-600">
          현재는 UI와 API 스텁이 연결된 상태입니다. Supabase Storage와 Railway HWPX 서비스 URL을 설정하면 파일 저장·반환 흐름으로 확장됩니다.
        </p>
        <div className="mt-6 grid gap-3">
          <Button>
            <Download size={17} aria-hidden />
            PDF 발행
          </Button>
          <Button variant="secondary">
            <Download size={17} aria-hidden />
            HWPX 생성
          </Button>
          <Button variant="secondary">
            <Mail size={17} aria-hidden />
            이메일 발송
          </Button>
        </div>
      </aside>
    </div>
  );
}
