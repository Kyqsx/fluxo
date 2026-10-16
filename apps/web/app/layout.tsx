import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/providers";
import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = { title: "Fluxo", description: "Gestão financeira pessoal e empresarial", manifest: "/manifest.webmanifest", icons: { icon: "/icons/icon-192.png", apple: "/icons/icon-192.png" } };
export const viewport: Viewport = { themeColor: "#6D28D9", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="pt-BR" suppressHydrationWarning><body><Providers><AppShell>{children}</AppShell></Providers></body></html>);
}
