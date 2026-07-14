import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  return (
     <div
      className="
        grid
        grid-cols-2         {/* 📱 Forces exactly 2 clean cards side-by-side on mobile view */}
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5      {/* 💻 Laptop view scales gracefully */}
        2xl:grid-cols-6
        gap-2               {/* 📱 Tight gap on mobile so cards fit screen padding */}
        sm:gap-6
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );   
}
