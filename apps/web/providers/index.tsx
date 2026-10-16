"use client";
import { useEffect, type ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { EnvProvider } from "./env-provider";
export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => { if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") navigator.serviceWorker.register("/sw.js").catch(() => {}); }, []);
  return <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}><EnvProvider>{children}</EnvProvider></ThemeProvider>;
}
