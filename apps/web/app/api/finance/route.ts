import { NextResponse } from "next/server";
import { createClient, hasSupabase } from "@/lib/supabase/server";
export async function GET(req: Request) {
  if (!hasSupabase()) return NextResponse.json({ error: "supabase_not_configured" }, { status: 401 });
  const env = new URL(req.url).searchParams.get("env") === "business" ? "business" : "personal";
  const sb = createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  const [a, t] = await Promise.all([
    sb.from("accounts").select("id,name,kind,balance").eq("environment", env).order("created_at"),
    sb.from("transactions").select("id,description,amount,type,category,account_name,date").eq("environment", env).order("date", { ascending: false }).limit(500)]);
  if (a.error || t.error) return NextResponse.json({ error: "db_error" }, { status: 500 });
  return NextResponse.json({
    accounts: (a.data ?? []).map((x) => ({ id: x.id, name: x.name, kind: x.kind, balance: Number(x.balance) })),
    transactions: (t.data ?? []).map((x) => ({ id: x.id, description: x.description, amount: Number(x.amount), type: x.type, category: x.category, account: x.account_name, date: x.date })) });
}
