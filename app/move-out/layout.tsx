"use client";

import { MoveOutProvider } from "@/context/MoveOutContext";

export default function MoveOutLayout({ children }: { children: React.ReactNode }) {
  return <MoveOutProvider>{children}</MoveOutProvider>;
}

