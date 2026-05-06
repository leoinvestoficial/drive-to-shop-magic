import { Link } from "react-router-dom";
import { Header } from "@/components/flow/Header";
import { Footer } from "@/components/flow/Footer";
import { FAQ } from "@/components/flow/FAQ";
import { LeadCaptureModal } from "@/components/flow/LeadCaptureModal";

const FaqPage = () => {
  if (typeof document !== "undefined") document.title = "FAQ · flow";
  return (
    <div className="min-h-screen flex flex-col bg-flow-cream text-flow-ink">
      <Header />
      <main className="flex-1 pt-24 md:pt-28">
        <div className="max-w-3xl mx-auto px-5 md:px-6 pt-8">
          <Link to="/" className="font-sans text-[10px] uppercase tracking-[0.4em] text-flow-ink/50 hover:text-flow-ink transition-colors">← voltar</Link>
        </div>
        <FAQ />
      </main>
      <Footer />
      <LeadCaptureModal />
    </div>
  );
};

export default FaqPage;