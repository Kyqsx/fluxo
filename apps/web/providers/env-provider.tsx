"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Account, Environment, Transaction } from "@fluxo/types";
import { DATA, type EnvData } from "@/data/mock";

export type NewTx = Omit<Transaction, "id">;
interface Ctx { env: Environment; setEnv: (e: Environment) => void; data: EnvData; live: boolean; ready: boolean; addTx: (t: NewTx) => Promise<string | null>; removeTx: (id: string) => Promise<void>; refresh: () => Promise<void> }
const EnvCtx = createContext<Ctx | null>(null);
const label = (d: Date) => new Intl.DateTimeFormat("pt-BR", { month: "short" }).format(d).replace(".", "");

function aggregate(base: EnvData, accounts: Account[], txs: Transaction[]): EnvData {
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => { const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1); return { key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`, month: label(d), income: 0, expense: 0 }; });
  const cat: Record<string, number> = {}; const curKey = months[5].key;
  for (const t of txs) { const m = months.find((x) => t.date.startsWith(x.key)); if (!m) continue;
    if (t.type === "income") m.income += t.amount; if (t.type === "expense") { m.expense += t.amount; if (m.key === curKey) cat[t.category] = (cat[t.category] ?? 0) + t.amount; } }
  return { ...base, accounts, transactions: txs, monthly: months.map(({ month, income, expense }) => ({ month, income, expense })),
    byCategory: Object.entries(cat).map(([name, value]) => ({ name, value })), bills: [], goals: [], budgets: [] };
}
export function EnvProvider({ children }: { children: ReactNode }) {
  const [env, setEnvState] = useState<Environment>("personal");
  const [live, setLive] = useState(false); const [ready, setReady] = useState(false);
  const [rows, setRows] = useState<{ accounts: Account[]; transactions: Transaction[] } | null>(null);
  const [demo, setDemo] = useState<Record<Environment, Transaction[]>>({ personal: DATA.personal.transactions, business: DATA.business.transactions });
  useEffect(() => { try { const v = localStorage.getItem("fluxo-env"); if (v === "personal" || v === "business") setEnvState(v); } catch {} }, []);
  const setEnv = (e: Environment) => { setEnvState(e); try { localStorage.setItem("fluxo-env", e); } catch {} };
  const refresh = useCallback(async () => {
    try { const r = await fetch(`/api/finance?env=${env}`); if (!r.ok) { setLive(false); setRows(null); } else { setRows((await r.json()) as { accounts: Account[]; transactions: Transaction[] }); setLive(true); } }
    catch { setLive(false); setRows(null); } finally { setReady(true); }
  }, [env]);
  useEffect(() => { void refresh(); }, [refresh]);
  const addTx = async (t: NewTx): Promise<string | null> => {
    if (!live) { setDemo((s) => ({ ...s, [env]: [{ id: crypto.randomUUID(), ...t }, ...s[env]] })); return null; }
    const r = await fetch("/api/transactions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ env, ...t }) });
    if (!r.ok) return "Não foi possível salvar o lançamento."; await refresh(); return null;
  };
  const removeTx = async (id: string) => { if (!live) { setDemo((s) => ({ ...s, [env]: s[env].filter((x) => x.id !== id) })); return; } await fetch(`/api/transactions/${id}`, { method: "DELETE" }); await refresh(); };
  const data = useMemo(() => (live && rows ? aggregate(DATA[env], rows.accounts, rows.transactions) : { ...DATA[env], transactions: demo[env] }), [live, rows, env, demo]);
  return <EnvCtx.Provider value={{ env, setEnv, data, live, ready, addTx, removeTx, refresh }}>{children}</EnvCtx.Provider>;
}
export function useEnv(): Ctx { const c = useContext(EnvCtx); if (!c) throw new Error("EnvProvider ausente"); return c; }
