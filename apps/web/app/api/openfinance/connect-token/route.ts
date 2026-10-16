import { NextResponse } from "next/server";
import { createClient, hasSupabase } from "@/lib/supabase/server";
import { createConnectToken, pluggyConfigured } from "@/lib/pluggy";
export async function POST() {
  if (!hasSupabase()) return NextResponse.json({ error: "supabase_not_configured" }, { status: 401 });
  if (!pluggyConfigured()) return NextResponse.json({ error: "pluggy_not_configured" }, { status: 503 });
  const { data: { user } } = await createClient().auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  try { return NextResponse.json({ accessToken: await createConnectToken(user.id) }); } catch { return NextResponse.json({ error: "pluggy_error" }, { status: 502 }); }
}
