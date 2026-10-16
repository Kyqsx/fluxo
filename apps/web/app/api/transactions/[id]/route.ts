import { NextResponse } from "next/server";
import { createClient, hasSupabase } from "@/lib/supabase/server";
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  if (!hasSupabase()) return NextResponse.json({ error: "supabase_not_configured" }, { status: 401 });
  const sb = createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  const { error } = await sb.from("transactions").delete().eq("id", params.id);
  return error ? NextResponse.json({ error: "db_error" }, { status: 500 }) : NextResponse.json({ ok: true });
}
