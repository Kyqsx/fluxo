"use client";
import { ArrowDownLeft, ArrowUpRight, CalendarClock, TrendingUp, Scale } from "lucide-react";
import { formatBRL } from "@fluxo/core";
import { useEnv } from "@/providers/env-provider";
import { IncomeExpenseChart, CategoryDonut } from "@/components/dashboard/charts";
import { TxList } from "@/components/dashboard/tx-list";
import { Bills } from "@/components/dashboard/bills";

export default function Dashboard() {
  const { data } = useEnv();
  const total = data.accounts.reduce((s, a) => s + a.balance, 0);
  const last = data.monthly[data.monthly.length - 1];
  const stats = [
    { t: data.incomeLabel, v: last.income, c: "Out/2026 · dados fictícios", i: ArrowDownLeft, cls: "text-pos bg-pos/10" },
    { t: "Despesas do mês", v: last.expense, c: "Out/2026 · dados fictícios", i: ArrowUpRight, cls: "text-neg bg-neg/10" },
    { t: "Resultado do período", v: last.income - last.expense, c: "Receitas − despesas", i: Scale, cls: "text-brand bg-brand/10" },
    { t: "Próximos vencimentos", v: data.bills.slice(0, 2).reduce((s, b) => s + b.amount, 0), c: "Nos próximos 7 dias", i: CalendarClock, cls: "text-amber-600 bg-amber-500/10" },
  ];
  return (<div className="space-y-6">
    <section className="rounded-xl2 bg-brand p-6 text-white shadow-sm">
      <p className="text-sm opacity-80">{data.balanceLabel}</p><p className="mt-1 text-3xl font-bold md:text-4xl">{formatBRL(total)}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm opacity-90"><span className="inline-flex items-center gap-1"><TrendingUp size={16} />+4,2% vs. mês anterior (demo)</span><span>{data.accounts.length} contas</span><span>Out/2026</span></div>
    </section>
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((s) => (
      <div key={s.t} className="card p-5"><span className={`grid h-10 w-10 place-items-center rounded-xl ${s.cls}`}><s.i size={18} /></span>
        <p className="mt-3 text-sm text-muted">{s.t}</p><p className="text-xl font-bold">{formatBRL(s.v)}</p><p className="text-xs text-muted">{s.c}</p></div>))}</section>
    <section className="grid gap-4 lg:grid-cols-3">
      <div className="card p-5 lg:col-span-2"><h2 className="mb-3 font-semibold">Receitas e despesas</h2><IncomeExpenseChart data={data.monthly} /></div>
      <div className="card p-5"><h2 className="mb-3 font-semibold">Despesas por categoria</h2><CategoryDonut data={data.byCategory} /></div></section>
    <section className="grid gap-4 lg:grid-cols-3">
      <div className="card p-5 lg:col-span-2"><h2 className="mb-1 font-semibold">Últimas transações</h2><TxList items={data.transactions} /></div>
      <div className="card p-5"><h2 className="mb-3 font-semibold">Próximos vencimentos</h2><Bills items={data.bills} /></div></section>
  </div>);
}
