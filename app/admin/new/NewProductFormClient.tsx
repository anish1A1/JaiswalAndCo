'use client'

import { useActionState, useState } from 'react'
import { createProductAction } from '@/app/api/admin/products/actions'
import imageCompression from 'browser-image-compression'

export default function NewProductFormClient({ categories }: { categories: string[] }) {
  const [state, formAction, isPending] = useActionState(createProductAction, { success: false })

  const [compressedFile, setCompressedFile] = useState<File | null>(null)
  const [compressedLoading, setCompressedLoading] = useState(false)
  const [localError, setLocalError] = useState('')


  // Handle mobile image interception and client-side compression
  const handleImageChange = async(e: React.ChangeEvent<HTMLInputElement>) =>{
    const file = e.target.files?.[0]
    if(!file) return

    setLocalError('')
    setCompressedLoading(true)

     // Config options to bring raw 12MB phone camera images down under 1MB
    const options = {
      maxSizeMB: 0.8,          // Compress to under 800KB
      maxWidthOrHeight: 1200,  // Standard clean product card resolution
      useWebWorker: true,
      fileType: 'image/webp'   // WebP is highly optimized for fast loading
    }
    try {
        const output = await imageCompression(file, options)
        // convert back to a clean file mapping

        const finalFile = new File([output], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
        type: "image/webp"
      })
      setCompressedFile(finalFile)
    } catch (error) {
        setLocalError('Failed to process image. Try a different file.')
    } finally{
        setCompressedLoading(false)
    }
  }

  // Intercept form submission to swap the heavy image with our compressed one

  const handleSubmitWrapper = (formData: FormData) => {

    if(!compressedFile) {
        setLocalError('Please upload a product image.')
        return
    }
    // Delete the original raw input image  from the form payload
    formData.delete('image')

    // Append our compressed mobile file safely under 1MB limit
    formData.append('image', compressedFile)

    formAction(formData)

  }



  return (
    <form action={handleSubmitWrapper} className="space-y-5">
      {(state?.error || localError) && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">
          ⚠️ {state.error || localError}
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
            <span className="text-2xl">
                {compressedLoading ? '🔄' : compressedFile ? '✅' : '📸'}
            </span>
            <div className="flex text-sm text-gray-600 justify-center">
              <label className="relative cursor-pointer font-bold text-blue-600 focus-within:outline-none hover:text-blue-500">
                <span>{compressedFile ? 'Change Photo' :'Upload a product file'}</span>
                <input name="image" type="file" accept="image/*" onChange={handleImageChange} disabled ={compressedLoading} className="sr-only" />
                  </label>
                </div>
            <p className="text-xs text-gray-400">
              {compressedLoading ? 'Optimizing image for server...' : compressedFile ? `Ready (${(compressedFile.size / 1024).toFixed(0)} KB)` : 'PNG, JPG, WEBP up to 10MB'}
            </p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending || compressedLoading}
        className="w-full h-12 mt-2 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-md shadow-blue-500/10 hover:bg-blue-700 active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center"
      >
        {isPending ? 'Uploading Media & Saving...' : 'Save Inventory Product'}
      </button>
    </form>
  )
}
