import { getCachedProducts, getCachedCategories } from "@/lib/products";
import CatalogueFilterWrapper from "@/components/CatalogueFilterWrapper";

export default async function ProductsPage() {
  // Concurrent asynchronous data extraction from memory cache layers
  const [products, categories] = await Promise.all([
    getCachedProducts(),
    getCachedCategories()
  ]);

  return (
    <main className="mx-auto w-full max-w-[1700px] px-3 sm:px-5 lg:px-8 py-5 sm:py-8 lg:py-10 min-h-screen bg-slate-50/50">
      
      {/* Sleek, Modern Section Header */}
      <div className="mb-5 sm:mb-8 pb-4 sm:pb-5 border-b border-gray-200/80 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 l">
            Product Catalogue
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1.5">
            Explore our real-time wholesale dealership inventory layers.
          </p>
        </div>
        
        <div className="self-start sm:self-center px-3 py-1.5 text-[11px] sm:px-4 sm:py-2 sm:text-xs bg-white rounded-xl border border-gray-200 font-bold text-gray-600 shadow-sm">
          📊 {products.length} Total Products
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
          <span className="text-4xl block mb-3">📦</span>
          <h3 className="font-bold text-slate-800 text-base">No products available</h3>
          <p className="text-xs text-gray-400 mt-1">Please log into the admin desk to publish inventory assets.</p>
        </div>
      ) : (
        /* 🚀 New interactive filtering layer passing properties cleanly downstream */
        <CatalogueFilterWrapper products={products} categories={categories} />
      )}
    </main>
  );
}
