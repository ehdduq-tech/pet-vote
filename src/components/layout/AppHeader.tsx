"use client";

import { Ticket } from "lucide-react";
import { useApp } from "@/context/AppContext";

const APP_NAME = "우리 막내 자랑하기";

export default function AppHeader() {
  const { voteTickets } = useApp();

  return (
    <header
      className="app-row flex items-center justify-between border-b border-neutral-200 bg-white px-4"
    >
      <h1 className="text-sm font-bold text-neutral-900">{APP_NAME}</h1>
      <div className="flex items-center gap-1.5 text-sm font-semibold text-neutral-900">
        <Ticket className="h-4 w-4 text-amber-500" strokeWidth={2} />
        <span>{voteTickets}</span>
      </div>
    </header>
  );
}
