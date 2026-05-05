import { Header } from "@/components/flow/Header";
import { Hero } from "@/components/flow/Hero";
import { Pillars } from "@/components/flow/Pillars";
import { Manifesto } from "@/components/flow/Manifesto";
import { Products } from "@/components/flow/Products";
import { Footer } from "@/components/flow/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Products />
        <Pillars />
        <Manifesto />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
