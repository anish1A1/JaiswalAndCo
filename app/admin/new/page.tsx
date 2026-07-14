import { getCachedCategories } from '@/lib/products'
import NewProductFormClient from './NewProductFormClient'

// Keep this component as a Server Component to fetch data securely on startup
export default async function NewProductPage() {
  // Fetch real categories directly from Redis (via Next.js cache)
  const categories = await getCachedCategories()

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8 flex items-center justify-center pb-24 md:pb-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-8">
        
        <div className="flex items-center gap-3 mb-6">
          <a href="/admin" className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs sm:text-sm transition">
            ⬅️ Dashboard
          </a>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Add Product</h1>
            <p className="text-xs text-gray-500">Add an item to JS Foods inventory</p>
          </div>
        </div>

        {/* Pass the dynamic categories database array into the Client Form component below */}
        <NewProductFormClient categories={categories} />

      </div>
    </div>
  )
}
