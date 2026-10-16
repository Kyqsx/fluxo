import { LayoutDashboard, ArrowLeftRight, Wallet, Target, BarChart3, Settings, type LucideIcon } from "lucide-react";
export const NAV: { href: string; label: string; title: string; sub: string; icon: LucideIcon }[] = [
  { href: "/", label: "Visão geral", title: "Visão geral", sub: "Resumo das suas finanças", icon: LayoutDashboard },
  { href: "/transacoes", label: "Transações", title: "Transações", sub: "Receitas, despesas e transferências", icon: ArrowLeftRight },
  { href: "/contas", label: "Contas", title: "Contas", sub: "Saldos e carteiras", icon: Wallet },
  { href: "/planejamento", label: "Planejamento", title: "Planejamento", sub: "Orçamentos e metas", icon: Target },
  { href: "/relatorios", label: "Relatórios", title: "Relatórios", sub: "Análises do período", icon: BarChart3 },
  { href: "/configuracoes", label: "Configurações", title: "Configurações", sub: "Preferências do app", icon: Settings },
];
