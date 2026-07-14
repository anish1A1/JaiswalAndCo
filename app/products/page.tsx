import ProductGrid from "@/components/ProductGrid";
import Image from "next/image";
import { getCachedProducts } from "@/lib/products";

export default async function ProductCard() {
    const products = await getCachedProducts()
  return (
    <main className="mx-auto max-w-7xl p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Product Catalogue
        </h1>

        <p className="text-muted-foreground">
          Browse all available products
        </p>
      </div>

      <ProductGrid products={products} />
    </main>
  );
}