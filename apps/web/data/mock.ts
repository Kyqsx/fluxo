import type { Account, Bill, Budget, Environment, Goal, Transaction } from "@fluxo/types";

export interface EnvData {
  label: string; balanceLabel: string; incomeLabel: string; categories: string[];
  monthly: { month: string; income: number; expense: number }[];
  byCategory: { name: string; value: number }[];
  transactions: Transaction[]; accounts: Account[]; bills: Bill[]; goals: Goal[]; budgets: Budget[];
  planningTitle: string;
}
const m = ["Mai", "Jun", "Jul", "Ago", "Set", "Out"];
export const DATA: Record<Environment, EnvData> = {
  personal: {
    label: "Pessoal", balanceLabel: "Saldo pessoal", incomeLabel: "Salário e receitas", planningTitle: "Planejamento",
    categories: ["Moradia", "Alimentação", "Transporte", "Lazer", "Saúde", "Outros"],
    monthly: m.map((month, i) => ({ month, income: [6200, 6200, 6800, 6200, 7100, 6900][i], expense: [4900, 5300, 4700, 5600, 5100, 4800][i] })),
    byCategory: [{ name: "Moradia", value: 1800 }, { name: "Alimentação", value: 1100 }, { name: "Transporte", value: 520 }, { name: "Lazer", value: 640 }, { name: "Saúde", value: 380 }, { name: "Outros", value: 360 }],
    transactions: [
      { id: "p1", description: "Salário", amount: 6900, type: "income", category: "Outros", account: "Conta corrente", date: "2026-10-05" },
      { id: "p2", description: "Aluguel", amount: 1800, type: "expense", category: "Moradia", account: "Conta corrente", date: "2026-10-06" },
      { id: "p3", description: "Supermercado", amount: 412.9, type: "expense", category: "Alimentação", account: "Cartão de crédito", date: "2026-10-09" },
      { id: "p4", description: "Reserva mensal", amount: 500, type: "transfer", category: "Outros", account: "Poupança", date: "2026-10-10" },
      { id: "p5", description: "Combustível", amount: 220, type: "expense", category: "Transporte", account: "Carteira", date: "2026-10-12" },
    ],
    accounts: [{ id: "a1", name: "Conta corrente", kind: "Banco", balance: 4820.35 }, { id: "a2", name: "Carteira", kind: "Dinheiro", balance: 310 }, { id: "a3", name: "Poupança", kind: "Reserva", balance: 12500 }],
    bills: [{ id: "b1", name: "Cartão de crédito", amount: 1340.8, dueDate: "2026-10-18" }, { id: "b2", name: "Internet", amount: 119.9, dueDate: "2026-10-22" }, { id: "b3", name: "Plano de saúde", amount: 480, dueDate: "2026-11-02" }],
    goals: [{ id: "g1", name: "Reserva de emergência", current: 12500, target: 20000 }, { id: "g2", name: "Viagem", current: 2100, target: 6000 }],
    budgets: [{ category: "Moradia", spent: 1800, limit: 2000 }, { category: "Alimentação", spent: 1100, limit: 1000 }, { category: "Lazer", spent: 640, limit: 800 }],
  },
  business: {
    label: "Empresarial", balanceLabel: "Saldo empresarial", incomeLabel: "Faturamento", planningTitle: "Planejamento de caixa",
    categories: ["Mercadorias", "Fornecedores", "Operação", "Marketing", "Impostos", "Outros"],
    monthly: m.map((month, i) => ({ month, income: [28400, 31200, 29800, 34500, 36100, 38200][i], expense: [21000, 22800, 23100, 25400, 26900, 27300][i] })),
    byCategory: [{ name: "Mercadorias", value: 9800 }, { name: "Fornecedores", value: 7200 }, { name: "Operação", value: 4600 }, { name: "Marketing", value: 2100 }, { name: "Impostos", value: 2900 }, { name: "Outros", value: 700 }],
    transactions: [
      { id: "e1", description: "Vendas – lote outubro", amount: 12400, type: "income", category: "Outros", account: "Conta PJ", date: "2026-10-04" },
      { id: "e2", description: "Fornecedor Alfa", amount: 5300, type: "expense", category: "Fornecedores", account: "Conta PJ", date: "2026-10-07" },
      { id: "e3", description: "Anúncios online", amount: 1200, type: "expense", category: "Marketing", account: "Cartão empresarial", date: "2026-10-08" },
      { id: "e4", description: "Imposto DAS", amount: 1850, type: "expense", category: "Impostos", account: "Conta PJ", date: "2026-10-10" },
      { id: "e5", description: "Transferência p/ caixa", amount: 2000, type: "transfer", category: "Operação", account: "Caixa da loja", date: "2026-10-13" },
    ],
    accounts: [{ id: "c1", name: "Conta PJ", kind: "Banco", balance: 41200.5 }, { id: "c2", name: "Caixa da loja", kind: "Dinheiro", balance: 1850 }, { id: "c3", name: "Reserva do negócio", kind: "Reserva", balance: 18000 }],
    bills: [{ id: "f1", name: "Fornecedor Beta", amount: 6200, dueDate: "2026-10-17" }, { id: "f2", name: "Aluguel do ponto", amount: 3500, dueDate: "2026-10-20" }, { id: "f3", name: "Folha de pagamento", amount: 9800, dueDate: "2026-11-05" }],
    goals: [{ id: "g1", name: "Capital de giro", current: 18000, target: 30000 }, { id: "g2", name: "Novo equipamento", current: 7500, target: 15000 }],
    budgets: [{ category: "Mercadorias", spent: 9800, limit: 10000 }, { category: "Marketing", spent: 2100, limit: 2000 }, { category: "Operação", spent: 4600, limit: 6000 }],
  },
};
