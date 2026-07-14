import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  return (
     <div className="
        grid
        grid-cols-2
        gap-3

        sm:grid-cols-2
        sm:gap-4

        md:grid-cols-3

        lg:grid-cols-4
        lg:gap-5

        xl:grid-cols-5

        2xl:grid-cols-6
        ">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );   
}
