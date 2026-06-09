# SOILAB ESG Platform

소이랩 ESG 통합 플랫폼 웹 MVP입니다. 스펙의 M1~M3 일부와 M6/M7 기본 화면을 먼저 구현했습니다.

## 실행

```bash
npm install
npm run dev
```

## 포함된 범위

- 공개 포털: `/`, `/services/[slug]`, `/news`, `/cases`, `/programs`, `/about`, `/contact`
- 플랫폼 콘솔: `/app`, `/app/assessment/new`, 결과·분석·보고서·기업 관리 데모
- 관리자: `/admin`, 지표·뉴스·뉴스레터·지원사업·사례·문의·사용자 관리 데모
- API: 채점, 분석, 보고서, HWPX 프록시, 뉴스 cron, 뉴스레터 cron, 문의 접수
- Supabase: 초기 DDL/RLS 정책과 지표·사례·지원사업 seed

## 주요 API

- `POST /api/assessment/score`: 지표 응답과 활동데이터를 받아 점수·등급·배출량 계산
- `POST /api/analysis/generate`: 개선과제 JSON mock 반환
- `POST /api/report/generate`: PDF 발행 mock 반환
- `POST /api/report/hwpx`: `HWPX_SERVICE_URL` 설정 시 Railway FastAPI로 프록시
- `GET /api/cron/news-fetch`: 뉴스 수집 mock
- `GET /api/cron/newsletter-send`: 뉴스레터 발송 mock
- `POST /api/inquiries`: 문의 접수, Supabase/Resend 환경변수 설정 시 저장·알림

## 환경변수

`.env.example`을 기준으로 설정합니다.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
RESEND_API_KEY=
SOLAPI_API_KEY=
SOLAPI_API_SECRET=
HWPX_SERVICE_URL=
HWPX_SERVICE_TOKEN=
CRON_SECRET=
AES_ENCRYPTION_KEY=
ADMIN_NOTIFICATION_EMAIL=
ADMIN_ACCESS_TOKEN=
```

## 관리자 접근

`/admin` 화면은 `ADMIN_ACCESS_TOKEN`이 있으면 해당 값을, 없으면 `CRON_SECRET`을 접근 토큰으로 사용합니다.

```text
https://esg.soilabcoop.kr/admin?token=관리자_토큰
```

한 번 접속하면 8시간 동안 httpOnly 쿠키가 유지됩니다.

## 다음 단계

1. Supabase 프로젝트에 `supabase/migrations/001_initial_schema.sql` 적용
2. `supabase/seed.sql`로 초기 지표 입력
3. Auth/role middleware를 실제 세션 기반으로 강화
4. Claude API JSON 검증, Puppeteer PDF, Railway HWPX 서비스를 실제 발행 플로우로 연결
