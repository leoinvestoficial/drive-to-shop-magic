import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/brand/drive/flow-logo-1.svg";
import { Footer } from "@/components/flow/Footer";
import { LeadCaptureModal } from "@/components/flow/LeadCaptureModal";

interface LegalPageProps {
  eyebrow: string;
  title: ReactNode;
  updatedAt?: string;
  children: ReactNode;
}

const flatten = (node: ReactNode): string => {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flatten).join("");
  if (typeof node === "object" && "props" in (node as any)) return flatten((node as any).props.children);
  return "";
};

export const LegalPage = ({ eyebrow, title, updatedAt = "atualizado em maio/2026", children }: LegalPageProps) => {
  const plainTitle = flatten(title) || eyebrow;
  if (typeof document !== "undefined") {
    document.title = `${plainTitle} · flow`;
  }
  return (
    <div className="min-h-screen flex flex-col bg-flow-cream text-flow-ink">
      <header className="sticky top-0 inset-x-0 z-40 bg-flow-cream/90 backdrop-blur border-b border-flow-ink/10">
        <div className="max-w-3xl mx-auto flex items-center justify-between h-14 md:h-16 px-5 md:px-6">
          <Link to="/" aria-label="FLOW" className="flex items-center">
            <img src={logo} alt="flow" className="h-9 md:h-10 w-auto" />
          </Link>
          <Link to="/" className="inline-flex items-center gap-1.5 font-sans text-[13px] text-[#666] hover:text-flow-ink transition-colors">
            <ArrowLeft size={14} strokeWidth={1.5} /> voltar
          </Link>
        </div>
      </header>
      <main className="flex-1 py-8 md:py-14 px-5 md:px-6">
        <article className="max-w-3xl mx-auto">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-flow-ink/50 mb-3">{eyebrow}</p>
          <h1 className="font-sans font-bold text-[24px] md:text-[28px] leading-tight tracking-tight mb-2 text-[#0A0A0A]">
            {plainTitle}
          </h1>
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-flow-ink/40 mb-6">{updatedAt}</p>

          <div
            className="font-sans text-[15px] leading-[1.7] text-[#333] space-y-4
              [&_h2]:font-sans [&_h2]:font-semibold [&_h2]:text-[16px] [&_h2]:uppercase [&_h2]:tracking-wider [&_h2]:text-[#0A0A0A] [&_h2]:mt-8 [&_h2]:mb-2
              [&_h3]:font-sans [&_h3]:font-semibold [&_h3]:text-[14px] [&_h3]:uppercase [&_h3]:tracking-widest [&_h3]:text-[#0A0A0A] [&_h3]:mt-5 [&_h3]:mb-1.5
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1
              [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-flow-yellow"
          >
            {children}
          </div>
        </article>
      </main>
      <Footer />
      <LeadCaptureModal />
    </div>
  );
};