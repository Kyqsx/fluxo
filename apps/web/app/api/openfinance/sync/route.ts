import { NextResponse } from "next/server";
import { createClient, hasSupabase } from "@/lib/supabase/server";
import { fetchAccounts, fetchTransactions, pluggyConfigured } from "@/lib/pluggy";
export async function POST(req: Request) {
  if (!hasSupabase()) return NextResponse.json({ error: "supabase_not_configured" }, { status: 401 });
  if (!pluggyConfigured()) return NextResponse.json({ error: "pluggy_not_configured" }, { status: 503 });
  const { itemId, env } = (await req.json()) as { itemId: string; env: string };
  if (!itemId || !["personal", "business"].includes(env)) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const sb = createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  try {
    await sb.from("bank_connections").upsert({ user_id: user.id, environment: env, item_id: itemId }, { onConflict: "user_id,item_id" });
    const accs = await fetchAccounts(itemId); let count = 0;
    for (const a of accs) {
      const { data: row, error } = await sb.from("accounts").upsert({ user_id: user.id, environment: env, name: a.name, kind: a.type === "CREDIT" ? "Cartão" : "Banco", balance: a.balance, external_id: a.id }, { onConflict: "user_id,external_id" }).select("name").single();
      if (error || !row) continue;
      const txs = (await fetchTransactions(a.id)).map((t) => ({ user_id: user.id, environment: env, description: t.description, amount: Math.abs(t.amount), type: t.type === "CREDIT" ? "income" : "expense", category: t.category ?? "Outros", account_name: row.name, date: t.date.slice(0, 10), external_id: t.id }));
      if (txs.length) { await sb.from("transactions").upsert(txs, { onConflict: "user_id,external_id" }); count += txs.length; }
    }
    return NextResponse.json({ accounts: accs.length, transactions: count });
  } catch { return NextResponse.json({ error: "sync_error" }, { status: 502 }); }
}
