import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: {
    brand: { DEFAULT: "#6D28D9", light: "#8B5CF6" },
    bg: "var(--bg)", card: "var(--card)", fg: "var(--fg)", muted: "var(--muted)", line: "var(--line)",
    pos: "#16A34A", neg: "#DC2626" }, borderRadius: { xl2: "1.25rem" } } },
  plugins: [],
};
export default config;
