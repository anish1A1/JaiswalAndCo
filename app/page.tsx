import { redis } from '@/lib/redis'
import Image from 'next/image'
import { getCachedProducts } from '@/lib/products' 

export default async function HomePage() {
  const products = await getCachedProducts()

  return (
    <main className="min-h-screen bg-slate-50 max-w-7xl mx-auto w-full pb-24 px-4 sm:px-8">
      
      {/* Hero Welcome Banner Section */}
      <header className="py-12 sm:py-20 text-center flex flex-col items-center justify-center border-b border-gray-200 mb-10">
        <span className="text-4xl sm:text-5xl mb-4 animate-bounce">🛒</span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight max-w-2xl leading-none">
          JS Foods Store
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-3 max-w-md font-medium px-4">
          Discover our premium selection of quality ingredients and wholesale dealership inventory items.
        </p>
        
        {/* 🛠️ UPGRADED: Side-by-Side Responsive Button Grid */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-4 sm:px-0">
          {/* Smooth-Scroll Anchored Button */}
          <a 
            href="#catalog-section"
            className="h-12 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            Browse Our Products 🔎
          </a>

          {/* New Navigate/Full Catalog Trigger Button */}
          <a 
            href="/products"
            className="h-12 px-6 bg-white hover:bg-gray-100 text-slate-900 border border-gray-300 font-bold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            Browse All Products 📋
          </a>
        </div>
      </header>

      {/* Catalog Anchor Point */}
      <section id="catalog-section" className="scroll-mt-6">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Premium Catalog</h2>
          <p className="text-xs text-gray-400 font-semibold">{products.length} items available</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl p-6">
            <span className="text-3xl block mb-2">📦</span>
            <p className="text-sm font-bold text-gray-400">No products available at the moment.</p>
          </div>
        ) : (
          /* Mobile-First Grid: 1 column on phone, 2 on tablet, 3 on small laptop, 4 on desktop */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between p-4 hover:shadow-md transition-all group">
                
                {/* Product Layout Image Card */}
                <div className="relative w-full aspect-square bg-slate-50 border border-gray-100 rounded-xl overflow-hidden mb-4 flex items-center justify-center p-3">
                  <img 
                    src={product.image || "/products/placeholder.png"} 
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-[1.02] transition-all duration-300"
                    loading="lazy"
                  />
                </div>

                <div>
                  <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="font-extrabold text-gray-900 text-base mt-2 line-clamp-2 min-h-12 tracking-tight leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 font-semibold">Weight: {product.weight}</p>
                  <p className="text-[11px] text-gray-400 font-medium">Brand: {product.brand}</p>
                </div>

                {/* Price Matrix Display Section */}
                <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">MRP Price</p>
                    <p className="text-base font-black text-slate-900">₹{Number(product.mrp).toFixed(2)}</p>
                  </div>

                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">Dealer Rate</p>
                    <p className="text-base font-black text-blue-600">₹{Number(product.dealerRate).toFixed(2)}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
