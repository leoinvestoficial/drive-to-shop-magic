import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Privacidade from "./pages/legal/Privacidade.tsx";
import Termos from "./pages/legal/Termos.tsx";
import Entrega from "./pages/legal/Entrega.tsx";
import TrocaDevolucao from "./pages/legal/TrocaDevolucao.tsx";
import Cancelamento from "./pages/legal/Cancelamento.tsx";
import Contato from "./pages/legal/Contato.tsx";
import FaqPage from "./pages/Faq.tsx";
import Product from "./pages/Product.tsx";
import { BackToTop } from "./components/flow/BackToTop";
import { LoadingScreen } from "./components/flow/LoadingScreen";
import { PageTransition } from "./components/flow/PageTransition";
import { useCartSync } from "./hooks/useCartSync";

const queryClient = new QueryClient();

const AppInner = () => {
  useCartSync();
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageTransition />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pack/:id" element={<Product />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/politica-de-privacidade" element={<Privacidade />} />
          <Route path="/termos-de-uso" element={<Termos />} />
          <Route path="/politica-de-entrega" element={<Entrega />} />
          <Route path="/politica-de-troca-e-devolucao" element={<TrocaDevolucao />} />
          <Route path="/politica-de-cancelamento" element={<Cancelamento />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BackToTop />
      </BrowserRouter>
      <LoadingScreen />
    </TooltipProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppInner />
  </QueryClientProvider>
);

export default App;
