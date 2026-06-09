import {
  BadgeCheck,
  BarChart3,
  BookOpenCheck,
  ClipboardCheck,
  FileText,
  Globe2,
  Leaf,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  keywords: string[];
  deliverables: string[];
  process: string[];
  icon: typeof Leaf;
};

export const services: Service[] = [
  {
    slug: "assessment",
    title: "ESG 진단·등급 산출",
    eyebrow: "평가 플랫폼",
    summary: "K-ESG 기반 자체 진단, 영역별 점수, 글로벌 프레임워크 대응 현황을 한 화면에서 확인합니다.",
    description:
      "기관 과업에서 반복되는 ESG 수준진단을 데이터 입력, 증빙 관리, 채점, 등급 산출, 결과 리포트까지 연결합니다.",
    keywords: ["K-ESG", "중대성 분석", "등급 산출", "글로벌 지표 매핑"],
    deliverables: ["진단 설문과 활동데이터 입력", "E/S/G 영역별 점수표", "CSDDD·EcoVadis·GRI 커버리지", "온실가스 배출량 요약"],
    process: ["지표 선택", "응답·증빙 입력", "채점 엔진 계산", "결과 대시보드 발행"],
    icon: ClipboardCheck
  },
  {
    slug: "consulting",
    title: "심화 컨설팅",
    eyebrow: "실행 로드맵",
    summary: "공급망 실사 대응체계, 온실가스 인벤토리, ISO 인증 준비를 실행 과제로 쪼갭니다.",
    description:
      "진단 결과에서 취약 항목을 추출하고 단기·중장기 개선과제로 전환해 컨설팅 산출물의 일관성을 높입니다.",
    keywords: ["공급망 실사 대응체계", "ESG 실행 로드맵·KPI", "ISO 인증", "온실가스 인벤토리"],
    deliverables: ["취약점 분석", "우선순위 매트릭스", "부서별 KPI", "이행상태 관리"],
    process: ["진단 결과 검토", "핵심 이슈 도출", "KPI 설계", "로드맵 운영"],
    icon: ShieldCheck
  },
  {
    slug: "education",
    title: "ESG 교육·아카데미",
    eyebrow: "조직 내재화",
    summary: "임직원·협력사 대상 교육과 수료 관리를 플랫폼 데이터와 연결할 수 있게 설계했습니다.",
    description:
      "교육은 별도 LMS로 확장 가능하도록 남겨두되, 현재 포털에서는 프로그램 안내와 문의 전환에 집중합니다.",
    keywords: ["ESG 기초교육", "공급망 교육", "온실가스 실무", "수료증 확장"],
    deliverables: ["교육 과정 안내", "기관 맞춤 커리큘럼", "사전·사후 진단", "만족도 리포트"],
    process: ["대상 정의", "커리큘럼 구성", "현장·온라인 교육", "성과 리포트"],
    icon: BookOpenCheck
  },
  {
    slug: "reporting",
    title: "지속가능경영보고서",
    eyebrow: "공시 대응",
    summary: "진단 결과와 개선 로드맵을 보고서 템플릿으로 묶어 PDF/HWPX 발행 흐름까지 준비합니다.",
    description:
      "정량 차트와 정성 서술을 결합해 간이 지속가능경영보고서와 진단보고서를 빠르게 제작합니다.",
    keywords: ["지속가능경영보고서 작성·공시 대응", "중대성 평가", "GRI", "보고서 버전 관리"],
    deliverables: ["진단보고서", "간이 지속가능경영보고서", "PDF·HWPX 발행", "메일 발송"],
    process: ["데이터 취합", "보고서 템플릿 적용", "검토·버전 관리", "발행·배포"],
    icon: FileText
  },
  {
    slug: "content",
    title: "ESG 콘텐츠·뉴스레터",
    eyebrow: "뉴스 클리핑",
    summary: "ESG·CBAM·RE100·공급망실사 뉴스를 수집하고 요약해 웹과 뉴스레터로 배포합니다.",
    description:
      "관리자 승인 기반 큐레이션으로 저작권 리스크를 줄이고, 원문 링크와 자체 요약만 공개합니다.",
    keywords: ["뉴스 클리핑", "AI 요약", "뉴스레터", "지원사업 캘린더"],
    deliverables: ["뉴스 수집 큐", "카테고리 분류", "공개 뉴스 페이지", "뉴스레터 발송"],
    process: ["소스 수집", "요약·분류", "관리자 승인", "구독자 발송"],
    icon: Megaphone
  }
];

export const platformStats = [
  { label: "진단 영역", value: "E · S · G", caption: "K-ESG 기반" },
  { label: "보고서 형식", value: "PDF/HWPX", caption: "기관 제출 대응" },
  { label: "뉴스 키워드", value: "8+", caption: "CBAM·RE100 포함" },
  { label: "운영 역할", value: "4", caption: "기업·컨설턴트·관리자" }
];

export const capabilityRail = [
  "중대성 분석",
  "ESG 실행 로드맵·KPI",
  "공급망 실사 대응체계",
  "지속가능경영보고서 작성·공시 대응",
  "온실가스 인벤토리"
];

export const dashboardMetrics = [
  { label: "종합 점수", value: 82, tone: "earth" },
  { label: "환경", value: 78, tone: "water" },
  { label: "사회", value: 86, tone: "sun" },
  { label: "지배구조", value: 80, tone: "coral" }
];

export const cases = [
  {
    slug: "daegu-manufacturing-scope",
    title: "대구 제조기업 온실가스 인벤토리 구축",
    sector: "제조",
    summary: "전력·도시가스·폐기물 데이터를 통합해 Scope 1·2 산정과 감축 과제 7건을 도출했습니다.",
    impact: "배출 원단위 관리 체계 수립",
    date: "2026-03-18"
  },
  {
    slug: "gyeongbuk-supply-chain",
    title: "경북 협력사 공급망 실사 대응체계",
    sector: "공급망",
    summary: "협력사 자가진단, 증빙 업로드, 개선 로드맵 템플릿을 표준화했습니다.",
    impact: "협력사 응답률 91%",
    date: "2026-02-05"
  },
  {
    slug: "public-agency-reporting",
    title: "공공기관 지속가능경영보고서 초안 자동화",
    sector: "공시",
    summary: "진단 결과와 중대성 평가를 연결해 보고서 초안 작성 시간을 줄였습니다.",
    impact: "초안 리드타임 40% 절감",
    date: "2026-01-14"
  }
];

export const newsItems = [
  {
    slug: "cbam-supply-chain-readiness",
    title: "CBAM 전환기에 필요한 협력사 데이터 관리",
    category: "CBAM",
    summary: "수출기업은 제품 단위 배출량과 협력사 활동데이터를 분리 관리하는 체계가 필요합니다.",
    source: "SOILAB ESG Brief",
    publishedAt: "2026-06-03",
    keywords: ["CBAM", "공급망", "배출량"]
  },
  {
    slug: "materiality-roadmap",
    title: "중대성 평가 결과를 KPI로 연결하는 방법",
    category: "중대성평가",
    summary: "중대 이슈는 보고서 목차를 넘어 부서별 실행 지표와 예산 계획까지 이어져야 합니다.",
    source: "SOILAB ESG Brief",
    publishedAt: "2026-05-29",
    keywords: ["중대성 분석", "KPI", "로드맵"]
  },
  {
    slug: "kesg-global-coverage",
    title: "K-ESG 진단과 글로벌 프레임워크 커버리지",
    category: "K-ESG",
    summary: "국내 진단 지표에 CSDDD, EcoVadis, GRI 참조를 붙이면 해외 고객사 대응 속도가 올라갑니다.",
    source: "SOILAB ESG Brief",
    publishedAt: "2026-05-22",
    keywords: ["K-ESG", "EcoVadis", "GRI"]
  }
];

export const supportPrograms = [
  {
    title: "대구 중소기업 ESG 경영지원 바우처",
    agency: "대구광역시",
    region: "대구",
    field: "진단·컨설팅",
    deadline: "2026-07-15",
    budget: "기업당 최대 700만원"
  },
  {
    title: "경북 탄소중립 전환 컨설팅",
    agency: "경상북도",
    region: "경북",
    field: "온실가스",
    deadline: "2026-08-02",
    budget: "컨설팅 비용 일부 지원"
  },
  {
    title: "공급망 ESG 대응 역량강화",
    agency: "중소벤처기업부",
    region: "전국",
    field: "공급망",
    deadline: "2026-09-10",
    budget: "교육·진단 패키지"
  }
];

export const sampleIndicators = [
  {
    code: "E-01",
    domain: "E",
    category: "환경경영",
    question: "환경경영 목표와 이행계획을 수립했는가",
    weight: 12,
    maxScore: 5,
    csddd: "Climate transition plan",
    ecovadis: "ENV Policy",
    gri: "GRI 302/305"
  },
  {
    code: "E-02",
    domain: "E",
    category: "온실가스",
    question: "Scope 1·2 배출량을 산정하고 검토하는가",
    weight: 16,
    maxScore: 5,
    csddd: "GHG inventory",
    ecovadis: "Carbon management",
    gri: "GRI 305"
  },
  {
    code: "S-01",
    domain: "S",
    category: "안전보건",
    question: "산업안전보건 리스크를 정기적으로 점검하는가",
    weight: 14,
    maxScore: 5,
    csddd: "Worker safety",
    ecovadis: "LAB Health & safety",
    gri: "GRI 403"
  },
  {
    code: "S-02",
    domain: "S",
    category: "공급망",
    question: "협력사 ESG 평가와 개선 요청 절차가 있는가",
    weight: 12,
    maxScore: 5,
    csddd: "Due diligence",
    ecovadis: "SUP Sustainable procurement",
    gri: "GRI 308/414"
  },
  {
    code: "G-01",
    domain: "G",
    category: "윤리·준법",
    question: "윤리규정과 신고채널을 운영하는가",
    weight: 10,
    maxScore: 5,
    csddd: "Grievance mechanism",
    ecovadis: "ETH Business ethics",
    gri: "GRI 205"
  },
  {
    code: "G-02",
    domain: "G",
    category: "정보공시",
    question: "ESG 성과를 정기적으로 공개하고 검증하는가",
    weight: 10,
    maxScore: 5,
    csddd: "Disclosure",
    ecovadis: "Transparency",
    gri: "GRI 2"
  }
];

export const assessmentSnapshot = {
  company: "소이랩 데모기업",
  grade: "A",
  totalScore: 82.4,
  status: "analyzed",
  scores: [
    { domain: "환경", score: 78, benchmark: 71 },
    { domain: "사회", score: 86, benchmark: 74 },
    { domain: "지배구조", score: 80, benchmark: 70 }
  ],
  emissions: [
    { source: "전력", scope: "Scope 2", amount: 128.4 },
    { source: "도시가스", scope: "Scope 1", amount: 64.2 },
    { source: "폐기물", scope: "Scope 3", amount: 18.7 }
  ],
  tasks: [
    { title: "Scope 1·2 산정 근거 문서화", domain: "E", priority: 1, horizon: "short", status: "진행" },
    { title: "협력사 ESG 자가진단 양식 배포", domain: "S", priority: 2, horizon: "short", status: "대기" },
    { title: "이사회 ESG KPI 분기 리뷰", domain: "G", priority: 3, horizon: "mid-long", status: "대기" }
  ]
};

export const adminTables = [
  {
    href: "/admin/indicators",
    title: "지표 관리",
    icon: BarChart3,
    rows: "6개 초기 지표",
    description: "배점, 활성 여부, 글로벌 프레임워크 매핑을 관리합니다."
  },
  {
    href: "/admin/news",
    title: "뉴스 큐레이션",
    icon: Globe2,
    rows: "3개 대기 기사",
    description: "수집된 ESG 뉴스를 승인하고 공개 상태로 전환합니다."
  },
  {
    href: "/admin/inquiries",
    title: "문의 관리",
    icon: Users,
    rows: "리드 상태 추적",
    description: "서비스 문의와 후속 연락 상태를 관리합니다."
  },
  {
    href: "/admin/newsletter",
    title: "뉴스레터",
    icon: Sparkles,
    rows: "월간 브리프",
    description: "발행 기사 기반으로 본문을 구성하고 구독자 그룹에 발송합니다."
  },
  {
    href: "/admin/cases",
    title: "사례 CMS",
    icon: BadgeCheck,
    rows: "3개 공개 사례",
    description: "성과 사례의 요약, 본문, 공개 상태를 편집합니다."
  },
  {
    href: "/admin/programs",
    title: "지원사업",
    icon: Leaf,
    rows: "3개 예정 사업",
    description: "지원사업 캘린더와 마감일 노출을 관리합니다."
  }
];
