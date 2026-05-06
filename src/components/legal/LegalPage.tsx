import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/flow/Header";
import { Footer } from "@/components/flow/Footer";
import { LeadCaptureModal } from "@/components/flow/LeadCaptureModal";

interface LegalPageProps {
  eyebrow: string;
  title: ReactNode;
  updatedAt?: string;
  children: ReactNode;
}

export const LegalPage = ({ eyebrow, title, updatedAt = "atualizado em maio/2026", children }: LegalPageProps) => {
  if (typeof document !== "undefined") {
    const titleText = typeof title === "string" ? title : eyebrow;
    document.title = `${titleText} · flow`;
  }
  return (
    <div className="min-h-screen flex flex-col bg-flow-cream text-flow-ink">
      <Header />
      <main className="flex-1 pt-28 md:pt-36 pb-16 md:pb-24 px-5 md:px-6">
        <article className="max-w-3xl mx-auto">
          <Link to="/" className="font-sans text-[10px] uppercase tracking-[0.4em] text-flow-ink/50 hover:text-flow-ink transition-colors">← voltar</Link>
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-flow-ink/50 mt-8 mb-3">{eyebrow}</p>
          <h1 className="font-display lowercase text-[2.5rem] sm:text-5xl md:text-6xl leading-[0.95] tracking-tight mb-3">
            {title}
          </h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-flow-ink/40 mb-10">{updatedAt}</p>
          <div className="font-sans text-[15px] leading-relaxed text-flow-ink/80 space-y-6 [&_h2]:font-display [&_h2]:lowercase [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:tracking-tight [&_h2]:text-flow-ink [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-sans [&_h3]:font-semibold [&_h3]:text-base [&_h3]:uppercase [&_h3]:tracking-widest [&_h3]:text-flow-ink [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-flow-yellow">
            {children}
          </div>
        </article>
      </main>
      <Footer />
      <LeadCaptureModal />
    </div>
  );
};