import { useEffect, useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "flow_lead_v1";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(80),
  email: z.string().trim().email("E-mail inválido").max(160),
  phone: z.string().trim().min(10, "Telefone inválido").max(20),
});

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

let externalOpen: (() => void) | null = null;
export const openLeadCapture = () => externalOpen?.();

export const LeadCaptureModal = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    externalOpen = () => setOpen(true);
    if (localStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), 6000);
    return () => clearTimeout(t);
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
      <DialogContent className="bg-flow-ink text-flow-cream border-flow-cream/10 max-w-md p-8 rounded-none">
        <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-flow-yellow mb-3">/ cupom de lançamento</p>
        <DialogTitle className="font-display lowercase text-3xl leading-[0.95] tracking-tight">
          <span className="font-sans font-semibold tabular-nums">10%</span> off no seu <span className="text-flow-cream/50">primeiro pack.</span>
        </DialogTitle>
        <DialogDescription className="font-sans text-flow-cream/60 text-sm mt-2 mb-6">
          Cadastre-se e receba o cupom <span className="font-semibold text-flow-cream">FLOW10</span> por e-mail. Válido em qualquer pack do lançamento.
        </DialogDescription>
        <form onSubmit={submit} className="space-y-3">
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
              placeholder="e-mail"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-transparent border-flow-cream/20 text-flow-cream placeholder:text-flow-cream/40 rounded-none h-12"
            />
            {errors.email && <p className="font-sans text-flow-yellow text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <Input
              inputMode="tel"
              placeholder="(11) 99999-9999"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: maskPhone(e.target.value) })}
              className="bg-transparent border-flow-cream/20 text-flow-cream placeholder:text-flow-cream/40 rounded-none h-12"
            />
            {errors.phone && <p className="font-sans text-flow-yellow text-xs mt-1">{errors.phone}</p>}
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-none bg-flow-yellow text-flow-ink hover:bg-flow-cream font-sans uppercase tracking-[0.25em] text-[10px] font-bold"
          >
            {loading ? "enviando…" : "quero meu cupom"}
          </Button>
          <p className="font-sans text-[10px] uppercase tracking-widest text-flow-cream/40 text-center pt-2">
            ao se cadastrar você aceita receber comunicações da flow
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
