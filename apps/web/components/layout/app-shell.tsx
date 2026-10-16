"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { createClient, supabaseConfigured } from "@/lib/supabase/client";
import { Bell, ChevronLeft, ChevronRight, LogOut, Moon, Plus, Sun } from "lucide-react";
import { NAV } from "./nav";
import { useEnv } from "@/providers/env-provider";
import type { Environment } from "@fluxo/types";

function EnvSwitch({ compact }: { compact?: boolean }) {
  const { env, setEnv } = useEnv();
  return (
    <div role="tablist" aria-label="Ambiente" className="flex rounded-xl bg-bg p-1 border border-line text-sm">
      {(["personal", "business"] as Environment[]).map((e) => (
        <button key={e} role="tab" aria-selected={env === e} onClick={() => setEnv(e)}
          className={`flex-1 rounded-lg px-3 py-1.5 font-semibold transition ${env === e ? "bg-brand text-white" : "text-muted hover:text-fg"}`}>
          {compact ? (e === "personal" ? "P" : "E") : e === "personal" ? "Pessoal" : "Empresarial"}
        </button>
      ))}
    </div>
  );
}
const Logo = ({ small }: { small?: boolean }) => (
  <div className="flex items-center gap-2"><div className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white font-bold">F</div>{!small && <span className="text-lg font-bold">Fluxo</span>}</div>
);

export function AppShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const { theme, setTheme } = useTheme();
  const { env, data, live, refresh } = useEnv();
  const router = useRouter();
  const signOut = async () => { if (supabaseConfigured) await createClient().auth.signOut(); await refresh(); router.refresh(); };
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (path === "/login") return <>{children}</>;
  const cur = NAV.find((n) => n.href === path) ?? NAV[0];
  const dark = mounted && theme === "dark";
  return (
    <div className="min-h-screen">
      <aside className={`fixed inset-y-0 left-0 z-30 hidden flex-col border-r border-line bg-card p-4 md:flex ${collapsed ? "w-20" : "w-64"} transition-all`}>
        <div className="flex items-center justify-between"><Logo small={collapsed} />
          <button aria-label={collapsed ? "Expandir menu" : "Recolher menu"} onClick={() => setCollapsed(!collapsed)} className="rounded-lg p-1 text-muted hover:bg-bg">{collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}</button></div>
        <div className="mt-6"><EnvSwitch compact={collapsed} /></div>
        <nav className="mt-6 flex flex-1 flex-col gap-1" aria-label="Principal">
          {NAV.map((n) => { const active = n.href === path; return (
            <Link key={n.href} href={n.href} title={n.label} aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${active ? "bg-brand/10 text-brand" : "text-muted hover:bg-bg hover:text-fg"}`}>
              <n.icon size={20} />{!collapsed && n.label}</Link>); })}
        </nav>
        <div className="space-y-1 border-t border-line pt-3">
          {!collapsed && <div className="flex items-center gap-3 px-2 py-2"><div className="grid h-9 w-9 place-items-center rounded-full bg-brand-light text-sm font-bold text-white">DM</div><div className="text-sm"><p className="font-semibold">Perfil demo</p><p className="text-xs text-muted">{live ? "Conta conectada" : "Dados fictícios"}</p></div></div>}
          <button onClick={() => setTheme(dark ? "light" : "dark")} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted hover:bg-bg">{dark ? <Sun size={20} /> : <Moon size={20} />}{!collapsed && (dark ? "Tema claro" : "Tema escuro")}</button>
          {live ? <button onClick={signOut} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted hover:bg-bg"><LogOut size={20} />{!collapsed && "Sair"}</button> : <Link href="/login" className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-brand hover:bg-bg"><LogOut size={20} />{!collapsed && "Entrar"}</Link>}
          </div>
      </aside>
      <div className={`${collapsed ? "md:pl-20" : "md:pl-64"} transition-all`}>
        <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur">
          <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-4">
            <div className="min-w-0"><div className="md:hidden"><Logo /></div>
              <h1 className="hidden truncate text-xl font-bold md:block">{cur.href === "/" ? `Visão geral · ${data.label}` : cur.title}</h1>
              <p className="hidden text-sm text-muted md:block">{cur.sub} · Out/2026</p></div>
            <div className="flex items-center gap-2">
              <div className="md:hidden w-36"><EnvSwitch /></div>
              <Link href="/transacoes?novo=1" className="btn btn-primary hidden md:inline-flex"><Plus size={16} />Novo lançamento</Link>
              <button aria-label="Notificações" className="relative rounded-xl border border-line p-2.5 text-muted hover:bg-card"><Bell size={18} /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-neg" /></button>
              <div className="hidden h-9 w-9 place-items-center rounded-full bg-brand-light text-sm font-bold text-white md:grid">DM</div>
            </div></div>
          <p className="px-4 pb-2 text-xs text-muted md:hidden">{cur.title} · {env === "personal" ? "Pessoal" : "Empresarial"} · Out/2026</p>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 pb-28 md:px-8 md:pb-10">{children}</main>
      </div>
      <nav aria-label="Navegação inferior" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-card px-2 pb-[env(safe-area-inset-bottom)] md:hidden">
        {[NAV[0], NAV[1]].map((n) => <MobItem key={n.href} n={n} path={path} />)}
        <div className="relative"><Link href="/transacoes?novo=1" aria-label="Novo lançamento" className="absolute -top-6 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-brand text-white shadow-lg"><Plus size={26} /></Link></div>
        {[NAV[3], NAV[5]].map((n) => <MobItem key={n.href} n={n} path={path} />)}
      </nav>
    </div>
  );
}
function MobItem({ n, path }: { n: (typeof NAV)[number]; path: string }) {
  const active = n.href === path;
  return <Link href={n.href} className={`flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-[11px] font-medium ${active ? "text-brand" : "text-muted"}`}><n.icon size={22} />{n.label}</Link>;
}
