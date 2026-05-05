import { Link } from "react-router-dom";
import { Loader2, Plus } from "lucide-react";
import { type ShopifyProduct, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Adicionado à sacola", { position: "top-center" });
  };

  return (
    <Link to={`/product/${product.node.handle}`} className="group block">
      <div className="relative aspect-square bg-secondary overflow-hidden mb-4">
        {image && <img src={image.url} alt={image.altText || product.node.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />}
        <button onClick={handleAdd} disabled={isLoading || !variant} className="absolute bottom-4 right-4 w-12 h-12 bg-flow-ink text-flow-cream flex items-center justify-center hover:bg-flow-yellow hover:text-flow-ink transition-colors disabled:opacity-50" aria-label="Adicionar à sacola">
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
        </button>
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="uppercase tracking-wide text-sm font-medium group-hover:text-flow-yellow transition-colors">{product.node.title}</h3>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{product.node.options[0]?.values[0] !== "Default Title" ? product.node.options[0]?.name : "Edição única"}</p>
        </div>
        <span className="font-display text-xl whitespace-nowrap">{formatPrice(product.node.priceRange.minVariantPrice.amount, product.node.priceRange.minVariantPrice.currencyCode)}</span>
      </div>
    </Link>
  );
};
