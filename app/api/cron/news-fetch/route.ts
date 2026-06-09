import { NextResponse } from "next/server";

import { newsItems } from "@/lib/data";

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;

  const url = new URL(request.url);
  return request.headers.get("x-cron-secret") === secret || url.searchParams.get("secret") === secret;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    provider: process.env.ANTHROPIC_API_KEY ? "anthropic-ready" : "mock",
    inserted: newsItems.length,
    status: "pending",
    items: newsItems.map((item) => ({
      title: item.title,
      category: item.category,
      keywords: item.keywords,
      slug: item.slug
    }))
  });
}
