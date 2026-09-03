'use client'

import { useState } from 'react'
import ProductGrid from "./ProductGrid"
import { Product } from "@/types/product"

interface Props {
  products: Product[];
  categories: string[];
}

export default function CatalogueFilterWrapper({ products, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  // Filter products by category safely
  const filteredProducts = selectedCategory === 'All'
    ? products.sort()
    : products.filter(product => product.category?.toLowerCase() === selectedCategory.toLowerCase())

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 w-full max-w-full overflow-hidden">
      
      {/* 🏷️ Horizontal Category Filter Pills (Mobile Swipe Optimized) */}
      <div className="w-full block">
        <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 px-1 sm:px-0">
          Filter by Category
        </p>
        
        {/* Container creates an edge-to-edge swiping channel on tiny mobile phone frames */}
        <div className="w-full overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none touch-pan-x">
          <div className="flex flex-row flex-nowrap items-center gap-2 w-max min-w-full pr-4 sm:pr-0">
            
            {/* 'All' Selection Pill */}
            <button
              onClick={() => setSelectedCategory('All')}
              className={`h-8 sm:h-10 px-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all border inline-flex items-center justify-center ${
                selectedCategory === 'All'
                  ? "bg-slate-900 border-slate-900 text-white"
                  : "bg-white border-gray-200 text-slate-600 hover:bg-gray-50 active:scale-[0.97]"
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
                  className={`h-10 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-xs border inline-flex items-center justify-center ${
                    selectedCategory === cat
                      ? "bg-slate-900 border-slate-900 text-white"
                      : "bg-white border-gray-200 text-slate-600 hover:bg-gray-50 active:scale-[0.97]"
                  }`}
                >
                  {cat} 
                  <span className={`text-[9px] sm:text-[10px] ml-1.5 px-1 sm:px-1.5 py-0.5 rounded-md font-mono ${
                    selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-100 text-gray-400'
                  }`}>
                    {count}
                  </span>
                </button>
              )
            })}

          </div>
        </div>
      </div>

      {/* 📦 Dynamic Filtered Output Grid Layout */}
      <div className="w-full">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs mx-1 sm:mx-0">
            <span className="text-3xl block mb-2">🔍</span>
            <h3 className="font-bold text-slate-700 text-sm">No items matching criteria</h3>
            <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto leading-relaxed">
              There are currently no active items assigned to the &quot;{selectedCategory}&quot; layout node.
            </p>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </div>

    </div>
  )
}
