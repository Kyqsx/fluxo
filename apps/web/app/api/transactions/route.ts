import { NextResponse } from "next/server";
import { createClient, hasSupabase } from "@/lib/supabase/server";
import { validateTxDraft } from "@fluxo/validation";
interface Body { env: string; type: string; description: string; amount: number; category: string; account: string; date: string }
export async function POST(req: Request) {
  if (!hasSupabase()) return NextResponse.json({ error: "supabase_not_configured" }, { status: 401 });
  const b = (await req.json()) as Body;
  const err = validateTxDraft({ description: b.description, amount: b.amount, category: b.category, account: b.account, date: b.date });
  if (err || !["income", "expense", "transfer"].includes(b.type) || !["personal", "business"].includes(b.env)) return NextResponse.json({ error: err ?? "invalid" }, { status: 400 });
  const sb = createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  const { error } = await sb.from("transactions").insert({ environment: b.env, type: b.type, description: b.description.trim(), amount: b.amount, category: b.category, account_name: b.account, date: b.date });
  return error ? NextResponse.json({ error: "db_error" }, { status: 500 }) : NextResponse.json({ ok: true }, { status: 201 });
}
