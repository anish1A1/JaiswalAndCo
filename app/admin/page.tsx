import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { redis } from '@/lib/redis'
import { Product } from '@/types/product'

// Server Action to clear cookies and handle manual session sign-outs
async function handleLogout() {
  'use server'
  const cookieStore = await cookies()
  cookieStore.delete('admin_cookie')
  redirect('/')
}

// Optimized database fetch parsing all properties from Redis
async function getInventoryProducts(): Promise<Product[]> {
  try {
    const productIds = await redis.smembers('products:all')
    if (!productIds || productIds.length === 0) return []

    const pipeline = redis.pipeline()
    productIds.forEach((id) => pipeline.hgetall(`product:${id}`))
    const results = await pipeline.exec()

    // Sort with fallback handling for date boundaries
    return (results.filter(Boolean) as any[]).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
  } catch {
    return []
  }
}

export default async function AdminPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_cookie')?.value

  // Server-side route authorization gate
  if (session !== 'true') {
    redirect('/rejoin')
  }

  const products = await getInventoryProducts()
  
  // Calculate specific quick business analytical points
  const lowStockCount = products.filter(p => Number(p.stockAvailable) <= 10).length
  const totalStockItems = products.reduce((acc, p) => acc + Number(p.stockAvailable || 0), 0)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row pb-24 md:pb-0">
      
      {/* 1. LAPTOP DESKTOP SIDEBAR (Visible only on md screens up) */}
      <aside className="hidden md:flex w-64 bg-slate-900 text-white flex-col justify-between p-6 shrink-0 z-30">
        <div>
          <div className="mb-8">
            <h2 className="text-xl font-black tracking-wider text-blue-400">JS FOODS</h2>
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-0.5">Management Suite</p>
          </div>
          
          <nav className="space-y-1">
                <a href="/admin" className="flex items-center gap-3 py-2.5 px-4 rounded-xl bg-slate-800 text-white font-bold text-sm">
                    <span>📊</span> Dashboard Home
                </a>

                <a href="/admin/new" className="flex items-center gap-3 py-2.5 px-4 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white font-medium text-sm transition-all">
                    <span>➕</span> Create Product
                </a>
                
                <a href="/admin/categories" className="flex items-center gap-3 py-2.5 px-4 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white font-medium text-sm transition-all">
                    <span>🏷️</span> Manage Categories
                </a>
            </nav>

        </div>

        <form action={handleLogout}>
          <button type="submit" className="w-full text-left py-2.5 px-4 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white transition-all text-sm font-bold">
            🛑 Sign Out Panel
          </button>
        </form>
      </aside>

      {/* 2. MOBILE HEADER BAR (Visible only on small screens) */}
      <header className="md:hidden bg-slate-900 text-white px-5 py-4 flex justify-between items-center shadow-md sticky top-0 z-40">
        <div>
          <h2 className="text-base font-black tracking-wider text-blue-400">JS FOODS</h2>
        </div>
        <form action={handleLogout}>
          <button type="submit" className="text-xs bg-red-500/20 text-red-400 px-3 py-1.5 rounded-xl font-bold transition">
            Sign Out
          </button>
        </form>
      </header>

      {/* 3. MAIN WORKSPACE SCROLLBAR CONTAINER */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 max-w-7xl mx-auto w-full">
        
        {/* Dynamic Interactive Heading Row */}
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8 border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Inventory Console</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Manage stock availability and pricing matrix rows.</p>
          </div>
          
          {/* Thumb-friendly action trigger */}
          <a 
            href="/admin/new" 
            className="h-12 sm:h-11 px-5 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 hover:bg-blue-700 active:scale-[0.99] transition-all"
          >
            <span>➕</span> Create New Product
          </a>
        </section>

        {/* 4. METRICS ROW CARD GRIDS */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 md:mb-8">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Skus</p>
            <p className="text-xl sm:text-2xl font-black text-gray-900 mt-1">{products.length} Items</p>
          </div>
          
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Stock Units</p>
            <p className="text-xl sm:text-2xl font-black text-slate-800 mt-1">{totalStockItems}</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Stock Alerts</p>
            <p className={`text-xl sm:text-2xl font-black mt-1 ${lowStockCount > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
              {lowStockCount} Low
            </p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm col-span-2 lg:col-span-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Database Status</p>
            <p className="text-sm font-bold text-emerald-600 flex items-center gap-1.5 mt-2 bg-emerald-50 px-2.5 py-1 rounded-lg w-max border border-emerald-100">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Live Redis Hub
            </p>
          </div>
        </section>

        {/* 5. DATASET TABLE SECTION VIEW */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Database Inventory Collection</h3>

          {products.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-xl">
              <span className="text-3xl block mb-2">📦</span>
              <p className="text-sm font-bold text-gray-800">Your store database catalog is currently blank</p>
              <p className="text-xs text-gray-400 max-w-xs mx-auto mt-1">Tap the button above to seed or insert products securely via Vercel Blob and Upstash Redis.</p>
            </div>
          ) : (
            /* Responsive Grid System (Stacked cards on mobile, grid columns on desktop) */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex flex-col justify-between hover:border-gray-200 transition-all">
                  <div>
                    {/* Media Image Rendering Core Layout Element */}
                    <div className="w-full h-36 relative bg-white border border-gray-200 rounded-xl overflow-hidden mb-3 flex items-center justify-center">
                      {/* Using standard HTML img tag for zero-configuration image scaling wrapper */}
                      <img 
                        src={product.image || "/products/placeholder.png"} 
                        alt={product.name}
                        className="w-full h-full object-contain p-2"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {product.category}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 bg-gray-200/50 px-1.5 py-0.5 rounded">
                        {product.weight}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-gray-900 text-sm mt-2 line-clamp-1">{product.name}</h4>
                    <p className="text-xs font-semibold text-gray-400 mt-0.5">Brand: {product.brand}</p>
                    
                    {/* Price and Rate Breakdowns */}
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-gray-200/60">
                      <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">MRP Price</p>
                        <p className="text-sm font-black text-slate-900">Rs. {Number(product.mrp).toFixed(2)}</p>
                      </div>
                      {/* <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">Dealer Rate</p>
                        <p className="text-sm font-black text-blue-600">₹{Number(product.dealerRate).toFixed(2)}</p>
                      </div> */}
                    </div>
                  </div>

                  {/* Stock tracking indicator element */}
                  <div className="mt-4 pt-2 border-t border-gray-200/40 flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-medium">Stock:</span>
                    <span className={`font-black ${Number(product.stockAvailable) <= 10 ? 'text-amber-600' : 'text-gray-900'}`}>
                      {product.stockAvailable} units available
                    </span>
                  </div>
                  
                  {/* Action Control Panel (Delete Functionality) */}
                  <div className="mt-3 pt-2.5 border-t border-gray-200/60 flex gap-2">
                    <form action={async () => {
                      'use server'
                      const { redis } = await import('@/lib/redis')
                      const { revalidateTag } = await import('next/cache')
                      
                      // Remove individual product hash mapping
                      await redis.del(`product:${product.id}`)
                      // Remove reference key from catalog listing index
                      await redis.srem('products:all', product.id)
                      // Broadcast structural synchronization across data components
                      revalidateTag('products-list', {expire:0})
                    }} className="w-full">
                      <button 
                        type="submit"
                        className="w-full h-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 active:scale-[0.98] text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        🗑️ Delete Product
                      </button>
                    </form>
                  </div>

                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* 6. MOBILE STICKY BOTTOM NAVIGATION BAR (Visible only on Mobile touch screens) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] flex justify-around items-center h-16 z-40">
        
        <a href="/admin" className="flex flex-col items-center justify-center text-blue-600 flex-1 h-full py-1">
            <span className="text-xl">📊</span>
            <span className="text-[10px] font-black mt-0.5">Dashboard</span>
        </a>

        <a href="/admin/new" className="flex flex-col items-center justify-center text-gray-400 hover:text-slate-700 flex-1 h-full py-1">
            <span className="text-xl">➕</span>
            <span className="text-[10px] font-medium mt-0.5">New Product</span>
        </a>
        {/* 👇 ADD THIS BOTTOM BAR LINK */}
        <a href="/admin/categories" className="flex flex-col items-center justify-center text-gray-400 hover:text-slate-700 flex-1 h-full py-1">
            <span className="text-xl">🏷️</span>
            <span className="text-[10px] font-medium mt-0.5">Categories</span>
        </a>
    </nav>


    </div>
  )
}
