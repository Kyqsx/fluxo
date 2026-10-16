const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
export const formatBRL = (v: number): string => brl.format(v);
export const formatDate = (iso: string): string => new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", timeZone: "UTC" }).format(new Date(iso + "T00:00:00Z"));
export const daysUntil = (iso: string, ref = "2026-10-15"): number => Math.round((Date.parse(iso) - Date.parse(ref)) / 86400000);
