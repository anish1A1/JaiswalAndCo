'use client'

import { useActionState, useEffect, useRef } from 'react'
import { ActionResponse } from '@/app/api/admin/category/action' 

export default function CategoryFormClient({ action }: { action: (prevState: any, formData: FormData) => Promise<ActionResponse> }) {
  const [state, formAction, isPending] = useActionState(action, { success: false })
  const formRef = useRef<HTMLFormElement>(null)

  // Automatically reset the input text field when the category is added successfully
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      {state?.error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">
          ⚠️ {state.error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input 
            name="name" 
            type="text" 
            required 
            disabled={isPending}
            placeholder="e.g. Beverages, Sauces, Mayonnaise" 
            className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 focus:border-blue-500 transition-all disabled:opacity-60" 
          />
        </div>
        
        <button
          type="submit"
          disabled={isPending}
          className="h-11 px-6 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-md hover:bg-slate-800 active:scale-[0.99] transition-all disabled:opacity-50 shrink-0 flex items-center justify-center"
        >
          {isPending ? 'Saving...' : 'Add Collection'}
        </button>
      </div>
    </form>
  )
}
