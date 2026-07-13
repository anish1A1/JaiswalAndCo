'use server'

import { redis } from "@/lib/redis"
import { revalidateTag, updateTag } from "next/cache"
import { redirect } from "next/navigation"
import { put } from "@vercel/blob"
export interface ActionResponse {
  success: boolean;
  error?: string;
}

export async function createProductAction(prevData: any, formData: FormData): Promise<ActionResponse> {
  // 1. Gather all incoming data fields from your form
    const name = formData.get('name') as string
    const weight = formData.get('weight') as string
    const mrpInput = formData.get('mrp') as string
    const dealerRateInput = formData.get('dealerRate') as string
    const stockAvailableInput = formData.get('stockAvailable') as string
    const image = formData.get('image') as string || "/products/placeholder.png" // Fallback fallback string
    const brand = formData.get('brand') as string
    const category = formData.get('category') as string

    const imageFile = formData.get('image') as File | null


    // 2. Strict validation check for empty parameters
    if (!name || !weight || !mrpInput || !dealerRateInput || !stockAvailableInput || !brand || !category) {
        return { success: false, error: 'All fields are strictly required.' }
    }


    // 3. Convert numeric elements from strings to numbers
    const mrp = parseFloat(mrpInput)
    const dealerRate = parseFloat(dealerRateInput)
    const stockAvailable = parseInt(stockAvailableInput, 10)

    // 4. Verify structural math checks
    if (isNaN(mrp) || mrp <= 0) return { success: false, error: 'Provide a valid MRP.' }
    if (isNaN(dealerRate) || dealerRate <= 0) return { success: false, error: 'Provide a valid Dealer Rate.' }
    if (isNaN(stockAvailable) || stockAvailable < 0) return { success: false, error: 'Provide a valid Stock Count.' }

    // Ensuring an image was uploaded and it actually contains data
    if (!imageFile || imageFile.size === 0) {
        return { success: false, error: 'Please upload a valid product image file.' }
    }
    let imageUrl = ""

    try {

        // 1. Stream file data directly to Vercel Blob storage
        const blob = await put(`products/${crypto.randomUUID()}-${imageFile.name}`, imageFile, {
        access: 'public',
        })
        imageUrl = blob.url // This provides your public URL string

        // Generate a unique dynamic ID for this Redis Key structure
        const productId = crypto.randomUUID()
        const productKey = `product:${productId}`

        // 5. Structure payload neatly inside your Upstash Hash Map database layout
        await redis.hset(productKey, {
        id: productId,
        name: name.trim(),
        weight: weight.trim(),
        mrp: mrp,
        dealerRate: dealerRate,
        stockAvailable: stockAvailable,
        image: imageUrl,
        brand: brand.trim(),
        category: category.trim(),
        createdAt: Date.now()
        })

        // 6. Track the product reference ID inside your listing collection Set
        await redis.sadd('products:all', productId)

        // 7. Flush Next.js 16 data fetch cache layers
        updateTag('products-list')

    } catch (error) {
        return { success: false, error: 'Database transaction failed.' }
    }

    // Dynamic dashboard redirection after completing database commit
    redirect('/admin')
}
