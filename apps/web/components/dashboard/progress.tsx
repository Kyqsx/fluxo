import { formatBRL } from "@fluxo/core";
export function Progress({ label, current, target, invert }: { label: string; current: number; target: number; invert?: boolean }) {
  const pct = Math.min(100, Math.round((current / target) * 100)); const over = invert && current > target;
  return (<div><div className="mb-1 flex justify-between gap-2 text-sm"><span className="font-medium">{label}</span><span className="text-muted">{formatBRL(current)} / {formatBRL(target)}</span></div>
    <div className="h-2 overflow-hidden rounded-full bg-bg" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}><div className={`h-full rounded-full ${over ? "bg-neg" : "bg-brand"}`} style={{ width: `${pct}%` }} /></div></div>);
}
