import { AssessmentWizard } from "@/components/product/assessment-wizard";

export default function NewAssessmentPage() {
  return (
    <div className="grid gap-6">
      <div>
        <span className="text-sm font-bold text-water-600">Assessment Wizard</span>
        <h1 className="mt-2 text-3xl font-black text-ink-950">새 ESG 진단</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600">
          K-ESG 초기 지표와 활동데이터를 입력하면 API 채점 엔진이 종합 점수, 영역별 등급, 온실가스 배출량을 계산합니다.
        </p>
      </div>
      <AssessmentWizard />
    </div>
  );
}
