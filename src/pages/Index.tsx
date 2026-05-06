import { Header } from "@/components/flow/Header";
import { Hero } from "@/components/flow/Hero";
import { LaunchPacks } from "@/components/flow/LaunchPacks";
import { Ingredients } from "@/components/flow/Ingredients";
import { Movement } from "@/components/flow/Movement";
import { FAQ } from "@/components/flow/FAQ";
import { Footer } from "@/components/flow/Footer";
import { LeadCaptureModal } from "@/components/flow/LeadCaptureModal";

const Index = () => (
  <div className="min-h-screen flex flex-col bg-flow-cream">
    <Header />
    <main className="flex-1">
      <Hero />
      <LaunchPacks />
      <Ingredients />
      <Movement />
      <FAQ />
    </main>
    <Footer />
    <LeadCaptureModal />
  </div>
);

export default Index;
