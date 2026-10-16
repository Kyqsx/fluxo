"use client";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatBRL } from "@fluxo/core";
import type { EnvData } from "@/data/mock";

const COLORS = ["#6D28D9", "#8B5CF6", "#A78BFA", "#16A34A", "#F59E0B", "#94A3B8"];
const fmt = (v: unknown): string => formatBRL(Number(v));
export function IncomeExpenseChart({ data }: { data: EnvData["monthly"] }) {
  return (<div className="h-64 w-full" role="img" aria-label="Receitas e despesas dos últimos seis meses"><ResponsiveContainer><BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="#94A3B833" vertical={false} /><XAxis dataKey="month" tickLine={false} axisLine={false} /><YAxis width={48} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v / 1000}k`} />
    <Tooltip formatter={fmt} contentStyle={{ borderRadius: 12 }} /><Legend />
    <Bar dataKey="income" name="Receitas" fill="#16A34A" radius={[6, 6, 0, 0]} /><Bar dataKey="expense" name="Despesas" fill="#DC2626" radius={[6, 6, 0, 0]} />
  </BarChart></ResponsiveContainer></div>);
}
export function CategoryDonut({ data }: { data: EnvData["byCategory"] }) {
  return (<div className="h-64 w-full" role="img" aria-label="Despesas por categoria"><ResponsiveContainer><PieChart>
    <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>{data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie>
    <Tooltip formatter={fmt} contentStyle={{ borderRadius: 12 }} /><Legend />
  </PieChart></ResponsiveContainer></div>);
}
