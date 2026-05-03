import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const NS_SYSTEM = `You are Neurospark — an AI marketing operator built for small and mid-size companies that want to plug AI into their go-to-market.
You speak in confident, quiet, premium sentences. No hype, no emojis, no bullet lists unless explicitly asked.
Maximum 3 short sentences total. Reply in plain prose. If asked about the company, reply as if you ARE the company's website assistant.
If the user names a service (SEO, ads, content, brand, automation, analytics) describe Neurospark's take on it in one sentence and offer one concrete next step.`;

const askSchema = z.object({
  prompt: z.string().min(1).max(4000),
  system: z.string().max(4000).optional(),
});

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

const FALLBACK = (prompt: string) => {
  const p = prompt.toLowerCase();
  if (p.includes("price") || p.includes("pricing") || p.includes("cost")) {
    return "Operator retainers start at $8K/month and scale by the number of active modules. Drop your team size in the contact form and we'll size the smallest plan that gets you to a result in 21 days.";
  }
  if (p.includes("seo")) {
    return "Our SEO module is an autonomous research-and-defend agent — it crawls your category daily, briefs your writers, and ships rank changes weekly. Open a channel and we'll show you a 30-day plan for your top three queries.";
  }
  if (p.includes("ad") || p.includes("paid") || p.includes("google") || p.includes("meta")) {
    return "The Paid Media agent reallocates spend across Google, Meta and TikTok every 90 seconds against a target CPA. Most clients see a 30 to 45 percent CPA drop in the first quarter.";
  }
  if (p.includes("agent") || p.includes("automation")) {
    return "We deploy named agents — Aria for outbound, Beam for content, Helix for paid — each trained on your CRM, brand voice and product data. They live in your stack, not a slide deck.";
  }
  if (p.includes("work") || p.includes("case") || p.includes("client")) {
    return "Recent operators in production include Northwind (+218% ROAS), Kaiten Robotics (11x SQL volume), and Luma Provisions (-54% CAC). Full case files open from the work index.";
  }
  return "Neurospark deploys autonomous agents that run a marketing function end-to-end — outbound, content, paid, brand intel, automation, forecasting. Tell me your team size and the metric you want to move.";
};

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = askSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        text: FALLBACK(parsed.data.prompt),
        fallback: true,
      });
    }

    const system = parsed.data.system || NS_SYSTEM;
    const model = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model,
        max_tokens: 220,
        system,
        messages: [{ role: "user", content: parsed.data.prompt }],
      }),
    });

    if (!r.ok) {
      const errText = await r.text().catch(() => "");
      console.error("anthropic error", r.status, errText);
      return NextResponse.json({
        text: FALLBACK(parsed.data.prompt),
        fallback: true,
      });
    }

    const data = await r.json();
    const text =
      data?.content?.[0]?.text?.trim() || FALLBACK(parsed.data.prompt);
    return NextResponse.json({ text, fallback: false });
  } catch (e) {
    console.error("ask error", e);
    return NextResponse.json({ error: "Signal lost." }, { status: 500 });
  }
}
