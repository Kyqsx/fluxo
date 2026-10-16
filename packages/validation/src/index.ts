export interface TxDraft { description: string; amount: number; category: string; account: string; date: string }
export const validateTxDraft = (d: TxDraft): string | null => {
  if (!d.description.trim()) return "Informe uma descrição.";
  if (!(d.amount > 0)) return "O valor deve ser maior que zero.";
  if (!d.date) return "Informe a data.";
  return null;
};
