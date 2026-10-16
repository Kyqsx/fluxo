"use client";
import { useState } from "react";
import { useEnv } from "@/providers/env-provider";
import { IncomeExpenseChart, CategoryDonut } from "@/components/dashboard/charts";
export default function Page() {
  const { data } = useEnv(); const [n, setN] = useState(6);
  return (<div className="space-y-4"><div className="flex gap-2" role="group" aria-label="Período">{[3, 6].map((v) => <button key={v} onClick={() => setN(v)} aria-pressed={n === v} className={`btn ${n === v ? "btn-primary" : "btn-ghost"}`}>Últimos {v} meses</button>)}</div>
    <div className="grid gap-4 lg:grid-cols-3"><div className="card p-5 lg:col-span-2"><h2 className="mb-3 font-semibold">Receitas × despesas</h2><IncomeExpenseChart data={data.monthly.slice(-n)} /></div>
      <div className="card p-5"><h2 className="mb-3 font-semibold">Distribuição por categoria</h2><CategoryDonut data={data.byCategory} /></div></div></div>);
}
