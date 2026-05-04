import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { Copy, Check, ChevronRight } from "lucide-react";

// ─── Typography helpers ──────────────────────────────────────────────────────────

export function IC({ children }: { children: ReactNode }) {
  return (
    <code style={{
      fontFamily: "monospace",
      fontSize: "0.84em",
      background: "rgba(255,255,255,0.08)",
      color: "rgba(255,255,255,0.85)",
      padding: "2px 6px",
      borderRadius: "4px",
    }}>{children}</code>
  );
}

export function B({ children }: { children: ReactNode }) {
  return <strong style={{ fontWeight: 600, color: "rgba(255,255,255,0.95)" }}>{children}</strong>;
}

export function NP({ items }: { items: string[] }) {
  return (
    <span style={{ fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
          {item}
          {i < items.length - 1 && (
            <ChevronRight size={13} style={{ color: "rgba(255,255,255,0.35)", margin: "0 2px" }} />
          )}
        </span>
      ))}
    </span>
  );
}

export function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      color: "rgba(255,255,255,0.75)",
      textDecoration: "underline",
      textDecorationColor: "rgba(255,255,255,0.25)",
    }}
      onMouseEnter={e => (e.currentTarget.style.color = "white")}
      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
    >{children}</a>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <div style={{
      margin: "16px 0",
      padding: "12px 16px",
      background: "rgba(255, 200, 40, 0.06)",
      border: "1px solid rgba(255, 200, 40, 0.18)",
      borderRadius: "10px",
      fontSize: "0.875rem",
      lineHeight: 1.65,
      color: "rgba(255,255,255,0.55)",
    }}>{children}</div>
  );
}

// ─── Code block ──────────────────────────────────────────────────────────────────

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{
      margin: "14px 0",
      borderRadius: "10px",
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.08)",
      background: "#111",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 14px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", gap: "6px" }}>
          {[0,1,2].map(i => (
            <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "block" }} />
          ))}
        </div>
        <button onClick={handleCopy} style={{
          display: "flex", alignItems: "center", gap: 5,
          fontSize: 11, color: "rgba(255,255,255,0.3)",
          background: "none", border: "none", cursor: "pointer", padding: 0,
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
        >
          {copied ? <><Check size={11} /><span>Скопировано</span></> : <><Copy size={11} /><span>Копировать</span></>}
        </button>
      </div>
      <pre style={{ margin: 0, padding: "12px 16px", overflowX: "auto" }}>
        <code style={{ fontFamily: "monospace", fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.82)", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
          {code}
        </code>
      </pre>
    </div>
  );
}

// ─── Screenshot ──────────────────────────────────────────────────────────────────

export function Img({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{
      margin: "20px 0",
      borderRadius: "12px",
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.1)",
      background: "rgba(255,255,255,0.03)",
    }}>
      <img src={src} alt={alt} style={{ width: "100%", display: "block" }} />
    </div>
  );
}

// ─── Step type ───────────────────────────────────────────────────────────────────

export interface StepDef {
  id: number;
  title: string;
  body: ReactNode;
}

// ─── Guide Layout ─────────────────────────────────────────────────────────────────

export function GuideLayout({
  title,
  subtitle,
  steps,
  extra,
}: {
  title: string;
  subtitle?: string;
  steps: StepDef[];
  extra?: ReactNode;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const fn = () => {
      let cur = 0;
      stepRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= 120) cur = i;
      });
      setActiveStep(cur);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const goto = (i: number) => {
    const el = stepRefs.current[i];
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  return (
    <div style={{ background: "#0a0a0a", color: "white", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Top nav ── */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", position: "sticky", top: 0, zIndex: 50, background: "#0a0a0a" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>BlackTemple</span>
          {/* Step pills — desktop */}
          <div className="nav-pills hide-on-mobile">
            {steps.map((s, i) => (
              <button key={s.id} onClick={() => goto(i)} className={`nav-pill${activeStep === i ? " nav-pill-active" : ""}`}>
                <span className="nav-pill-num">{String(s.id).padStart(2, "0")}</span>
                {s.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Page content ── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" }}>



        {/* Title block */}
        <div style={{ marginBottom: 56 }}>
          <div style={{
            display: "inline-block",
            fontSize: 11,
            fontWeight: 500,
            color: "rgba(255,255,255,0.4)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "3px 10px",
            borderRadius: 20,
            marginBottom: 14,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}>
            Инструкция
          </div>
          <h1 style={{
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
            margin: "0 0 12px",
          }}>{title}</h1>
          {subtitle && (
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.65, margin: 0, maxWidth: 540 }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {steps.map((step, i) => (
            <div key={step.id}>
              <section
                ref={el => { stepRefs.current[i] = el; }}
                style={{ scrollMarginTop: 80 }}
              >
                {/* Step number + title row */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 16 }}>
                  <div style={{
                    flexShrink: 0,
                    fontSize: 11,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.22)",
                    letterSpacing: "0.05em",
                    paddingTop: 3,
                    minWidth: 24,
                  }}>
                    {String(step.id).padStart(2, "0")}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.95)",
                      margin: 0,
                      lineHeight: 1.4,
                    }}>{step.title}</h4>
                  </div>
                </div>

                {/* Step body — indented under title */}
                <div style={{
                  marginLeft: 44,
                  fontSize: "0.9275rem",
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.52)",
                  paddingBottom: 40,
                }}>
                  {step.body}
                </div>
              </section>

              {/* Divider */}
              {i < steps.length - 1 && (
                <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginLeft: 44, marginBottom: 40 }} />
              )}
            </div>
          ))}
        </div>

        {extra && (
          <div style={{ marginTop: 8 }}>
            {extra}
          </div>
        )}

        {/* NB */}
        <div style={{
          marginTop: 48,
          padding: "14px 18px",
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 10,
          fontSize: 13,
          color: "rgba(255,255,255,0.3)",
          lineHeight: 1.6,
        }}>
          <strong style={{ color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>NB!</strong>{" "}
          Мы не призываем пользоваться данной инструкцией — соблюдайте законы РФ.
        </div>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        pre { margin: 0; }

        /* Nav pills container — no scrollbar */
        .nav-pills {
          display: flex;
          gap: 2px;
          overflow: hidden;
          flex: 1;
          margin-left: 24px;
          mask-image: linear-gradient(to right, transparent 0%, black 2%, black 96%, transparent 100%);
        }
        .nav-pills:hover {
          overflow-x: auto;
        }
        .nav-pills::-webkit-scrollbar { display: none; }
        .nav-pills { scrollbar-width: none; -ms-overflow-style: none; }

        /* Nav pill buttons */
        .nav-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          background: transparent;
          color: rgba(255,255,255,0.32);
          transition: color 0.15s, background 0.15s;
          white-space: nowrap;
          font-family: inherit;
          flex-shrink: 0;
        }
        .nav-pill:hover {
          color: rgba(255,255,255,0.7);
          background: rgba(255,255,255,0.05);
        }
        .nav-pill-active {
          background: rgba(255,255,255,0.09) !important;
          color: white !important;
        }
        .nav-pill-num {
          font-family: monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.25);
        }
        .nav-pill-active .nav-pill-num {
          color: rgba(255,255,255,0.45);
        }

        @media (max-width: 640px) {
          .hide-on-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}