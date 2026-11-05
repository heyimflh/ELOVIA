'use client';

import { useCart } from '@/lib/cart-store';
import {
  CartHeader,
  CartItemList,
  CartSummary,
  CartEmptyState,
} from '@/components/cart';
import { Footer } from '@/components/footer';

export default function KeranjangPage() {
  const {
    items,
    totalWeight,
    totalMinPrice,
    totalMaxPrice,
    totalCo2e,
    itemCount,
    removeItem,
    updateWeight,
    clearCart,
    resetToDemo,
  } = useCart();

  return (
    <div className="relative min-h-screen bg-mist-50 flex flex-col justify-between selection:bg-mint-100 selection:text-green-700">
      {/* 1. Ambient Background: Massive, extremely soft fixed blurred orbs */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
        {/* Massive Mint Blurred Orb (Top-Left) */}
        <div className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-mint-200/40 blur-[140px]" />

        {/* Massive Teal Blurred Orb (Top-Right) */}
        <div className="absolute top-16 -right-32 w-[620px] h-[620px] rounded-full bg-teal-50/40 blur-[140px]" />

        {/* Soft Secondary Mint Orb (Center-Bottom) */}
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-mint-100/50 blur-[160px]" />

        {/* Subtle Eco-Grid Pattern for eco-tech precision */}
        <div className="absolute inset-0 bg-eco-grid opacity-50" />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1">
        {/* Container: max-w-7xl mx-auto px-6 pt-32 pb-24 */}
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
          {itemCount > 0 ? (
            /* Sophisticated Asymmetric Grid: 8 cols Left (Items), 4 cols Right (Summary) */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column (Items & Header) - Spans 8 cols */}
              <div className="lg:col-span-8 flex flex-col">
                {/* 2. Page Header (Left Column Top) */}
                <CartHeader itemCount={itemCount} />

                {/* 3. The Material Item Cards (Left Column - Framer Motion List) */}
                <CartItemList
                  items={items}
                  onRemove={removeItem}
                  onUpdateWeight={updateWeight}
                  onClear={clearCart}
                  onResetDemo={resetToDemo}
                />
              </div>

              {/* Right Column (Sticky Summary Panel - The 'Receipt') - Spans 4 cols */}
              <div className="lg:col-span-4">
                <CartSummary
                  items={items}
                  totalWeight={totalWeight}
                  totalMinPrice={totalMinPrice}
                  totalMaxPrice={totalMaxPrice}
                  totalCo2e={totalCo2e}
                />
              </div>
            </div>
          ) : (
            /* 5. Empty State (Render conditionally if items = 0) */
            <div className="py-6 sm:py-12">
              <CartEmptyState onResetDemo={resetToDemo} />
            </div>
          )}
        </div>
      </main>

      {/* Global Parallax Footer */}
      <Footer />
    </div>
  );
}

