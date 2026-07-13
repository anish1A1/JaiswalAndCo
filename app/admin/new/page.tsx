'use client'

import { useActionState } from 'react'
import { createProductAction } from '@/app/api/admin/products/actions'

export default function NewProductPage() {
  const [state, formAction, isPending] = useActionState(createProductAction, { success: false })

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8 flex items-center justify-center pb-24 md:pb-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-8">
        
        {/* Navigation Heading */}
        <div className="flex items-center gap-3 mb-6">
          <a href="/admin" className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs sm:text-sm transition">
            ⬅️ Dashboard
          </a>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Add Product</h1>
            <p className="text-xs text-gray-500">Add an item to JS Foods inventory</p>
          </div>
        </div>

        {/* State Validation Banner */}
        {state?.error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">
            ⚠️ {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-5">
          {/* 1. Product Name */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Product Title</label>
            <input name="name" type="text" required placeholder="Classic Mayonnaise" className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 focus:border-blue-500 transition-all" />
          </div>

          {/* 2-Column Responsive Layout Group (Brand and Category) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Brand Name</label>
              <input name="brand" type="text" required placeholder="JS Foods" className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 focus:border-blue-500 transition-all" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Category</label>
              <input name="category" type="text" required placeholder="Mayonnaise" className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 focus:border-blue-500 transition-all" />
            </div>
          </div>

          {/* 2-Column Layout Group (Weight and Stock Available) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Weight / Volume</label>
              <input name="weight" type="text" required placeholder="1 Kg" className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 focus:border-blue-500 transition-all" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Initial Stock Available</label>
              <input name="stockAvailable" type="number" required placeholder="35" className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 focus:border-blue-500 transition-all" />
            </div>
          </div>

          {/* 2-Column Layout Group (MRP and Dealer Rate) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">MRP (Selling Price)</label>
              <input name="mrp" type="number" step="0.01" required placeholder="260" className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 focus:border-blue-500 transition-all" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Dealer Rate</label>
              <input name="dealerRate" type="number" step="0.01" required placeholder="215" className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 focus:border-blue-500 transition-all" />
            </div>
          </div>

            <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Product Media Asset</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl bg-gray-50 hover:bg-gray-100 transition-all relative">
              <div className="space-y-1 text-center">
                <span className="text-2xl">📸</span>
                <div className="flex text-sm text-gray-600">
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
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading Media & Saving...
              </span>
            ) : (
              'Save Inventory Product'
            )}
          </button>
        </form>

      </div>
    </div>
  )
}
