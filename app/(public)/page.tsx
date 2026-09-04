import { getCachedProducts } from '@/lib/products' 

export default async function HomePage() {

   const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WholesaleStore",
    "name": "Jaiswal Kirana & Co Dealers",
    "url": "https://jaiswalandcodealers.vercel.app/",
    "priceRange": "Rs.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dharan", 
      "addressRegion": "Koshi Province", 
      "addressCountry": "NP"
    }
  };

  const products = await getCachedProducts()


  return (
    <>
     {/* Injecting Structured Location Schema for Google Bot Detection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
    <main className="min-h-screen bg-[#F8F7F3] max-w-7xl mx-auto w-full pb-24 px-4 sm:px-8">
      
      {/* Hero Welcome Banner Section */}
      <header className="py-12 sm:py-20 text-center flex flex-col items-center justify-center border-b border-[#E7E5DF] mb-10">
        <span className="text-4xl sm:text-5xl mb-4 animate-bounce">🛒</span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#173B2B] tracking-tight max-w-2xl leading-[1.05]">
          JS Foods Store
        </h1>
        <p className="text-sm sm:text-base text-[#6B746E] mt-4 max-w-lg font-medium px-4 leading-relaxed">
          Discover our premium selection of quality ingredients and wholesale dealership inventory items.
        </p>
        
        {/* 🛠️ UPGRADED: Side-by-Side Responsive Button Grid */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-4 sm:px-0">
          {/* Smooth-Scroll Anchored Button */}
          <a 
            href="#catalog-section"
            className="h-12 px-6 bg-[#1F5C3A] hover:bg-[#174A2E] text-white font-bold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            Browse Our Products 🔎
          </a>

          {/* New Navigate/Full Catalog Trigger Button */}
          <a 
            href="/products"
            className="h-12 px-6 bg-white hover:bg-[#F1F3EE] text-[#1F5C3A] border border-[#D9DED8] font-bold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            Browse All Products 📋
          </a>
        </div>
      </header>

      {/* Catalog Anchor Point */}
      <section id="catalog-section" className="scroll-mt-6">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-[#173B2B] tracking-tight">
            Premium Catalog
          </h2>
          <p className="text-xs text-[#89918B] font-semibold">
            {products.length} items available
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#E6E8E3] rounded-2xl p-6 shadow-sm">
            <span className="text-3xl block mb-2">📦</span>
            <p className="text-sm font-bold text-[#89918B]">
              No products available at the moment.
            </p>
          </div>
        ) : (
          /* Mobile-First Grid: 1 column on phone, 2 on tablet, 3 on small laptop, 4 on desktop */
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl border border-[#E6E8E3] shadow-[0_2px_10px_rgba(23,59,43,0.05)] overflow-hidden flex flex-col justify-between p-3 sm:p-4 hover:shadow-[0_8px_24px_rgba(23,59,43,0.10)] hover:-translate-y-0.5 transition-all duration-300 group">
                
                {/* Product Layout Image Card */}
                <div className="relative w-full aspect-square bg-[#F5F6F1] border border-[#ECEDE8] rounded-xl overflow-hidden mb-4 flex items-center justify-center p-3 sm:p-4">
                  <img 
                    src={product.image || "/products/placeholder.png"} 
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-[1.04] transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <div>
                  <span className="text-[9px] font-bold text-[#1F5C3A] bg-[#EAF3ED] px-2 py-1 rounded-md uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="font-extrabold text-[#202722] text-sm sm:text-base mt-2 line-clamp-2 min-h-12 tracking-tight leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#7B847D] mt-1 font-semibold">Weight: {product.weight}</p>
                  <p className="text-[11px] text-[#949B95] font-medium">Brand: {product.brand}</p>
                </div>

                {/* Updated Price & Action Matrix (Hides Dealer Price elegantly with perfect alignment) */}
                <div className="mt-4 pt-3 border-t border-[#ECEDE8] flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-bold text-[#8A928B] uppercase tracking-tight">
                      Maximum Retail Price
                    </p>
                    <p className="text-base sm:text-lg font-black text-[#173B2B] tracking-tight">
                      Rs. {Number(product.mrp).toFixed(0)}
                    </p>
                  </div>

                  {/* 🎯 New Visual Anchor: Mobile-first compact button that replaces the empty dealer rate space */}
                  <button className="h-8 px-3.5 rounded-lg bg-[#1F5C3A] text-white text-[11px] font-bold shadow-sm hover:bg-[#174A2E] active:scale-[0.97] transition-all flex items-center justify-center gap-1">
                   📦
                  </button>
                </div>


              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  </>
  )
}
