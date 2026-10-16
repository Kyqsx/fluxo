"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Plus, X } from "lucide-react";
import type { TxType } from "@fluxo/types";
import { validateTxDraft } from "@fluxo/validation";
import { useEnv } from "@/providers/env-provider";
import { TxList } from "@/components/dashboard/tx-list";

export function TransactionsView() {
  const { data, live, addTx, removeTx } = useEnv();
  const [q, setQ] = useState(""); const [type, setType] = useState("all"); const [cat, setCat] = useState("all"); const [month, setMonth] = useState("all");
  const [open, setOpen] = useState(false); const [err, setErr] = useState<string | null>(null);
  const params = useSearchParams();
  useEffect(() => { if (params.get("novo") === "1") setOpen(true); }, [params]);
  const items = useMemo(() => data.transactions.filter((t) => t.description.toLowerCase().includes(q.toLowerCase()) && (type === "all" || t.type === type) && (cat === "all" || t.category === cat) && (month === "all" || t.date.startsWith(month))), [data.transactions, q, type, cat, month]);
  const submit = async (f: FormData) => {
    const draft = { description: String(f.get("description") ?? ""), amount: Number(f.get("amount")), category: String(f.get("category")), account: String(f.get("account")), date: String(f.get("date")) };
    const e = validateTxDraft(draft); setErr(e); if (e) return;
    const e2 = await addTx({ type: String(f.get("type")) as TxType, ...draft }); setErr(e2); if (!e2) setOpen(false);
  };
  return (<div className="space-y-4">
    <p className="rounded-xl border border-line bg-card px-4 py-2 text-sm text-muted">{live ? "Lançamentos salvos na sua conta (Supabase)." : "Modo demonstração: lançamentos ficam só em memória. Entre para salvar de verdade."}</p>
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
      <input className="inp lg:col-span-2" placeholder="Pesquisar descrição" aria-label="Pesquisar" value={q} onChange={(e) => setQ(e.target.value)} />
      <select className="inp" aria-label="Tipo" value={type} onChange={(e) => setType(e.target.value)}><option value="all">Todos os tipos</option><option value="income">Receita</option><option value="expense">Despesa</option><option value="transfer">Transferência</option></select>
      <select className="inp" aria-label="Categoria" value={cat} onChange={(e) => setCat(e.target.value)}><option value="all">Todas as categorias</option>{data.categories.map((c) => <option key={c}>{c}</option>)}</select>
      <select className="inp" aria-label="Período" value={month} onChange={(e) => setMonth(e.target.value)}><option value="all">Todo o período</option><option value="2026-10">Out/2026</option><option value="2026-09">Set/2026</option></select></div>
    <div className="flex justify-end"><button className="btn btn-primary" onClick={() => { setErr(null); setOpen(true); }}><Plus size={16} />Novo lançamento</button></div>
    <div className="card p-5"><TxList items={items} onRemove={(id) => void removeTx(id)} /></div>
    {open && (<div className="fixed inset-0 z-50 grid items-end bg-black/50 md:place-items-center" role="dialog" aria-modal="true" aria-label="Novo lançamento">
      <form action={submit} className="card max-h-[90vh] w-full space-y-3 overflow-y-auto rounded-b-none p-5 md:max-w-md md:rounded-b-xl">
        <div className="flex items-center justify-between"><h2 className="font-semibold">Novo lançamento (demo)</h2><button type="button" aria-label="Fechar" onClick={() => setOpen(false)}><X size={20} /></button></div>
        <select name="type" className="inp" aria-label="Tipo"><option value="expense">Despesa</option><option value="income">Receita</option></select>
        <input name="description" className="inp" placeholder="Descrição" aria-label="Descrição" />
        <input name="amount" type="number" step="0.01" min="0" className="inp" placeholder="Valor (R$)" aria-label="Valor" />
        <select name="category" className="inp" aria-label="Categoria">{data.categories.map((c) => <option key={c}>{c}</option>)}</select>
        <input name="date" type="date" defaultValue="2026-10-15" className="inp" aria-label="Data" />
        <select name="account" className="inp" aria-label="Conta">{data.accounts.map((a) => <option key={a.id}>{a.name}</option>)}</select>
        {err && <p role="alert" className="text-sm text-neg">{err}</p>}
        <button className="btn btn-primary w-full justify-center">Adicionar</button></form></div>)}
  </div>);
}
