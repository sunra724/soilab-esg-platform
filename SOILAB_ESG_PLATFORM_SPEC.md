# 소이랩 ESG 통합 플랫폼 구축 사양서 (Codex 작업 지시용)

> 도메인: `esg.soilabcoop.kr`
> 목적: 기관 과업지시서가 반복 요구하는 ESG 기능을 하나의 플랫폼으로 구현한다.
> 척추 4기능: (1) 포털 홈 (2) 분석·보고서 발행 (3) 평가 플랫폼 (4) 뉴스 클리핑·배포
> 범위 제외(현 단계): 입찰자격(실적·인력) 관리 화면 — 나중 단계로 보류.

---

## 0. 기술 스택 & 배포

| 영역 | 선택 | 비고 |
|---|---|---|
| 프레임워크 | Next.js 15 (App Router, RSC) + TypeScript | 단일 앱, route group으로 분리 |
| 스타일 | Tailwind CSS 4 + shadcn/ui | `SOILAB_DESIGN.md` v1.1 토큰 적용 |
| DB/Auth/Storage | Supabase (Postgres + Auth + Storage + RLS) | 증빙파일·보고서 파일은 Storage |
| 메일 | Resend | 뉴스레터·리드·보고서 발송 |
| SMS/알림톡 | Solapi | 진단완료·보고서 발행 알림 |
| LLM | Anthropic Claude API (server-side) | 분석·뉴스 요약·개선과제 생성 |
| 스케줄러 | Vercel Cron | 뉴스 수집·뉴스레터 발송 |
| 호스팅 | Vercel (웹) + Railway (HWPX/PDF 파이썬 서비스) | HWPX는 python-hwpx 필요 → 분리 |

route group 구성: `app/(public)` · `app/(app)` · `app/(admin)` · `app/api/*`

---

## 1. 시스템 아키텍처 개요

```
[방문자/기업/컨설턴트/관리자]
        │
        ▼
┌─────────────────────────── Next.js 15 (Vercel) ───────────────────────────┐
│ (public) 포털 홈·서비스·뉴스·사례·문의                                      │
│ (app)    진단 입력 → 채점 → 분석 → 결과/보고서                               │
│ (admin)  지표·뉴스·뉴스레터·지원사업·사례·사용자 관리                        │
│ api/     채점엔진 · 분석생성 · 보고서생성 · cron(뉴스/뉴스레터)              │
└───────┬───────────────┬───────────────┬───────────────┬───────────────────┘
        │               │               │               │
        ▼               ▼               ▼               ▼
   Supabase         Claude API       Resend/Solapi   Railway: FastAPI
 (DB/Auth/Storage)  (분석·요약)       (메일·SMS)      (HWPX·PDF 생성)
                                                       └ python-hwpx / ReportLab
```

기존 자산 흡수:
- **Railway K-ESG 대시보드** → M3 평가 플랫폼이 대체. `companies/assessments/scores` 스키마로 데이터 이관.
- **esg-edu 산정 로직**(배출계수: 전력 0.4541, 도시가스 2.182 등) → M3 온실가스 산정 모듈에서 재사용.
- **GAS 뉴스 브리핑 키워드 로직** → M6 뉴스 수집 cron으로 포팅.
- **나라장터 모니터링** → M9 지원사업 캘린더로 연계(선택).

---

## 2. 사용자 역할 & 권한 (RLS)

| 역할 | 권한 |
|---|---|
| `visitor` | 공개 포털·뉴스·사례 열람, 문의 작성 |
| `company` | 본인 기업 진단 입력·결과·보고서 열람만 (RLS: `company_id = auth.uid()` 매핑) |
| `consultant` | 배정된 기업 진단·분석·보고서 작성/검토 |
| `admin` | 전체 + 지표·뉴스·뉴스레터·지원사업·사례·사용자 관리 |

Supabase Auth(이메일/패스워드 + 매직링크). 모든 테이블 RLS 기본 ON. 민감 식별정보(사업자번호 등)는 AES-256 컬럼 암호화(기존 기타소득 시스템 패턴 재사용).

---

## 3. 정보구조(IA) / 라우트 맵

### 공개 (public)
| 라우트 | 내용 |
|---|---|
| `/` | 랜딩: 소개·서비스 5종·플랫폼 보유 강조·신뢰요소·CTA |
| `/services/assessment` | ESG 진단·등급 산출 |
| `/services/consulting` | 심화컨설팅(온실가스 인벤토리·ISO인증·공급망 대응) |
| `/services/education` | ESG 교육·아카데미 |
| `/services/reporting` | 지속가능경영보고서 작성 |
| `/services/content` | ESG 콘텐츠·뉴스레터 |
| `/news`, `/news/[slug]` | ESG 뉴스 클리핑 노출 |
| `/programs` | 대구·경북 ESG 지원사업 캘린더(선택) |
| `/cases`, `/cases/[slug]` | 사례 |
| `/about`, `/contact` | 소개·문의 |

서비스 페이지 카피에는 발주처 과업 용어를 키워드로 명시: "중대성 분석", "ESG 실행 로드맵·KPI", "공급망 실사 대응체계", "지속가능경영보고서 작성·공시 대응", "온실가스 인벤토리".

### 인증 영역 (app)
| 라우트 | 내용 |
|---|---|
| `/app` | 역할별 대시보드 |
| `/app/assessment/new` | 진단 마법사(E/S/G 단계 + 활동데이터 입력) |
| `/app/assessment/[id]` | 진단 진행/요약 |
| `/app/assessment/[id]/result` | 등급·영역별 점수·온실가스 차트 |
| `/app/assessment/[id]/analysis` | AI 취약점·개선과제·로드맵 |
| `/app/assessment/[id]/report` | 보고서 미리보기·발행(PDF/HWPX) |
| `/app/reports` | 보고서 목록 |
| `/app/companies`, `/app/companies/[id]` | (consultant/admin) 기업 관리 |

### 관리자 (admin)
`/admin/indicators` · `/admin/news` · `/admin/newsletter` · `/admin/programs` · `/admin/cases` · `/admin/inquiries` · `/admin/users`

### API / 서버액션
- `POST /api/assessment/score` 채점 계산
- `POST /api/analysis/generate` Claude 호출 → 개선과제 JSON
- `POST /api/report/generate` HTML→PDF 생성
- `POST /api/report/hwpx` Railway FastAPI 호출 → HWPX
- `GET /api/cron/news-fetch` (Vercel Cron) 수집→요약→저장
- `GET /api/cron/newsletter-send` 정기 발송

---

## 4. 데이터 모델 (Supabase / Postgres DDL 요약)

```sql
-- 사용자/권한
profiles(id uuid pk = auth.users.id, role text, name text, org text, created_at)

-- 기업
companies(id uuid pk, name text, biz_no_enc text, industry text, size text,
          region text, owner_profile_id uuid, created_at)

-- 진단 회차
assessments(id uuid pk, company_id uuid fk, status text,  -- draft/scored/analyzed/reported
            framework text default 'k-esg', total_score numeric, grade text,
            created_by uuid, created_at, scored_at)

-- 지표 마스터 (K-ESG + 글로벌 매핑)
indicators(id uuid pk, domain text,           -- E/S/G
           category text, code text, question text,
           input_type text,                    -- number/select/boolean/file
           weight numeric, max_score numeric,
           kesg_ref text, csddd_ref text, ecovadis_ref text, gri_ref text,
           active boolean, sort int)

-- 기업 응답
responses(id uuid pk, assessment_id uuid fk, indicator_id uuid fk,
          value_num numeric, value_text text, evidence_path text, created_at)

-- 채점 결과 (영역별)
scores(id uuid pk, assessment_id uuid fk, domain text,
       raw numeric, weighted numeric, grade text)

-- 온실가스 산정
emissions(id uuid pk, assessment_id uuid fk, scope int, source text,
          activity_amount numeric, unit text, factor numeric, tco2eq numeric)

-- 개선과제 (AI 생성)
improvement_tasks(id uuid pk, assessment_id uuid fk, domain text,
                  title text, detail text, priority int,
                  horizon text,                -- short/mid-long
                  status text, created_at)

-- 보고서
reports(id uuid pk, assessment_id uuid fk, type text,  -- diagnosis/sustainability
        version int, format text,                       -- pdf/hwpx
        file_path text, published boolean, created_at)

-- 뉴스
news_sources(id uuid pk, name text, type text, url text, active boolean)
news_items(id uuid pk, source_id uuid, title text, url text, published_at,
           raw_excerpt text, ai_summary text, keywords text[],
           category text, status text,          -- pending/approved/published
           slug text, created_at)
newsletters(id uuid pk, title text, body_html text, sent_at, recipient_group text)
subscribers(id uuid pk, email text unique, consent boolean, group text, created_at)

-- 지원사업 (선택)
support_programs(id uuid pk, title text, agency text, field text, region text,
                 budget text, deadline date, link text, source text, created_at)

-- 포털 콘텐츠
case_studies(id uuid pk, title text, slug text, summary text, body_md text,
             cover_path text, published boolean, created_at)
inquiries(id uuid pk, name text, org text, email text, phone text,
          service text, message text, status text, created_at)
```

---

## 5. 핵심 기능 모듈 (Codex 작업 단위, 순서대로)

각 모듈은 독립 PR 단위로 빌드. 모듈 끝의 "수용 기준"을 통과해야 다음으로 진행.

### M1 — 기반 / 인증 / 브랜드
- 목적: 프로젝트 부트스트랩 + 공통 레이아웃 + 인증.
- 산출: Next.js 15 App Router 구조, Tailwind 4 + shadcn/ui, `SOILAB_DESIGN.md` 토큰을 `globals.css`/`tailwind.config`에 반영. 헤더/푸터/네비. Supabase 클라이언트(서버/클라). Auth(로그인·매직링크) + `profiles` + 역할 미들웨어 + RLS 정책 초기화.
- 수용: 4개 역할로 로그인 시 라우트 가드가 정확히 동작.

### M2 — 공개 포털 + 리드
- 목적: 기관 요구 용어가 박힌 마케팅 사이트 + 문의 수집.
- 산출: `/` 및 서비스 5종 페이지(반응형, OG 메타, SEO). `/contact` 폼 → `inquiries` 저장 → Resend로 관리자 알림. `/cases` 목록·상세(M9 CMS와 연동, 초기엔 더미).
- 수용: 모바일/ultrawide 양쪽 레이아웃 정상, 문의 제출 시 메일 수신.

### M3 — 평가 플랫폼 (입력 · 채점 · 결과)
- 목적: 기관이 요구하는 "자체 ESG 평가 플랫폼 + 등급 산출". Railway 대시보드 대체.
- 산출:
  - 진단 마법사 `/app/assessment/new`: E/S/G 단계별 + 활동데이터(전력·연료·용수·폐기물·인력·이사회 등) 입력, 증빙 업로드(Supabase Storage).
  - 채점 엔진 `POST /api/assessment/score`: `indicators.weight/max_score` 기반 영역별·종합 점수와 등급 산출 → `scores`. 계산식은 화면에 공개(블랙박스 방지, esg-edu 방식 계승).
  - 온실가스 산정: 활동량 × 배출계수 → `emissions`(scope별 tCO₂eq, 매출액 원단위). 계수는 `indicators` 또는 설정 테이블에서 관리.
  - 결과 대시보드 `/result`: 등급 배지, 영역별 레이더/막대 차트(recharts), 업종 비교(있으면), 온실가스 요약.
  - **글로벌 지표 커버리지**: 각 지표의 `csddd_ref/ecovadis_ref/gri_ref`를 결과 화면에 매핑 표시(K-ESG 점수 + "글로벌 프레임워크 대응 현황").
- 수용: 동일 입력으로 점수·등급·배출량이 재현되고, 결과 화면에 글로벌 매핑이 노출.

### M4 — 분석 · AI (개선과제 · 로드맵 · 중대성)
- 목적: 진단 결과를 컨설팅 산출물로 전환.
- 산출:
  - `POST /api/analysis/generate`: 진단 점수·취약 항목을 Claude API에 전달 → 영역별 취약점, 우선순위가 매겨진 개선과제, 단기/중장기 로드맵을 **구조화 JSON**으로 응답받아 `improvement_tasks` 저장. (프롬프트에 JSON-only 강제, 서버에서 파싱·검증.)
  - 중대성 평가 매트릭스 UI(영향도×중요도 2축, 항목 드래그/점수).
  - `/analysis` 화면: 과제 카드(우선순위·기한·이행상태 토글).
- 수용: 진단 1건 → 5~10개 개선과제와 단기/중장기 로드맵이 자동 생성·저장.

### M5 — 보고서 발행 (PDF / HWPX)
- 목적: 진단보고서 + 간이 지속가능경영보고서 생성.
- 산출:
  - HTML 보고서 템플릿 2종(diagnosis / sustainability): 사업개요·진단결과·영역별 분석·온실가스·개선 로드맵·중대성. 정량(차트)+정성(서술) 결합.
  - `POST /api/report/generate`: HTML→PDF(@sparticuz/chromium + Puppeteer 또는 react-pdf, NanumGothic 임베드) → Storage 저장 → `reports`.
  - `POST /api/report/hwpx`: Railway FastAPI(python-hwpx)에 보고서 데이터 전달 → HWPX 반환. **규칙 준수**: 템플릿 deepcopy 기반, `linesegarray` 제거, `&`→`&amp;`, lxml 검증, 원본 ZIP 재패킹(PDF_TO_HWPX_GUIDE 패턴).
  - `/report` 화면: 미리보기 + 발행(버전 관리) + 다운로드(PDF/HWPX) + Resend 발송.
- 수용: 한 진단에서 PDF와 HWPX가 모두 정상 생성·다운로드되고 한글에서 열림.

### M6 — 뉴스 클리핑 · 배포
- 목적: ESG 뉴스 수집→AI 요약·분류→웹 노출 + 뉴스레터 발송.
- 산출:
  - `news_sources` 관리(RSS/기관 발표 URL).
  - `GET /api/cron/news-fetch`(Vercel Cron, KST 오전): 소스 수집 → Claude API로 요약·키워드 분류(ESG·공급망실사·CBAM·지속가능경영·탄소중립·RE100·K-ESG·중대성평가 등 — 기존 GAS 키워드 재사용) → `news_items(status=pending)`.
  - 관리자 큐레이션 `/admin/news`: 승인/발행(`approved`→`published`, slug 생성).
  - 공개 `/news`·`/news/[slug]`: 발행 기사 노출(카테고리 필터).
  - 뉴스레터 `/admin/newsletter`: 기간 내 발행 기사로 본문 자동 구성 → `newsletters` → `GET /api/cron/newsletter-send`로 Resend 발송(구독자 그룹별). `subscribers` 구독 폼 + 동의 + 수신거부 링크.
- 수용: cron 1회 실행 시 기사 수집·요약·분류 저장, 관리자 승인 후 웹 노출, 뉴스레터 1회 발송 성공.

> 저작권: 뉴스는 원문 전문 저장·노출 금지. `ai_summary`(자체 요약)와 원문 링크만 노출. `raw_excerpt`는 내부 처리용 단문으로 제한.

### M7 — 관리자 백오피스
- 목적: 비개발자 운영.
- 산출: `/admin/indicators`(지표 CRUD·배점·글로벌 매핑·활성), `/admin/cases`(사례 CMS, body_md), `/admin/inquiries`(리드 상태), `/admin/users`(역할 변경), `/admin/programs`(M9 시 활성). 공통 테이블 UI(검색·정렬·페이지네이션).
- 수용: 관리자가 지표 추가/수정 시 진단 마법사에 즉시 반영.

### M8 — 알림 / 메시징 공통 모듈
- 목적: Solapi(SMS/알림톡) + Resend(이메일) 통합 발송 유틸.
- 산출: 트리거 — 진단 완료, 보고서 발행, 리드 접수, 뉴스레터. 템플릿 관리 + 발송 로그.
- 수용: 각 트리거에서 지정 채널로 발송·로그 기록.

### M9 (선택) — 지원사업 캘린더 + 사례 강화
- 목적: 대구·경북 ESG 지원사업 노출(재방문 훅).
- 산출: `support_programs` 수집(나라장터 모니터링 연계 또는 관리자 수기) → `/programs` 캘린더/리스트(마감일 정렬, 지역·분야 필터).
- 수용: 관리자 등록 사업이 공개 캘린더에 노출.

---

## 6. 외부 연동 요약

| 연동 | 용도 | 비고 |
|---|---|---|
| Claude API | 개선과제 생성(M4), 뉴스 요약·분류(M6) | server-side only, JSON 강제·검증 |
| Resend | 뉴스레터·리드·보고서 메일 | 수신거부/동의 관리 |
| Solapi | 진단·보고서 알림 SMS/알림톡 | M8 공통 모듈 경유 |
| Railway FastAPI | HWPX/PDF 생성 | python-hwpx·ReportLab, 인증 토큰으로 보호 |
| Vercel Cron | 뉴스 수집·뉴스레터 발송 | KST 시간대 주의(UTC 변환) |

---

## 7. Codex 빌드 순서 & 권장 진행

1. **M1 → M2** (기반·포털) — 먼저 배포해 도메인·브랜드 확정.
2. **M3 → M4 → M5** (평가→분석→보고서) — 핵심 가치사슬. M3 완료 시 Railway 데이터 이관.
3. **M6** (뉴스) — 독립적이라 병행 가능.
4. **M7 → M8** (운영·알림).
5. **M9** (선택).

각 모듈 PR 시 포함: 마이그레이션 SQL, RLS 정책, 시드 데이터(특히 M3 `indicators` 초기 셋), 기본 단위 테스트, README의 환경변수 목록.

---

## 8. 환경변수 (.env)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
RESEND_API_KEY=
SOLAPI_API_KEY=
SOLAPI_API_SECRET=
HWPX_SERVICE_URL=          # Railway FastAPI
HWPX_SERVICE_TOKEN=
CRON_SECRET=               # Vercel Cron 인증
AES_ENCRYPTION_KEY=        # 사업자번호 등 암호화
```

---

## 9. 비고

- `indicators`를 데이터로 분리했으므로, K-ESG 외 다른 평가체계(업종 특화)도 시드만 바꿔 확장 가능.
- esg-edu는 당분간 별도 교육 MVP로 유지하되, 추후 M3 위에 LMS(수강·수료증·만족도) 모듈을 얹어 교육 용역 대응 자산으로 통합 가능.
- 입찰 실적·인력 관리 화면은 본 사양에서 제외(보류). 추후 `/admin`에 모듈 추가하는 형태로 확장.
