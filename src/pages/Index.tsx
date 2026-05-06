import { Header } from "@/components/flow/Header";
import { Hero } from "@/components/flow/Hero";
import { Movement } from "@/components/flow/Movement";
import { Ingredients } from "@/components/flow/Ingredients";
import { Ritual } from "@/components/flow/Ritual";
import { Products } from "@/components/flow/Products";
import { Community } from "@/components/flow/Community";
import { FAQ } from "@/components/flow/FAQ";
import { Footer } from "@/components/flow/Footer";

const Index = () => (
  <div className="min-h-screen flex flex-col bg-flow-cream">
    <Header />
    <main className="flex-1">
      <Hero />
      <Movement />
      <Ingredients />
      <Ritual />
      <Products />
      <Community />
      <FAQ />
    </main>
    <Footer />
  </div>
);

export default Index;
