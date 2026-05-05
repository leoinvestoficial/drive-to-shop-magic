import { useEffect, useState } from "react";
import { PRODUCTS_QUERY, storefrontApiRequest, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";

export const Products = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 12 });
        setProducts(data?.data?.products?.edges || []);
      } finally { setLoading(false); }
    })();
  }, []);

  return (
    <section id="products" className="py-24 sm:py-32 bg-background px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-4">/ produtos</p>
            <h2 className="font-display uppercase text-5xl sm:text-6xl leading-[0.9]">direto ao <span className="text-flow-yellow">ponto</span>.</h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">Bebidas funcionais com composição limpa. Hidratação, energia e foco para a sua rotina ativa.</p>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-24"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
        ) : products.length === 0 ? (
          <div className="border border-dashed border-foreground/20 py-24 text-center">
            <p className="text-muted-foreground">Nenhum produto encontrado.</p>
            <p className="text-sm text-muted-foreground mt-2">Crie um produto pelo chat para vê-lo aqui.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {products.map((p) => <ProductCard key={p.node.id} product={p} />)}
          </div>
        )}
      </div>
    </section>
  );
};
