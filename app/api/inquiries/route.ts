import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

type InquiryPayload = {
  name?: string;
  org?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
};

function isValidEmail(email?: string) {
  return Boolean(email && /.+@.+\..+/.test(email));
}

async function notifyAdmin(payload: Required<InquiryPayload>) {
  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_NOTIFICATION_EMAIL) {
    return { sent: false };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "SOILAB ESG <noreply@soilabcoop.kr>",
      to: [process.env.ADMIN_NOTIFICATION_EMAIL],
      subject: `[SOILAB ESG] ${payload.service} 문의`,
      html: `
        <p><strong>${payload.name}</strong> (${payload.org})</p>
        <p>${payload.email} / ${payload.phone}</p>
        <p>${payload.message}</p>
      `
    })
  });

  return { sent: response.ok };
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as InquiryPayload;

  if (!payload.name || !payload.org || !isValidEmail(payload.email) || !payload.message) {
    return NextResponse.json({ error: "Invalid inquiry payload" }, { status: 400 });
  }

  const normalized: Required<InquiryPayload> = {
    name: payload.name,
    org: payload.org,
    email: payload.email ?? "",
    phone: payload.phone ?? "",
    service: payload.service ?? "ESG 진단",
    message: payload.message
  };

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  let stored = false;

  if (supabaseUrl && serviceRoleKey) {
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { error } = await supabase.from("inquiries").insert({
      name: normalized.name,
      org: normalized.org,
      email: normalized.email,
      phone: normalized.phone,
      service: normalized.service,
      message: normalized.message,
      status: "new"
    });
    stored = !error;
  }

  const notification = await notifyAdmin(normalized);

  return NextResponse.json({
    ok: true,
    stored,
    notification,
    mode: stored ? "supabase" : "demo"
  });
}
