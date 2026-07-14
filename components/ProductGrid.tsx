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
        grid-cols-1
        xs:grid-cols-2
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5      {/* 💻 Laptop sizes can display 5 columns cleanly */}
        2xl:grid-cols-6     {/* 🖥️ Large desktop screens will use 6 columns */}
        gap-4
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
