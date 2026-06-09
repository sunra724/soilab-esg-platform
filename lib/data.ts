import {
  BadgeCheck,
  BarChart3,
  BookOpenCheck,
  BriefcaseBusiness,
  ClipboardCheck,
  ClipboardList,
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
    summary: "참여기업 접수, 증빙 제출, 현장방문, ESG 등급 산출, 개선과제와 성과분석까지 한 흐름으로 관리합니다.",
    description:
      "경기도 진단평가 과업에서 반복되는 신청 접수, 제출서류 전산화, 현장방문 일정, 정량 진단, 등급화, 업종·규모별 비교, 만족도와 사후 모니터링 요구를 플랫폼 흐름으로 연결합니다.",
    keywords: ["참여기업 모집·접수", "현장방문 2~3회", "등급 산출", "성과분석"],
    deliverables: ["신청기업 접수·서류 DB", "현장방문 일정·진행 현황", "E/S/G 영역별 점수표", "등급·업종·규모별 비교", "개선과제·로드맵", "만족도·성과분석 자료"],
    process: ["모집·신청 접수", "서류·증빙 검토", "현장방문 진단", "채점·등급 산출", "결과 설명·사후점검"],
    icon: ClipboardCheck
  },
  {
    slug: "consulting",
    title: "심화 컨설팅",
    eyebrow: "실행 로드맵",
    summary: "일반컨설팅과 심화컨설팅을 나눠 공급망, 온실가스, ISO 인증, 데이터 관리체계를 실행 과제로 쪼갭니다.",
    description:
      "세종·서울형 제안요청서에서 요구하는 정밀진단, 현장방문 3회 이상, 단기·중장기 이행계획, 심화 과제 선택형 지원을 컨설팅 워크플로우로 관리합니다.",
    keywords: ["공급망 실사 대응체계", "ESG 실행 로드맵·KPI", "ISO 9001·14001·45001", "온실가스 인벤토리"],
    deliverables: ["취약점 분석", "우선순위 매트릭스", "부서별 KPI", "심화컨설팅 트랙", "사후점검 이력"],
    process: ["정밀진단", "핵심 이슈 도출", "현장 컨설팅", "KPI·로드맵 설계", "사후 이행점검"],
    icon: ShieldCheck
  },
  {
    slug: "education",
    title: "ESG 교육·아카데미",
    eyebrow: "조직 내재화",
    summary: "커리큘럼, 강사풀, 수강생 모집, 출결, 수료, 만족도, 회차별 보고서를 교육 용역 흐름에 맞춰 관리합니다.",
    description:
      "경기도·광명·의왕 교육 과업에서 요구하는 온·오프라인 교육, 실시간 송출, 수강생 통합 관리, 서명부/출결, 만족도 조사, 운영계획서와 최종보고서 산출물을 플랫폼 확장 항목으로 반영했습니다.",
    keywords: ["온·오프라인 교육", "강사 POOL", "수강생·출결 관리", "만족도 조사"],
    deliverables: ["회차별 커리큘럼", "강사 프로필·섭외 이력", "신청자·수료생 통계", "서명부·출결 현황", "만족도 분석", "운영계획·결과보고서"],
    process: ["교육 기획", "홍보·신청 접수", "수강생 선발", "교육 운영·출결", "만족도·결과보고"],
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
    summary: "월별 ESG 이슈, 전문가 기고, 기사 요약, ESG 금융·평가 통계 지표를 뉴스레터 산출물로 묶습니다.",
    description:
      "서울시 ESG 정보제공 과업처럼 월간 뉴스레터 8편, 전문가 기고문, 주요 현안 원고, 기사·통계 정리를 운영자가 승인하고 배포하는 구조로 설계했습니다.",
    keywords: ["월간 뉴스레터", "전문가 기고", "ESG 통계 지표", "뉴스 클리핑"],
    deliverables: ["뉴스 수집 큐", "전문가 기고 기획", "카테고리 분류", "통계 지표 카드", "공개 뉴스 페이지", "뉴스레터 발송"],
    process: ["대주제 설정", "소스 수집", "요약·분류", "전문가 원고 관리", "승인·발송"],
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
  "참여기업 모집·접수 DB",
  "중대성 분석",
  "ESG 실행 로드맵·KPI",
  "공급망 실사 대응체계",
  "지속가능경영보고서 작성·공시 대응",
  "온실가스 인벤토리",
  "수강생·출결·만족도 관리"
];

export const rfpReadinessItems = [
  {
    area: "참여기업 모집·신청 접수",
    source: "경기도 진단평가 300개사 과업",
    requirement: "홍보물 제작, 유선·이메일·홈페이지 모집, 신청 접수 시스템, 업종·지역별 접수 현황 실시간 관리",
    platform: "문의/신청 DB, 관리자 리드 상태, 기업 정보 테이블, 모집 현황 대시보드로 확장",
    status: "기반 반영",
    next: "지원사업별 신청 폼과 제출서류 보완 요청 워크플로우"
  },
  {
    area: "증빙·서류 전산화",
    source: "진단평가·컨설팅 공통 요구",
    requirement: "제출서류 접수·관리·전산화, 증빙자료 제출, 미비서류 보완 요청, 신용정보 기반 검증",
    platform: "Supabase Storage와 responses.evidence_path, 기업별 파일 이력 구조 준비",
    status: "스키마 반영",
    next: "파일 업로드 UI와 보완요청 알림"
  },
  {
    area: "현장방문 진단·컨설팅",
    source: "경기도 2회 방문, 세종 3회 이상 방문",
    requirement: "방문계획 수립, 일정 관리, 현장 진단, 결과 설명 재방문, 사후 이행점검",
    platform: "평가 진행 페이지와 개선과제 상태, 신규 field_visits 마이그레이션 초안",
    status: "확장 반영",
    next: "방문 일정 캘린더와 컨설턴트 배정"
  },
  {
    area: "등급·성과분석",
    source: "경기도 5개년 960개사 성과분석",
    requirement: "평가등급화, 업종·기업규모별 비교, 전후 개선 추이, 만족도와 사업 효과성 분석",
    platform: "scores, emissions, result 차트, 성과분석 지표 카드",
    status: "화면 반영",
    next: "다년도 성과분석 테이블과 비교군 관리"
  },
  {
    area: "교육 운영·수강생 관리",
    source: "경기도·광명·의왕 ESG 인식확산 교육",
    requirement: "커리큘럼, 강사풀, 신청자 데이터, 수강생 선발, 출결·서명부, 수료생 통계, SMS·메일 독려",
    platform: "교육 서비스 카피 강화, education_* 마이그레이션 초안",
    status: "확장 반영",
    next: "교육 신청·출결·수료증 관리자 UI"
  },
  {
    area: "만족도 조사·결과보고",
    source: "교육·진단평가 공통 만족도 요구",
    requirement: "회차별 만족도 조사, 강사·내용·환경 평가, 응답률 관리, 분석자료 제출",
    platform: "survey 테이블 초안과 보고서 발행 흐름에 포함",
    status: "확장 반영",
    next: "설문 폼과 결과 대시보드"
  },
  {
    area: "월간 ESG 정보제공",
    source: "서울시 뉴스레터 8편·통계 지표 과업",
    requirement: "전문가 기고, 주요 현안 원고, 기사 요약, ESG 금융·평가·RE100 통계 정리",
    platform: "뉴스 큐레이션, 뉴스레터, 구독자 발송 API 구조",
    status: "기반 반영",
    next: "통계 지표 카드와 기고문 워크플로우"
  },
  {
    area: "보안·산출물 관리",
    source: "보안각서·자료 암호화·최종 산출물 제출 요구",
    requirement: "접근권한, 자료 암호화, 접근기록, 보안교육·서약, 착수·중간·최종보고와 원본파일 제출",
    platform: "관리자 토큰 가드, RLS 정책, reports/project_deliverables 마이그레이션 초안",
    status: "기반 반영",
    next: "역할 기반 Auth와 감사 로그"
  }
];

export const educationProgramTemplates = [
  {
    title: "ESG 규제 대응 전략",
    mode: "온·오프라인",
    duration: "120분 내외",
    topics: ["CBAM·CSDDD 규제 동향", "공급망 실사 대응", "경기도·지역 중소기업 대응 방안"]
  },
  {
    title: "ESG 실무 담당자 역량강화",
    mode: "온라인 Live",
    duration: "3시간",
    topics: ["RE100·탄소중립", "정보공시·평가 대응", "기업 맞춤형 실행 전략"]
  },
  {
    title: "찾아가는 ESG 교육",
    mode: "오프라인",
    duration: "2시간",
    topics: ["ESG 경영 쉬운 이해", "중소기업 생존 전략", "현장 적용 사례와 실습"]
  }
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
    href: "/admin/projects",
    title: "과업 대응",
    icon: ClipboardList,
    rows: "8개 요구축",
    description: "나라장터 과업지시서 반복 요구사항과 플랫폼 대응 상태를 관리합니다."
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
    icon: BriefcaseBusiness,
    rows: "3개 예정 사업",
    description: "지원사업 캘린더와 마감일 노출을 관리합니다."
  }
];
