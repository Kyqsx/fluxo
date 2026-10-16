export type Environment = "personal" | "business";
export type TxType = "income" | "expense" | "transfer";
export interface Transaction { id: string; description: string; amount: number; type: TxType; category: string; account: string; date: string }
export interface Account { id: string; name: string; kind: string; balance: number }
export interface Bill { id: string; name: string; amount: number; dueDate: string }
export interface Goal { id: string; name: string; current: number; target: number }
export interface Budget { category: string; spent: number; limit: number }
