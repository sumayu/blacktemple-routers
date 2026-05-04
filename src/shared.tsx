import { useState, useEffect, useRef, ReactNode } from "react";
import { Copy, Check, ChevronRight } from "lucide-react";

// ─── CodeBlock ───────────────────────────────────────────────────────────────────
export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="my-4 rounded-lg overflow-hidden border"
      style={{ background: "#111", borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="flex items-center justify-between px-4 py-2 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex gap-1.5">
          {[0,1,2].map(i => <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />)}
        </div>
        <button onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs cursor-pointer select-none transition-colors"
          style={{ color: "rgba(255,255,255,0.3)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>
          {copied ? <><Check size={11}/><span>Скопировано</span></> : <><Copy size={11}/><span>Копировать</span></>}
        </button>
      </div>
      <pre className="px-4 py-3 overflow-x-auto m-0">
        <code className="text-sm font-mono leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>{code}</code>
      </pre>
    </div>
  );
}

// ─── Screenshot — NO onError hiding, referrerPolicy for telegra.ph ──────────────
export function Img({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="my-5 rounded-xl overflow-hidden border"
      style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}>
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", display: "block" }}
      />
    </div>
  );
}

// ─── Inline code ─────────────────────────────────────────────────────────────────
export function IC({ children }: { children: ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded font-mono"
      style={{ fontSize: "0.83em", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.82)" }}>
      {children}
    </code>
  );
}

// ─── Bold ────────────────────────────────────────────────────────────────────────
export function B({ children }: { children: ReactNode }) {
  return <strong style={{ fontWeight: 600, color: "rgba(255,255,255,0.92)" }}>{children}</strong>;
}

// ─── Nav path  ───────────────────────────────────────────────────────────────────
export function NP({ items }: { items: string[] }) {
  return (
    <span className="inline-flex items-center flex-wrap" style={{ fontWeight: 500, color: "rgba(255,255,255,0.88)" }}>
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center">
          {item}
          {i < items.length - 1 && <ChevronRight size={12} className="mx-0.5" style={{ color: "rgba(255,255,255,0.3)" }} />}
        </span>
      ))}
    </span>
  );
}

// ─── Note ────────────────────────────────────────────────────────────────────────
export function Note({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 rounded-lg px-4 py-3 border text-sm leading-relaxed"
      style={{ background: "#181600", borderColor: "rgba(255,205,55,0.2)", color: "rgba(255,255,255,0.55)" }}>
      {children}
    </div>
  );
}

// ─── Link ────────────────────────────────────────────────────────────────────────
export function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ color: "rgba(255,255,255,0.72)", textDecoration: "underline", textDecorationColor: "rgba(255,255,255,0.25)" }}
      onMouseEnter={e => (e.currentTarget.style.color = "white")}
      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.72)")}>
      {children}
    </a>
  );
}

// ─── Mini header ─────────────────────────────────────────────────────────────────
export function GuideHeader({ section, title }: { section: string; title: string }) {
  return (
    <div className="border-b mb-8" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
      <div className="pb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full border"
            style={{ color: "rgba(255,255,255,0.4)", borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>
            {section}
          </span>
        </div>
        <h1 className="font-semibold leading-tight"
          style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)", letterSpacing: "-0.02em", color: "white" }}>
          {title}
        </h1>
      </div>
    </div>
  );
}

// ─── Step item type ──────────────────────────────────────────────────────────────
export interface StepDef {
  id: number;
  title: string;
  body: ReactNode;
}

// ─── Guide page layout (sidebar + content) ──────────────────────────────────────
export function GuideLayout({
  section, title, subtitle, steps, extra,
}: {
  section: string;
  title: string;
  subtitle?: string;
  steps: StepDef[];
  extra?: ReactNode;
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const fn = () => {
      let cur = 0;
      refs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= 130) cur = i;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const goto = (i: number) => {
    const el = refs.current[i];
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: "smooth" });
  };

  return (
    <div style={{ background: "#0a0a0a", color: "white", fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100%" }}>
      {/* Mini header */}
      <div className="border-b px-6 py-5" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full border mr-3"
          style={{ color: "rgba(255,255,255,0.4)", borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>
          {section}
        </span>
        <h1 className="mt-3 font-semibold leading-tight"
          style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", letterSpacing: "-0.02em", color: "white" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 max-w-xl" style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "rgba(255,255,255,0.4)" }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Body */}
      <div className="flex gap-0 items-start">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col shrink-0 sticky top-0 self-start border-r"
          style={{ width: "200px", borderColor: "rgba(255,255,255,0.06)", minHeight: "calc(100vh - 80px)", paddingTop: "24px" }}>
          <p className="px-5 mb-3" style={{ fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.2)", letterSpacing: "0.13em", textTransform: "uppercase" }}>
            Содержание
          </p>
          <nav className="flex flex-col px-2">
            {steps.map((s, i) => (
              <button key={s.id} onClick={() => goto(i)}
                className="flex items-center gap-2 text-left py-1.5 px-3 rounded-md transition-all cursor-pointer w-full"
                style={{
                  fontSize: "12.5px",
                  lineHeight: 1.4,
                  color: active === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.32)",
                  background: active === i ? "rgba(255,255,255,0.06)" : "transparent",
                }}>
                <span style={{ fontSize: "10px", fontFamily: "monospace", color: active === i ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.18)", flexShrink: 0, width: "18px" }}>
                  {String(s.id).padStart(2, "0")}
                </span>
                <span className="leading-snug">{s.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 px-6 py-8 max-w-3xl">
          {steps.map((step, i) => (
            <section key={step.id} ref={el => { refs.current[i] = el; }} className="scroll-mt-24">
              <div className="flex gap-5 items-baseline">
                <span style={{ fontSize: "12px", fontFamily: "monospace", color: "rgba(255,255,255,0.18)", flexShrink: 0, width: "28px", textAlign: "right" }}>
                  {String(step.id).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0 pb-10">
                  <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "rgba(255,255,255,0.92)", marginBottom: "12px" }}>
                    {step.title}
                  </h2>
                  <div style={{ fontSize: "0.9275rem", lineHeight: 1.75, color: "rgba(255,255,255,0.52)" }}>
                    {step.body}
                  </div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="mb-0 h-px" style={{ background: "rgba(255,255,255,0.05)", marginLeft: "48px", marginBottom: "0" }} />
              )}
            </section>
          ))}

          {extra}

          <div className="mt-10 rounded-lg px-5 py-4 border text-sm"
            style={{ background: "rgba(255,255,255,0.025)", borderColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)", lineHeight: 1.65 }}>
            <strong style={{ color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>NB!</strong>{" "}
            Мы не призываем пользоваться данной инструкцией — соблюдайте законы РФ.
          </div>
        </main>
      </div>
    </div>
  );
}
