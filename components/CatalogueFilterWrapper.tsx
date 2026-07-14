'use client'

import { useState } from 'react'
import ProductGrid from './ProductGrid';
import { Product } from "@/types/product"

interface Props {
  products: Product[];
  categories: string[];
}

export default function CatalogueFilterWrapper({ products, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  // Filter dataset down matching string criteria comparisons securely
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category?.toLowerCase() === selectedCategory.toLowerCase())

  return (
    <div className="space-y-8">
      
      {/* 🏷️ Horizontal Category Filter Pills (Scrollable on small viewports) */}
      <div className="w-full">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">
          Filter by Category
        </p>
        
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none snap-x">
          {/* 'All' Selection Pill */}
          <button
            onClick={() => setSelectedCategory('All')}
            className={`h-9 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all snap-start shadow-sm border ${
              selectedCategory === 'All'
                ? "bg-slate-900 border-slate-900 text-white"
                : "bg-white border-gray-200 text-slate-600 hover:bg-gray-50 active:scale-[0.98]"
            }`}
          >
            All Products ({products.length})
          </button>

          {/* Dynamic Database Category Filter Iterations */}
          {categories.map((cat) => {
            const count = products.filter(p => p.category?.toLowerCase() === cat.toLowerCase()).length
            
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`h-9 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all snap-start shadow-sm border ${
                  selectedCategory === cat
                    ? "bg-slate-900 border-slate-900 text-white"
                    : "bg-white border-gray-200 text-slate-600 hover:bg-gray-50 active:scale-[0.98]"
                }`}
              >
                {cat} <span className={`text-[10px] ml-0.5 ${selectedCategory === cat ? 'text-slate-300' : 'text-gray-400'}`}>({count})</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 📦 Dynamic Filtered Layout Output */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-200/60 rounded-3xl p-6 shadow-inner">
          <span className="text-3xl block mb-2">🔍</span>
          <h3 className="font-bold text-slate-700 text-sm">No items matching criteria</h3>
          <p className="text-xs text-gray-400 mt-0.5">There are currently no active SKUs assigned to the &quot;{selectedCategory}&quot; category node.</p>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}

    </div>
  )
}
