import { revalidatePath } from "next/cache";

import { Badge } from "@/components/ui/badge";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Inquiry = {
  id: string;
  name: string;
  org: string | null;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  status: string;
  created_at: string;
};

const inquiryStatuses = ["new", "contacted", "proposal", "closed"];

async function getInquiries() {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("inquiries")
      .select("id, name, org, email, phone, service, message, status, created_at")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      return { inquiries: [] as Inquiry[], error: error.message };
    }

    return { inquiries: (data ?? []) as Inquiry[], error: null };
  } catch (error) {
    return { inquiries: [] as Inquiry[], error: error instanceof Error ? error.message : "Unknown error" };
  }
}

async function updateInquiryStatus(formData: FormData) {
  "use server";

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!id || !inquiryStatuses.includes(status)) {
    return;
  }

  const supabase = createSupabaseAdminClient();
  await supabase.from("inquiries").update({ status }).eq("id", id);
  revalidatePath("/admin/inquiries");
}

export default async function AdminInquiriesPage() {
  const { inquiries, error } = await getInquiries();

  return (
    <div className="grid gap-6">
      <div>
        <span className="text-sm font-bold text-water-600">Leads</span>
        <h1 className="mt-2 text-3xl font-black text-ink-950">문의 관리</h1>
        <p className="mt-2 text-sm leading-6 text-ink-600">공개 문의 폼에서 접수된 리드를 최신순으로 확인하고 후속 상태를 바꿉니다.</p>
      </div>

      {error ? <div className="rounded-md border border-coral-500/20 bg-red-50 p-4 text-sm font-semibold text-coral-500">{error}</div> : null}

      <div className="grid gap-3">
        {inquiries.length === 0 && !error ? (
          <div className="surface rounded-md p-6 text-sm leading-6 text-ink-600">아직 접수된 문의가 없습니다.</div>
        ) : null}

        {inquiries.map((inquiry) => (
          <article className="surface grid gap-4 rounded-md p-5 xl:grid-cols-[1fr_260px]" key={inquiry.id}>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={inquiry.status === "new" ? "earth" : "ink"}>{inquiry.status}</Badge>
                <Badge tone="water">{inquiry.service ?? "서비스 미지정"}</Badge>
                <span className="text-xs font-semibold text-ink-500">{formatDate(inquiry.created_at)}</span>
              </div>
              <h2 className="mt-4 text-xl font-bold text-ink-950">{inquiry.name}</h2>
              <p className="mt-1 text-sm text-ink-600">{inquiry.org ?? "소속 미입력"}</p>
              <p className="mt-4 whitespace-pre-wrap rounded-md bg-cloud-100 p-4 text-sm leading-6 text-ink-700">{inquiry.message}</p>
            </div>

            <aside className="grid content-start gap-4 rounded-md border border-ink-900/10 bg-white p-4">
              <div className="grid gap-2 text-sm">
                <a className="font-semibold text-water-600 hover:text-water-500" href={`mailto:${inquiry.email}`}>
                  {inquiry.email}
                </a>
                {inquiry.phone ? (
                  <a className="font-semibold text-ink-700 hover:text-ink-950" href={`tel:${inquiry.phone}`}>
                    {inquiry.phone}
                  </a>
                ) : null}
              </div>
              <form action={updateInquiryStatus} className="grid gap-2">
                <input name="id" type="hidden" value={inquiry.id} />
                <label className="grid gap-2 text-xs font-bold text-ink-500">
                  상태 변경
                  <select className="min-h-10 rounded-md border border-ink-900/10 bg-white px-3 text-sm font-semibold text-ink-800" defaultValue={inquiry.status} name="status">
                    {inquiryStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
                <button className="min-h-10 rounded-md bg-ink-950 px-3 text-sm font-semibold text-white" type="submit">
                  저장
                </button>
              </form>
            </aside>
          </article>
        ))}
      </div>
    </div>
  );
}
