"use client";

import { useState } from "react";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";

const FIELDS: {
  l: string;
  k: "name" | "company" | "email" | "team_size";
  t: string;
  p: string;
}[] = [
  { l: "YOUR_NAME", k: "name", t: "text", p: "Marina Velasquez" },
  { l: "COMPANY", k: "company", t: "text", p: "Acme Robotics" },
  { l: "EMAIL", k: "email", t: "email", p: "marina@acme.co" },
  { l: "TEAM_SIZE", k: "team_size", t: "text", p: "12" },
];

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    team_size: "",
    objective: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const message = [
      form.objective,
      form.team_size ? `Team size: ${form.team_size}` : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          projectType: form.company,
          message,
        }),
      });
      const data = (await r.json()) as { success?: boolean; error?: string };
      if (!r.ok || !data.success) {
        setStatus("error");
        setErrorMsg(data.error || "Channel busy. Try again.");
        return;
      }
      setStatus("success");
      setForm({ name: "", company: "", email: "", team_size: "", objective: "" });
    } catch {
      setStatus("error");
      setErrorMsg("Channel lost. Try again.");
    }
  };

  if (status === "success") {
    return (
      <div
        style={{
          padding: 40,
          border: "1px solid var(--ns-lime)",
          background: "linear-gradient(135deg, rgba(198,255,60,0.08), transparent 70%)",
          fontFamily: MONO,
          color: "var(--ns-text)",
          lineHeight: 1.7,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "var(--ns-lime)",
            letterSpacing: "0.2em",
            marginBottom: 16,
          }}
        >
          ● CHANNEL_OPENED
        </div>
        <div style={{ fontSize: 16, color: "var(--ns-text)" }}>
          Signal received. An operator will respond within 24 hours.
        </div>
        <button
          onClick={() => setStatus("idle")}
          style={{
            marginTop: 24,
            padding: "10px 16px",
            background: "transparent",
            border: "1px solid var(--ns-line-strong)",
            color: "var(--ns-violet)",
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.2em",
            cursor: "pointer",
            textTransform: "uppercase",
            borderRadius: 2,
          }}
        >
          [ open_another ↺ ]
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 18,
        fontFamily: MONO,
        fontSize: 12,
      }}
    >
      {FIELDS.map((f) => (
        <label
          key={f.k}
          style={{ display: "flex", flexDirection: "column", gap: 6 }}
        >
          <span style={{ color: "var(--ns-violet)", letterSpacing: "0.18em" }}>
            {f.l}
          </span>
          <input
            type={f.t}
            placeholder={f.p}
            required={f.k === "name" || f.k === "email"}
            value={form[f.k]}
            onChange={update(f.k)}
            className="ns-input"
            style={{
              background: "rgba(15,16,24,0.6)",
              border: "1px solid var(--ns-line)",
              padding: "14px 16px",
              color: "var(--ns-text)",
              fontFamily: MONO,
              fontSize: 13,
              outline: "none",
              borderRadius: 2,
              transition: "border-color .2s",
            }}
          />
        </label>
      ))}
      <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ color: "var(--ns-violet)", letterSpacing: "0.18em" }}>
          OBJECTIVE
        </span>
        <textarea
          placeholder="What metric do you want to move?"
          required
          rows={4}
          value={form.objective}
          onChange={update("objective")}
          className="ns-input"
          style={{
            background: "rgba(15,16,24,0.6)",
            border: "1px solid var(--ns-line)",
            padding: "14px 16px",
            color: "var(--ns-text)",
            fontFamily: MONO,
            fontSize: 13,
            outline: "none",
            borderRadius: 2,
            resize: "vertical",
            transition: "border-color .2s",
          }}
        />
      </label>
      {status === "error" && (
        <div
          style={{
            padding: "10px 14px",
            border: "1px solid var(--ns-magenta)",
            color: "var(--ns-magenta)",
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.1em",
          }}
        >
          ● {errorMsg}
        </div>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        style={{
          alignSelf: "flex-start",
          marginTop: 8,
          padding: "14px 24px",
          background: "var(--ns-violet)",
          color: "white",
          border: "none",
          borderRadius: 2,
          cursor: status === "submitting" ? "wait" : "pointer",
          fontFamily: MONO,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          opacity: status === "submitting" ? 0.6 : 1,
          boxShadow:
            "0 0 0 1px var(--ns-violet), 0 0 30px rgba(124,92,255,0.3)",
        }}
      >
        {status === "submitting" ? "[ transmitting… ]" : "[ open_channel ↗ ]"}
      </button>
      <style>{`
        .ns-input:focus { border-color: var(--ns-violet) !important; }
      `}</style>
    </form>
  );
}
