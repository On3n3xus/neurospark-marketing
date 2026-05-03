"use client";

import { useCallback, useState } from "react";

export type NsAskState = {
  status: "idle" | "thinking" | "done" | "error";
  q: string;
  a: string;
};

export async function nsAsk(prompt: string, system?: string): Promise<string> {
  try {
    const r = await fetch("/api/ask", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ prompt, system }),
    });
    if (!r.ok) return "Signal lost. Try again in a moment.";
    const data = (await r.json()) as { text?: string; error?: string };
    return data.text?.trim() || "Signal lost. Try again in a moment.";
  } catch {
    return "Signal lost. Try again in a moment.";
  }
}

export function useNsAsk() {
  const [state, setState] = useState<NsAskState>({
    status: "idle",
    q: "",
    a: "",
  });
  const ask = useCallback(async (q: string) => {
    if (!q.trim()) return;
    setState({ status: "thinking", q, a: "" });
    const a = await nsAsk(q);
    setState({ status: "done", q, a });
  }, []);
  const reset = useCallback(
    () => setState({ status: "idle", q: "", a: "" }),
    []
  );
  return { ...state, ask, reset };
}
