"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Landmark } from "lucide-react";
import { useEnv } from "@/providers/env-provider";
const PluggyConnect = dynamic(() => import("react-pluggy-connect").then((m) => m.PluggyConnect), { ssr: false });
export function ConnectBank() {
  const { env, live, refresh } = useEnv(); const [token, setToken] = useState<string | null>(null); const [msg, setMsg] = useState<string | null>(null); const [busy, setBusy] = useState(false);
  const start = async () => {
    setMsg(null); setBusy(true);
    const r = await fetch("/api/openfinance/connect-token", { method: "POST" }); setBusy(false);
    if (r.status === 503) { setMsg("Open Finance não configurado (PLUGGY_CLIENT_ID/SECRET)."); return; }
    if (!r.ok) { setMsg("Não foi possível iniciar a conexão."); return; }
    setToken(((await r.json()) as { accessToken: string }).accessToken);
  };
  const done = async (itemId: string) => {
    setToken(null); setMsg("Sincronizando..."); const r = await fetch("/api/openfinance/sync", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ itemId, env }) });
    if (!r.ok) { setMsg("Falha ao sincronizar."); return; } const j = (await r.json()) as { accounts: number; transactions: number }; setMsg(`${j.accounts} contas e ${j.transactions} transações importadas.`); await refresh();
  };
  if (!live) return <p className="card p-4 text-sm text-muted">Entre na sua conta para conectar bancos via Open Finance.</p>;
  return (<div className="card flex flex-wrap items-center gap-3 p-4"><button onClick={start} disabled={busy} className="btn btn-primary disabled:opacity-60"><Landmark size={16} />{busy ? "Aguarde..." : "Conectar banco (Open Finance)"}</button>{msg && <p role="status" className="text-sm text-muted">{msg}</p>}
    {token && <PluggyConnect connectToken={token} includeSandbox onSuccess={({ item }) => void done(item.id)} onError={() => setMsg("Erro na conexão.")} onClose={() => setToken(null)} />}</div>);
}
