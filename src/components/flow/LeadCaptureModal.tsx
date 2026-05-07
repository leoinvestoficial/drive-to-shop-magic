import { useEffect, useState } from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import canSrc from "@/assets/brand/can-flow.svg";

const STORAGE_KEY = "flow_lead_v1";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(80),
  email: z.string().trim().email("E-mail inválido").max(160),
});

let externalOpen: (() => void) | null = null;
export const openLeadCapture = () => externalOpen?.();

// Multi-step preparado (atualmente 1 passo)
const STEPS = ["dados"] as const;

export const LeadCaptureModal = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [step] = useState(0);

  useEffect(() => {
    externalOpen = () => setOpen(true);
    if (localStorage.getItem(STORAGE_KEY)) return;
    // 8s após carregamento OU exit intent (movimento do mouse para fora pela borda superior)
    const t = setTimeout(() => setOpen(true), 8000);
    const onExitIntent = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem(STORAGE_KEY)) {
        setOpen(true);
        document.removeEventListener("mouseleave", onExitIntent);
      }
    };
    document.addEventListener("mouseleave", onExitIntent);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mouseleave", onExitIntent);
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-lead", {
        body: { ...parsed.data, origin: "popup-lancamento" },
      });
      if (error || !data?.ok) {
        const fallback = JSON.parse(localStorage.getItem("flow_leads_pending") || "[]");
        fallback.push({ ...parsed.data, ts: new Date().toISOString() });
        localStorage.setItem("flow_leads_pending", JSON.stringify(fallback));
        toast({ title: "Recebemos seu cadastro.", description: "Em instantes você recebe o cupom FLOW10 por e-mail." });
      } else {
        toast({ title: "Cupom FLOW10 a caminho.", description: "Use no checkout para 10% off no seu primeiro pack." });
      }
      localStorage.setItem(STORAGE_KEY, "1");
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-flow-ink text-flow-cream border-flow-cream/10 max-w-3xl p-0 rounded-none overflow-hidden">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
              className="grid grid-cols-1 md:grid-cols-2"
            >
              {/* Lado esquerdo: lata em fundo escuro */}
              <div className="relative hidden md:flex items-center justify-center bg-gradient-to-br from-flow-ink via-[hsl(0_0%_10%)] to-flow-ink overflow-hidden p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--flow-yellow)/0.18),transparent_60%)]" />
                <img
                  src={canSrc}
                  alt="lata flow"
                  className="relative z-10 w-[55%] h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] animate-float"
                />
                <p className="absolute bottom-6 left-6 right-6 font-sans text-[10px] uppercase tracking-[0.4em] text-flow-cream/40">
                  / edição 01 · 2026
                </p>
              </div>

              {/* Lado direito: formulário */}
              <div className="p-8 md:p-10 flex flex-col">
                <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-flow-yellow mb-3">/ cupom de lançamento</p>
                <DialogTitle className="font-display lowercase text-3xl md:text-4xl leading-[0.95] tracking-tight">
                  <span className="font-sans font-semibold tabular-nums">10%</span> off no seu <span className="text-flow-cream/50">primeiro pack.</span>
                </DialogTitle>
                <DialogDescription className="font-sans text-flow-cream/60 text-sm mt-3 mb-6">
                  Cadastre-se e receba o cupom <span className="font-semibold text-flow-cream">FLOW10</span> por e-mail.
                </DialogDescription>

                <form onSubmit={submit} className="space-y-3 flex-1 flex flex-col">
                  <div>
                    <Input
                      placeholder="seu nome"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="bg-transparent border-flow-cream/20 text-flow-cream placeholder:text-flow-cream/40 rounded-none h-12"
                    />
                    {errors.name && <p className="font-sans text-flow-yellow text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="seu melhor e-mail"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="bg-transparent border-flow-cream/20 text-flow-cream placeholder:text-flow-cream/40 rounded-none h-12"
                    />
                    {errors.email && <p className="font-sans text-flow-yellow text-xs mt-1">{errors.email}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-none bg-flow-yellow text-flow-ink hover:bg-flow-cream font-sans uppercase tracking-[0.25em] text-[10px] font-bold animate-pulse-cta"
                  >
                    {loading ? "enviando…" : "quero meu cupom"}
                  </Button>

                  {/* Progress dots (preparado para multi-step) */}
                  {STEPS.length > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-2">
                      {STEPS.map((_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 rounded-full transition-all ${
                            i === step ? "w-6 bg-flow-yellow" : "w-1.5 bg-flow-cream/20"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  <p className="font-sans text-[10px] uppercase tracking-widest text-flow-cream/40 text-center pt-2 mt-auto">
                    ao se cadastrar você aceita receber comunicações da flow
                  </p>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
