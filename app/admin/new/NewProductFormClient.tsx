'use client'

import { useActionState } from 'react'
import { createProductAction } from '@/app/api/admin/products/actions'

export default function NewProductFormClient({ categories }: { categories: string[] }) {
  const [state, formAction, isPending] = useActionState(createProductAction, { success: false })

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">
          ⚠️ {state.error}
        </div>
      )}

      {/* Product Title */}
      <div>
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Product Title</label>
        <input name="name" type="text" required placeholder="Classic Mayonnaise" className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 focus:border-blue-500 transition-all" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Brand Name */}
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Brand Name</label>
          <input name="brand" type="text" required placeholder="JS Foods" className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 focus:border-blue-500 transition-all" />
        </div>

        {/* 💡 UPGRADED CATEGORY SELECT DROPDOWN */}
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Category</label>
          {categories.length === 0 ? (
            <div className="text-xs text-amber-600 mt-2 font-medium">
              ⚠️ No categories found. Please create a category first.
            </div>
          ) : (
            <select 
              name="category" 
              required
              className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 focus:border-blue-500 transition-all"
            >
              <option value="">Select a Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Weight */}
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Weight / Volume</label>
          <input name="weight" type="text" required placeholder="1 Kg" className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 focus:border-blue-500 transition-all" />
        </div>
        {/* Stock */}
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Initial Stock Available</label>
          <input name="stockAvailable" type="number" required placeholder="35" className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 focus:border-blue-500 transition-all" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* MRP */}
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">MRP (Selling Price)</label>
          <input name="mrp" type="number" step="0.01" required placeholder="260" className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 focus:border-blue-500 transition-all" />
        </div>
        {/* Dealer Rate */}
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Dealer Rate</label>
          <input name="dealerRate" type="number" step="0.01" required placeholder="215" className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 focus:border-blue-500 transition-all" />
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Product Media Asset</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl bg-gray-50 hover:bg-gray-100 transition-all relative">
          <div className="space-y-1 text-center">
            <span className="text-2xl">📸</span>
            <div className="flex text-sm text-gray-600 justify-center">
              <label className="relative cursor-pointer font-bold text-blue-600 focus-within:outline-none hover:text-blue-500">
                <span>Upload a product file</span>
                <input name="image" type="file" required accept="image/*" className="sr-only" />
                  </label>
                </div>
            <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 4MB</p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full h-12 mt-2 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-md shadow-blue-500/10 hover:bg-blue-700 active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center"
      >
        {isPending ? 'Uploading Media & Saving...' : 'Save Inventory Product'}
      </button>
    </form>
  )
}
