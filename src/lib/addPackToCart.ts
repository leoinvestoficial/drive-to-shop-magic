import { PRODUCT_BY_HANDLE_QUERY, storefrontApiRequest, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import type { Pack } from "@/data/packs";
import { toast } from "sonner";

export async function addPackToCart(pack: Pack): Promise<boolean> {
  try {
    const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle: pack.shopifyHandle });
    const product = data?.data?.product;
    if (!product) {
      toast.error("Pack indisponível", {
        description: "Esse pack ainda não está publicado na loja. Tente novamente em instantes.",
      });
      return false;
    }
    const variant =
      product.variants.edges.find((e: { node: { id: string } }) => e.node.id === pack.shopifyVariantId)?.node ??
      product.variants.edges[0]?.node;
    if (!variant) {
      toast.error("Variante do pack não encontrada.");
      return false;
    }
    const shopifyProduct: ShopifyProduct = { node: product };
    await useCartStore.getState().addItem({
      product: shopifyProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    return true;
  } catch (err) {
    console.error("addPackToCart error", err);
    toast.error("Não conseguimos adicionar o pack agora.", { description: "Tente novamente em alguns instantes." });
    return false;
  }
}
