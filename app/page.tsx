import { redis } from '@/lib/redis'
import Image from 'next/image'
import { getCachedProducts } from '@/lib/products' 





export default async function HomePage() {
  const products = await getCachedProducts()

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8 max-w-7xl mx-auto w-full pb-24">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">JS Foods Store</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">Browse our premium catalog</p>
      </header>

      {products.length === 0 ? (
        <p className="text-gray-400 text-sm">No products available at the moment.</p>
      ) : (
        /* Mobile-First Grid: 1 column on phone, 2 on tablet, 3 on small laptop, 4 on desktop */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between p-4">
              
              {/* Product Layout Image Card */}
              <div className="relative w-full aspect-square bg-slate-100 rounded-xl overflow-hidden mb-4 flex items-center justify-center text-3xl">
                📦 {/* Replace with <Image /> tag when you mount live images */}
              </div>

              <div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="font-extrabold text-gray-900 text-base mt-2 line-clamp-2 min-h-12">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1 font-medium">Weight: {product.weight}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Price</p>
                  <p className="text-lg font-black text-slate-900">${Number(product.mrp).toFixed(2)}</p>
                </div>
                
                {/* Thumb-friendly mobile action button */}
                <button className="h-9 px-4 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-sm active:scale-[0.97] transition-all">
                  Buy Now
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </main>
  )
}
