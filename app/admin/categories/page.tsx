import { getCachedCategories } from '@/lib/products'
import { createCategoryAction } from '@/app/api/admin/category/action' 
import CategoryFormClient from './CategoryFormClient'
import Link from 'next/link'

export default async function ManageCategoriesPage() {
  

  // Fetch live categories from Redis using your cached helper
  const categories = await getCachedCategories()

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-start pb-24 md:pb-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-8 space-y-8">
        
        {/* Navigation Heading */}
        <div className="flex items-center gap-3 border-b pb-4">
          <Link href="/admin" className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs sm:text-sm transition">
            ⬅️ Dashboard
          </Link>
          
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Product Categories</h1>
            <p className="text-xs text-gray-500">Configure global tags used for stock filtering</p>
          </div>
        </div>

        {/* 1. Category Submission Form (Client Interactive Component) */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Add New Category</h3>
          <CategoryFormClient action={createCategoryAction} />
        </div>

        {/* 2. Active Categories Data List */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Active Database Collections ({categories.length})</h3>
          
          {categories.length === 0 ? (
            <p className="text-sm text-gray-400 font-medium py-4 text-center bg-gray-50 rounded-xl border border-dashed">
              No categories registered yet. Fill out the form above to add one.
            </p>
          ) : (
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl bg-gray-50 overflow-hidden shadow-sm">
              {categories.map((cat, index) => (
                <div key={cat} className="flex justify-between items-center p-3.5 bg-white hover:bg-gray-50/80 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-300 font-mono">#{index + 1}</span>
                    <span className="font-bold text-gray-900 text-sm tracking-tight">{cat}</span>
                  </div>
                  
                  {/* Visual helper badge */}
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Ready
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
