"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient, supabaseConfigured } from "@/lib/supabase/client";
export default function Login() {
  const router = useRouter(); const [mode, setMode] = useState<"in" | "up">("in"); const [msg, setMsg] = useState<string | null>(null); const [busy, setBusy] = useState(false);
  const submit = async (f: FormData) => {
    if (!supabaseConfigured) { setMsg("Supabase não configurado. Preencha o arquivo .env.local."); return; }
    setBusy(true); setMsg(null); const sb = createClient(); const email = String(f.get("email")); const password = String(f.get("password"));
    const { data, error } = mode === "in" ? await sb.auth.signInWithPassword({ email, password }) : await sb.auth.signUp({ email, password });
    setBusy(false); if (error) { setMsg(error.message); return; }
    if (mode === "up" && !data.session) { setMsg("Conta criada. Confirme o e-mail e depois entre."); return; }
    router.push("/"); router.refresh();
  };
  return (<div className="grid min-h-screen place-items-center p-4"><form action={submit} className="card w-full max-w-sm space-y-3 p-6">
    <div className="mb-2 flex items-center gap-2"><div className="grid h-9 w-9 place-items-center rounded-xl bg-brand font-bold text-white">F</div><span className="text-lg font-bold">Fluxo</span></div>
    <h1 className="font-semibold">{mode === "in" ? "Entrar" : "Criar conta"}</h1>
    <input name="email" type="email" required className="inp" placeholder="E-mail" aria-label="E-mail" autoComplete="email" />
    <input name="password" type="password" required minLength={6} className="inp" placeholder="Senha (mín. 6)" aria-label="Senha" autoComplete={mode === "in" ? "current-password" : "new-password"} />
    {msg && <p role="alert" className="text-sm text-neg">{msg}</p>}
    <button disabled={busy} className="btn btn-primary w-full justify-center disabled:opacity-60">{busy ? "Aguarde..." : mode === "in" ? "Entrar" : "Cadastrar"}</button>
    <button type="button" onClick={() => setMode(mode === "in" ? "up" : "in")} className="w-full text-sm text-muted hover:text-fg">{mode === "in" ? "Não tem conta? Cadastre-se" : "Já tem conta? Entrar"}</button>
    <a href="/" className="block text-center text-xs text-muted">Continuar no modo demonstração</a></form></div>);
}
