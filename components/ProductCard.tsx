import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import ProductImageViewer from "./ProductImageViewer";

interface Product {
  id: string;
  name: string;
  weight: string;
  mrp: number;
  dealerRate: number;
  stockAvailable: number;
  image: string;
  brand: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <Card className="group overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Product Image */}
     {/* Product Image */}
<div className="relative aspect-square overflow-hidden bg-gray-100">
  <Image
    src={product.image}
    alt={product.name}
    fill
    className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
    priority={false}
  />

  {/* View Image Button */}
  <div className="absolute bottom-2 right-2 left-2">
    <ProductImageViewer
      image={product.image}
      name={product.name}
    />
  </div>
</div>


      {/* Content */}
      <div className="space-y-3 p-4">
        {/* Category */}
        <Badge className="rounded-full">
          {product.category}
        </Badge>

        {/* Product Name */}
        <div>
          <h2 className="line-clamp-2 text-base font-semibold">
            {product.name}
          </h2>

          <p className="text-sm text-muted-foreground">
            {product.brand}
          </p>
        </div>

        {/* Weight */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Weight
          </span>

          <span className="font-medium">
            {product.weight}
          </span>
        </div>

        {/* Price */}
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              MRP
            </span>

            <span className="font-semibold">
              Rs. {product.mrp}
            </span>
          </div>

          <div className="mt-1 flex justify-between">
            <span className="text-sm text-muted-foreground">
              Dealer
            </span>

            <span className="font-bold text-green-600">
              Rs. {product.dealerRate}
            </span>
          </div>
        </div>

        {/* Stock */}
        <div className="flex items-center justify-between rounded-lg border px-3 py-2">
          <span className="text-sm text-muted-foreground">
            Stock
          </span>

          <Badge
            variant={
              product.stockAvailable > 0
                ? "default"
                : "destructive"
            }
          >
            {product.stockAvailable > 0
              ? `${product.stockAvailable} Av`
              : "Out of Stock"}
          </Badge>
          
        </div>
      </div>
    </Card>
  );
}