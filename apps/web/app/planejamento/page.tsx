"use client";
import { useEnv } from "@/providers/env-provider";
import { Progress } from "@/components/dashboard/progress";
import { Bills } from "@/components/dashboard/bills";
export default function Page() {
  const { data, env } = useEnv();
  return (<div className="grid gap-4 lg:grid-cols-2">
    <div className="card space-y-4 p-5"><h2 className="font-semibold">{env === "personal" ? "Orçamento mensal" : "Limites de caixa"}</h2>{data.budgets.map((b) => <Progress key={b.category} label={b.category} current={b.spent} target={b.limit} invert />)}</div>
    <div className="card space-y-4 p-5"><h2 className="font-semibold">{env === "personal" ? "Metas financeiras" : "Metas do negócio"}</h2>{data.goals.map((g) => <Progress key={g.id} label={g.name} current={g.current} target={g.target} />)}</div>
    <div className="card p-5 lg:col-span-2"><h2 className="mb-3 font-semibold">{env === "personal" ? "Próximos pagamentos" : "Contas a pagar"}</h2><Bills items={data.bills} /></div></div>);
}
