"use client";
import { Landmark, PiggyBank, Wallet } from "lucide-react";
import { formatBRL } from "@fluxo/core";
import { ConnectBank } from "@/components/dashboard/connect-bank";
import { useEnv } from "@/providers/env-provider";
const ICON = { Banco: Landmark, Dinheiro: Wallet, Reserva: PiggyBank } as const;
export default function Page() {
  const { data } = useEnv(); const total = data.accounts.reduce((s, a) => s + a.balance, 0);
  return (<div className="space-y-4"><ConnectBank /><div className="card p-5"><p className="text-sm text-muted">Saldo total</p><p className="text-3xl font-bold">{formatBRL(total)}</p></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{data.accounts.map((a) => { const I = ICON[a.kind as keyof typeof ICON] ?? Wallet; return (
      <div key={a.id} className="card p-5"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand"><I size={18} /></span><p className="mt-3 text-sm text-muted">{a.kind}</p><p className="font-semibold">{a.name}</p><p className="text-xl font-bold">{formatBRL(a.balance)}</p></div>); })}</div></div>);
}
