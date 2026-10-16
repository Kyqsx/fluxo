"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
const FUTURE = ["Autenticação (Supabase)", "Sincronização com banco PostgreSQL", "Pagamentos e assinatura", "App Android/iOS (Expo)", "Importação de extratos"];
export default function Page() {
  const { theme, setTheme } = useTheme(); const [m, setM] = useState(false); useEffect(() => setM(true), []);
  return (<div className="grid gap-4 lg:grid-cols-2">
    <div className="card space-y-3 p-5"><h2 className="font-semibold">Aparência</h2><div className="flex gap-2">{["light", "dark"].map((t) => <button key={t} onClick={() => setTheme(t)} aria-pressed={m && theme === t} className={`btn ${m && theme === t ? "btn-primary" : "btn-ghost"}`}>{t === "light" ? "Claro" : "Escuro"}</button>)}</div>
      <h2 className="pt-3 font-semibold">Versão</h2><p className="text-sm text-muted">Fluxo 0.1.0 · Etapa 1 (demonstrativa, dados fictícios)</p></div>
    <div className="card p-5"><h2 className="mb-3 font-semibold">Funcionalidades futuras</h2><ul className="space-y-2">{FUTURE.map((f) => <li key={f} className="flex items-center justify-between rounded-xl border border-line px-3 py-2 text-sm opacity-70"><span>{f}</span><span className="rounded-full bg-bg px-2 py-0.5 text-xs">Indisponível</span></li>)}</ul></div></div>);
}
