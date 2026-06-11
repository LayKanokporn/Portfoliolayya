"use client";
import React, { useState } from "react";
import {
  FiPlay,
  FiRefreshCw,
  FiCheck,
  FiClock,
  FiServer,
  FiFileText,
  FiZap,
  FiCpu,
  FiLoader,
} from "react-icons/fi";

// ─── DATA: 3 real workflows from Lay's actual production work ─────────

type StepKey = "todo" | "running" | "done";
type Step = { label: string; ms: number };
type Workflow = {
  id: string;
  label: string;
  short: string;
  icon: React.ReactNode;
  inputs: { key: string; label: string; sample: string }[];
  steps: Step[];
  output: (input: Record<string, string>) => Record<string, unknown>;
};

const WORKFLOWS: Workflow[] = [
  {
    id: "bg-alert",
    label: "BG Alert Automation",
    short: "SAP S/4HANA",
    icon: <FiServer />,
    inputs: [
      { key: "bgId", label: "Bank Guarantee ID", sample: "BG-4500001234" },
      { key: "expiry", label: "Expiry date", sample: "2026-07-15" },
    ],
    steps: [
      { label: "Extract BG record from SAP Web GUI", ms: 340 },
      { label: "Classify by expiry window (30d / 7d / expired)", ms: 180 },
      { label: "Group by business unit", ms: 160 },
      { label: "Compose Outlook draft per stakeholder", ms: 280 },
      { label: "Distribute email + write audit log", ms: 240 },
    ],
    output: (i) => {
      const exp = new Date(i.expiry || "2026-07-15");
      const today = new Date("2026-06-10");
      const days = Math.round((exp.getTime() - today.getTime()) / 86_400_000);
      const classification =
        days <= 0 ? "expired" : days <= 7 ? "7d_critical" : days <= 30 ? "30d_warning" : "watch";
      return {
        bg_id: i.bgId || "BG-4500001234",
        expiry: i.expiry || "2026-07-15",
        days_to_expire: days,
        classification,
        stakeholder_group: "TR-FX",
        email_sent: true,
        audit_id: "BG-2026-0042",
        run_time_ms: 1200,
      };
    },
  },
  {
    id: "payment-advice",
    label: "Payment Advice (OCR)",
    short: "Power Automate · AI Builder",
    icon: <FiFileText />,
    inputs: [
      { key: "vendor", label: "Vendor name", sample: "Sunrise Supplies Co." },
      { key: "amount", label: "Amount (extracted by OCR)", sample: "48,250.00 THB" },
      { key: "ref", label: "Invoice ref", sample: "INV-2026-1198" },
    ],
    steps: [
      { label: "Inbox trigger fires (Power Automate Cloud)", ms: 220 },
      { label: "AI Builder OCR extracts payment fields", ms: 520 },
      { label: "Validate vendor against SAP master data", ms: 280 },
      { label: "Compose payment advice (per beneficiary)", ms: 220 },
      { label: "Send via Outlook + write Excel audit log", ms: 240 },
    ],
    output: (i) => ({
      vendor: i.vendor || "Sunrise Supplies Co.",
      invoice_ref: i.ref || "INV-2026-1198",
      amount_extracted: i.amount || "48,250.00 THB",
      ocr_confidence: 0.96,
      sap_master_match: true,
      payment_advice: {
        sent_to: "ap-sunrise@example.com",
        cc: ["finance@example.com"],
        status: "delivered",
      },
      audit_row: "PMT-2026-0078",
      run_time_ms: 1480,
    }),
  },
  {
    id: "webhook",
    label: "Sunrise LINE Webhook",
    short: "Reply-200-First · Idempotent",
    icon: <FiZap />,
    inputs: [
      { key: "userId", label: "LINE user ID", sample: "Uabc123…" },
      { key: "text", label: "Incoming message", sample: "ใช้จ่าย 320 ค่ากาแฟ" },
    ],
    steps: [
      { label: "Reply 200 OK immediately (P95 < 1.5s)", ms: 80 },
      { label: "Check CacheService for dedup key", ms: 60 },
      { label: "Parse intent + extract entities (Thai NL)", ms: 220 },
      { label: "Update Google Sheets state DB", ms: 180 },
      { label: "Compose adaptive Flex reply (size guard)", ms: 200 },
      { label: "Push reply via LINE Messaging API", ms: 160 },
    ],
    output: (i) => ({
      user_id: i.userId || "Uabc123def456",
      message: i.text || "ใช้จ่าย 320 ค่ากาแฟ",
      intent: "expense_entry",
      entities: { amount: 320, category: "ค่ากาแฟ" },
      idempotent: true,
      state_written: true,
      reply: {
        type: "flex",
        bytes: 4820,
        fallback_used: false,
      },
      run_time_ms: 900,
    }),
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────

export default function AutomationSimulator() {
  const [activeId, setActiveId] = useState<string>(WORKFLOWS[0].id);
  const wf = WORKFLOWS.find((w) => w.id === activeId)!;

  // Inputs (per workflow)
  const [inputs, setInputs] = useState<Record<string, string>>({});

  // Step state
  const [stepState, setStepState] = useState<StepKey[]>([]);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<Record<string, unknown> | null>(null);

  const fillSample = () => {
    const sample: Record<string, string> = {};
    wf.inputs.forEach((f) => (sample[f.key] = f.sample));
    setInputs(sample);
  };

  const reset = () => {
    setStepState([]);
    setOutput(null);
    setInputs({});
  };

  const run = async () => {
    setRunning(true);
    setOutput(null);
    setStepState(wf.steps.map(() => "todo"));

    for (let i = 0; i < wf.steps.length; i++) {
      setStepState((prev) => {
        const next = [...prev];
        next[i] = "running";
        return next;
      });
      await new Promise((r) => setTimeout(r, wf.steps[i].ms));
      setStepState((prev) => {
        const next = [...prev];
        next[i] = "done";
        return next;
      });
    }

    setOutput(wf.output(inputs));
    setRunning(false);
  };

  return (
    <div className="rounded-lg border border-[#e5e7eb] bg-white overflow-hidden">
      {/* Header */}
      <div className="border-b border-[#e5e7eb] bg-[#f8faff] px-5 py-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h3 className="text-[14px] font-medium text-[#111827] inline-flex items-center gap-2">
              <FiCpu className="text-[#1a56db]" /> Try my automation live
            </h3>
            <p className="text-[11.5px] text-[#6b7280] mt-1 max-w-md leading-relaxed">
              Simulated runs of three production workflows I built — pick one, fill the inputs (or use samples),
              then watch the trace and final JSON output.
            </p>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-[#6b7280] bg-white border border-[#e5e7eb] px-2 py-0.5 rounded-full self-start whitespace-nowrap">
            Demo
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 mt-4 flex-wrap">
          {WORKFLOWS.map((w) => {
            const active = w.id === activeId;
            return (
              <button
                key={w.id}
                onClick={() => {
                  setActiveId(w.id);
                  setStepState([]);
                  setOutput(null);
                  setInputs({});
                }}
                disabled={running}
                className={`inline-flex items-center gap-1.5 text-[11.5px] px-2.5 py-1.5 rounded-md border transition-colors ${
                  active
                    ? "bg-[#1a56db] text-white border-[#1a56db]"
                    : "bg-white text-[#374151] border-[#e5e7eb] hover:border-[#1a56db]/40"
                } disabled:opacity-60`}
              >
                <span className={active ? "text-white" : "text-[#1a56db]"}>{w.icon}</span>
                <span>{w.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Left: inputs */}
        <div className="p-5 border-b lg:border-b-0 lg:border-r border-[#e5e7eb]">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[11px] uppercase tracking-wider text-[#6b7280]">Inputs</h4>
            <button
              onClick={fillSample}
              disabled={running}
              className="text-[10.5px] text-[#1a56db] hover:underline disabled:opacity-60"
            >
              Use sample values
            </button>
          </div>
          <div className="space-y-2.5">
            {wf.inputs.map((field) => (
              <label key={field.key} className="block">
                <span className="block text-[11px] text-[#374151] mb-1">{field.label}</span>
                <input
                  value={inputs[field.key] ?? ""}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, [field.key]: e.target.value }))
                  }
                  placeholder={field.sample}
                  disabled={running}
                  className="w-full border border-[#e5e7eb] bg-[#f8faff] rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-[#1a56db] focus:ring-1 focus:ring-[#1a56db] transition-colors disabled:opacity-60"
                />
              </label>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={run}
              disabled={running}
              className="inline-flex items-center gap-2 text-[12px] font-medium bg-[#1a56db] hover:bg-[#1e40af] disabled:opacity-60 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md transition-colors flex-1 sm:flex-none justify-center"
            >
              {running ? (
                <>
                  <FiLoader className="animate-spin" /> Running…
                </>
              ) : (
                <>
                  <FiPlay /> Run automation
                </>
              )}
            </button>
            <button
              onClick={reset}
              disabled={running}
              className="inline-flex items-center justify-center gap-1 text-[12px] bg-white border border-[#e5e7eb] hover:bg-[#f8faff] text-[#111827] px-3 py-2 rounded-md disabled:opacity-60"
              aria-label="Reset"
            >
              <FiRefreshCw />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          <p className="text-[10.5px] text-[#6b7280] mt-3 leading-relaxed">
            <span className="uppercase tracking-wider mr-1">Stack</span>· {wf.short}
          </p>
        </div>

        {/* Right: trace + output */}
        <div className="p-5">
          <h4 className="text-[11px] uppercase tracking-wider text-[#6b7280] mb-2">Live trace</h4>
          <ol className="space-y-1.5">
            {wf.steps.map((step, i) => {
              const status: StepKey = stepState[i] ?? "todo";
              return (
                <li
                  key={step.label}
                  className={`flex items-start gap-2 text-[12px] ${
                    status === "todo" ? "text-[#9ca3af]" : "text-[#374151]"
                  }`}
                >
                  <span className="mt-0.5 shrink-0 w-4 h-4 inline-flex items-center justify-center">
                    {status === "done" && <FiCheck className="text-emerald-600" />}
                    {status === "running" && (
                      <FiLoader className="text-[#1a56db] animate-spin" />
                    )}
                    {status === "todo" && <FiClock className="text-[#9ca3af]" />}
                  </span>
                  <span className="leading-snug flex-1">{step.label}</span>
                  <span className="text-[10.5px] text-[#9ca3af] tabular-nums shrink-0">
                    {step.ms}ms
                  </span>
                </li>
              );
            })}
          </ol>

          {/* Output */}
          <h4 className="text-[11px] uppercase tracking-wider text-[#6b7280] mt-5 mb-2">
            Output JSON
          </h4>
          <pre
            className={`rounded-md border bg-[#0f172a] text-[#e2e8f0] text-[11px] leading-relaxed p-3 overflow-x-auto max-h-72 ${
              output ? "border-[#1a56db]/30" : "border-[#e5e7eb] opacity-50"
            }`}
          >
{output ? JSON.stringify(output, null, 2) : "// run the automation to see structured output"}
          </pre>
        </div>
      </div>
    </div>
  );
}
