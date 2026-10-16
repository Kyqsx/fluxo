import { CalendarClock } from "lucide-react";
import { daysUntil, formatBRL, formatDate } from "@fluxo/core";
import type { Bill } from "@fluxo/types";
export function Bills({ items }: { items: Bill[] }) {
  if (!items.length) return <p className="text-sm text-muted">Sem vencimentos cadastrados.</p>;
  return (<ul className="space-y-3">{items.map((b) => { const d = daysUntil(b.dueDate); const soon = d <= 7; return (
    <li key={b.id} className="flex items-center gap-3"><span className={`grid h-10 w-10 place-items-center rounded-xl ${soon ? "bg-neg/10 text-neg" : "bg-brand/10 text-brand"}`}><CalendarClock size={18} /></span>
      <div className="flex-1"><p className="text-sm font-semibold">{b.name}</p><p className="text-xs text-muted">{formatDate(b.dueDate)} · {d <= 0 ? "vence hoje" : `em ${d} dias`}</p></div>
      <p className="text-sm font-semibold">{formatBRL(b.amount)}</p></li>); })}</ul>);
}
