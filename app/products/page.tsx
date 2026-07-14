import { getCachedProducts, getCachedCategories } from "@/lib/products";
import CatalogueFilterWrapper from "@/components/CatalogueFilterWrapper";

export default async function ProductsPage() {
  // Concurrent asynchronous data extraction from memory cache layers
  const [products, categories] = await Promise.all([
    getCachedProducts(),
    getCachedCategories()
  ]);

  return (
    <main className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8 py-10 min-h-screen bg-slate-50/50">
      
      {/* Sleek, Modern Section Header */}
      <div className="mb-8 pb-5 border-b border-gray-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Product Catalogue
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1.5">
            Explore our real-time wholesale dealership inventory layers.
          </p>
        </div>
        
        <div className="self-start sm:self-center px-4 py-2 bg-white rounded-xl border border-gray-200 text-xs font-bold text-gray-600 shadow-sm">
          📊 {products.length} Total Skus
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
