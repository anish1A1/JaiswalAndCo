'use server'

import { redis } from "@/lib/redis"
import { revalidateTag, updateTag } from "next/cache"

export interface ActionResponse {
  success: boolean;
  error?: string;
}

export async function createCategoryAction(prevData: any, formData: FormData): Promise<ActionResponse> {
  const name = formData.get('name') as string

  if (!name || name.trim().length === 0) {
    return { success: false, error: 'Category name cannot be empty.' }
  }

  // 2. Add an explicit log to debug exactly what the server sees
  console.log("SERVER RECEIVED VALUE:", name)

  // Format nicely (e.g., "mayonnaise" -> "Mayonnaise")
  const formattedName = name.trim().charAt(0).toUpperCase() + name.trim().slice(1)

  try {
    // SADD adds the string to a set. If it already exists, Redis ignores it automatically.
    await redis.sadd('categories:all', formattedName)
    
    // Flush data caches tagged with 'categories-list'
    updateTag('categories-list')
    
    return { success: true }
  } catch (error) {
    console.error("REDIS ERROR:", error)
    return { success: false, error: 'Failed to save category to database.' }
  }
}
