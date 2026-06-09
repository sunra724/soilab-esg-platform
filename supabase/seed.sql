insert into public.indicators
  (domain, category, code, question, input_type, weight, max_score, kesg_ref, csddd_ref, ecovadis_ref, gri_ref, active, sort)
values
  ('E', '환경경영', 'E-01', '환경경영 목표와 이행계획을 수립했는가', 'number', 12, 5, 'K-ESG E-1', 'Climate transition plan', 'ENV Policy', 'GRI 302/305', true, 10),
  ('E', '온실가스', 'E-02', 'Scope 1·2 배출량을 산정하고 검토하는가', 'number', 16, 5, 'K-ESG E-2', 'GHG inventory', 'Carbon management', 'GRI 305', true, 20),
  ('S', '안전보건', 'S-01', '산업안전보건 리스크를 정기적으로 점검하는가', 'number', 14, 5, 'K-ESG S-1', 'Worker safety', 'LAB Health & safety', 'GRI 403', true, 30),
  ('S', '공급망', 'S-02', '협력사 ESG 평가와 개선 요청 절차가 있는가', 'number', 12, 5, 'K-ESG S-2', 'Due diligence', 'SUP Sustainable procurement', 'GRI 308/414', true, 40),
  ('G', '윤리·준법', 'G-01', '윤리규정과 신고채널을 운영하는가', 'number', 10, 5, 'K-ESG G-1', 'Grievance mechanism', 'ETH Business ethics', 'GRI 205', true, 50),
  ('G', '정보공시', 'G-02', 'ESG 성과를 정기적으로 공개하고 검증하는가', 'number', 10, 5, 'K-ESG G-2', 'Disclosure', 'Transparency', 'GRI 2', true, 60)
on conflict (code) do update set
  question = excluded.question,
  weight = excluded.weight,
  csddd_ref = excluded.csddd_ref,
  ecovadis_ref = excluded.ecovadis_ref,
  gri_ref = excluded.gri_ref,
  active = excluded.active;

insert into public.case_studies (title, slug, summary, body_md, published)
values
  ('대구 제조기업 온실가스 인벤토리 구축', 'daegu-manufacturing-scope', '전력·도시가스·폐기물 데이터를 통합해 Scope 1·2 산정과 감축 과제 7건을 도출했습니다.', '## 요약\n\n온실가스 활동데이터와 ESG 개선과제를 연결했습니다.', true),
  ('경북 협력사 공급망 실사 대응체계', 'gyeongbuk-supply-chain', '협력사 자가진단, 증빙 업로드, 개선 로드맵 템플릿을 표준화했습니다.', '## 요약\n\n협력사 응답과 증빙 관리를 표준화했습니다.', true)
on conflict (slug) do update set
  summary = excluded.summary,
  body_md = excluded.body_md,
  published = excluded.published;

insert into public.support_programs (title, agency, field, region, budget, deadline, source)
values
  ('대구 중소기업 ESG 경영지원 바우처', '대구광역시', '진단·컨설팅', '대구', '기업당 최대 700만원', '2026-07-15', 'admin'),
  ('경북 탄소중립 전환 컨설팅', '경상북도', '온실가스', '경북', '컨설팅 비용 일부 지원', '2026-08-02', 'admin');
