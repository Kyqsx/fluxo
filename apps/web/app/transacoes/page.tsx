import { Suspense } from "react";
import { TransactionsView } from "./view";
export default function Page() { return <Suspense fallback={<div className="card h-64 animate-pulse" />}><TransactionsView /></Suspense>; }
