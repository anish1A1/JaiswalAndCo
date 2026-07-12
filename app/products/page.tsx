import ProductGrid from "@/components/ProductGrid";
import Image from "next/image";

const products = [
  {
    id: "1",
    name: "Classic Mayonnaise fooodland jasjsa jnasns ",
    weight: "1 Kg",
    mrp: 260,
    dealerRate: 215,
    stockAvailable: 35,
    image: "/products/mayo.png",
    brand: "JS Foods",
    category: "Mayonnaise",
  },
  {
    id: "2",
    name: "Tomato Ketchup",
    weight: "500 gm",
    mrp: 180,
    dealerRate: 145,
    stockAvailable: 18,
    image: "/products/ketchup.png",
    brand: "JS Foods",
    category: "Sauce",
  },
];

export default function ProductCard() {
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