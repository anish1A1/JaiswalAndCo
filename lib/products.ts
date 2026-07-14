
import { unstable_cache } from "next/cache"
import { redis } from "./redis"
import { Product } from "@/types/product"

export const getCachedProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const productIds = await redis.smembers('products:all')
    if (!productIds || productIds.length === 0) return []

    const pipeline = redis.pipeline()
    productIds.forEach((id) => pipeline.hgetall(`product:${id}`))
    const results = await pipeline.exec()

    return (results.filter(Boolean) as any[]).sort((a, b) => b.createdAt - a.createdAt)
  },
  ['all-products-key'], // Internal cache key
  { tags: ['products-list'] } // 👈 This matches your revalidateTag('products-list')!
)


// To display the categories or feed them into your dropdown menus efficiently, add a centralized cached fetcher file

export const getCachedCategories = unstable_cache(
  async (): Promise<string[]> => {

    const categories = await redis.smembers('categories:all')

    console.log('From categories',categories)
    if(!categories) return []

    // Sort alphabetically for clean UI listings
    return categories.sort()    
    
    },
    ['all-categories-key'],
 // 💡 Add revalidate option to prevent infinite browser caching while debugging
  { tags: ['categories-list'], revalidate: 1 } 
)
