import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, Trash2, Loader2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";

export const CartDrawer = () => {
  const [open, setOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode || "BRL";

  useEffect(() => {
    if (open) syncCart();
  }, [open, syncCart]);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="relative flex items-center gap-2 px-4 py-2 border border-foreground/20 hover:bg-foreground hover:text-background transition-colors text-xs uppercase tracking-widest"
          aria-label="Abrir carrinho"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Sacola</span>
          {totalItems > 0 && (
            <span className="ml-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-flow-yellow text-flow-ink text-[10px] font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background border-l border-foreground/10">
        <SheetHeader>
          <SheetTitle className="font-display text-3xl uppercase tracking-tight">Sua sacola</SheetTitle>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {totalItems === 0 ? "Vazia" : `${totalItems} item${totalItems !== 1 ? "s" : ""}`}
          </p>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              <p className="text-muted-foreground">Adicione um produto e entre no flow.</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-1 min-h-0">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 pb-6 border-b border-foreground/10">
                      <div className="w-20 h-20 bg-secondary overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium uppercase text-sm tracking-wide">{item.product.node.title}</h4>
                        {item.selectedOptions.length > 0 && item.selectedOptions[0].value !== "Default Title" && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.selectedOptions.map((o) => o.value).join(" • ")}
                          </p>
                        )}
                        <p className="font-display text-lg mt-1">{formatPrice(item.price.amount, item.price.currencyCode)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="w-7 h-7 border border-foreground/20 hover:bg-foreground hover:text-background transition-colors"
                          >
                            <Minus className="h-3 w-3 mx-auto" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="w-7 h-7 border border-foreground/20 hover:bg-foreground hover:text-background transition-colors"
                          >
                            <Plus className="h-3 w-3 mx-auto" />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.variantId)} className="self-start text-muted-foreground hover:text-foreground">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 space-y-4 pt-6 border-t border-foreground/10 bg-background">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">Subtotal</span>
                  <span className="font-display text-2xl">{formatPrice(totalPrice, currency)}</span>
                </div>
                <Button
                  onClick={handleCheckout}
                  disabled={items.length === 0 || isLoading || isSyncing}
                  className="w-full h-12 rounded-none uppercase tracking-widest text-xs bg-foreground text-background hover:bg-flow-yellow hover:text-flow-ink"
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Finalizar compra
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};