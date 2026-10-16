const BASE = "https://api.pluggy.ai";
export interface PluggyAccount { id: string; name: string; type: string; subtype?: string; balance: number }
export interface PluggyTx { id: string; description: string; amount: number; date: string; type: "DEBIT" | "CREDIT"; category?: string | null }
export const pluggyConfigured = (): boolean => Boolean(process.env.PLUGGY_CLIENT_ID && process.env.PLUGGY_CLIENT_SECRET);
async function apiKey(): Promise<string> {
  const r = await fetch(`${BASE}/auth`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ clientId: process.env.PLUGGY_CLIENT_ID, clientSecret: process.env.PLUGGY_CLIENT_SECRET }), cache: "no-store" });
  if (!r.ok) throw new Error("Falha na autenticação Pluggy");
  return ((await r.json()) as { apiKey: string }).apiKey;
}
async function get<T>(path: string): Promise<T> {
  const r = await fetch(`${BASE}${path}`, { headers: { "X-API-KEY": await apiKey() }, cache: "no-store" });
  if (!r.ok) throw new Error(`Pluggy ${r.status}`);
  return (await r.json()) as T;
}
export async function createConnectToken(userId: string): Promise<string> {
  const r = await fetch(`${BASE}/connect_token`, { method: "POST", headers: { "Content-Type": "application/json", "X-API-KEY": await apiKey() }, body: JSON.stringify({ clientUserId: userId }), cache: "no-store" });
  if (!r.ok) throw new Error("Falha ao criar connect token");
  return ((await r.json()) as { accessToken: string }).accessToken;
}
export const fetchAccounts = async (itemId: string) => (await get<{ results: PluggyAccount[] }>(`/accounts?itemId=${encodeURIComponent(itemId)}`)).results;
export const fetchTransactions = async (accountId: string) => (await get<{ results: PluggyTx[] }>(`/transactions?accountId=${encodeURIComponent(accountId)}&pageSize=500`)).results;
