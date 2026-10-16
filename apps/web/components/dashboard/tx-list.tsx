import { ArrowDownLeft, ArrowUpRight, ArrowLeftRight, Trash2 } from "lucide-react";
import { formatBRL, formatDate } from "@fluxo/core";
import type { Transaction } from "@fluxo/types";

const STYLE = { income: ["text-pos bg-pos/10", ArrowDownLeft, "+"], expense: ["text-neg bg-neg/10", ArrowUpRight, "−"], transfer: ["text-muted bg-muted/10", ArrowLeftRight, ""] } as const;
export function TxList({ items, onRemove }: { items: Transaction[]; onRemove?: (id: string) => void }) {
  if (!items.length) return <p className="py-8 text-center text-sm text-muted">Nenhum lançamento encontrado.</p>;
  return (<ul className="divide-y divide-line">{items.map((t) => { const [cls, Icon, sign] = STYLE[t.type]; return (
    <li key={t.id} className="flex items-center gap-3 py-3">
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${cls}`}><Icon size={18} /></span>
      <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{t.description}</p><p className="truncate text-xs text-muted">{formatDate(t.date)} · {t.category} · {t.account}</p></div>
      <p className={`text-sm font-semibold ${t.type === "income" ? "text-pos" : t.type === "expense" ? "text-neg" : "text-muted"}`}>{sign}{formatBRL(t.amount)}</p>
      {onRemove && <button aria-label={`Remover ${t.description}`} onClick={() => onRemove(t.id)} className="rounded-lg p-2 text-muted hover:bg-bg hover:text-neg"><Trash2 size={16} /></button>}
    </li>); })}</ul>);
}
