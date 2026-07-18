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

export default function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = Number(product.stockAvailable) <= 0;

  return (
    <Card className="group overflow-hidden rounded-xl border border-gray-200/70 bg-white p-0 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
      
      {/* 1. Image Container (Highly Optimized for Small Mobile Viewports) */}
      <div className="relative h-24 sm:h-36 md:h-44 w-full bg-slate-50 border-b border-gray-100 flex items-center justify-center p-1 sm:p-2">
        <img
          src={product.image || "/products/placeholder.png"}
          alt={product.name}
          className="
            max-w-[92%]
            max-h-[92%]
            object-contain
            transition-transform
            duration-300
            group-hover:scale-105
            "
          loading="lazy"
        />

        {/* Small Tightly Positioned Category Badge */}
        <div className="absolute top-1 left-1 z-10">
          <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-wider bg-slate-900/90 text-white px-1 py-0.5 rounded-md shadow-xs">
            {product.category}
          </span>
        </div>

        {/* Mobile-Friendly Zoom Overlay Handler */}
        <div className="absolute bottom-1 right-1 z-20 scale-85 sm:scale-100">
          <ProductImageViewer
            image={product.image}
            name={product.name}
          />
        </div>
      </div>

      {/* 2. Content & Textual Metadata Blocks */}
      <div className="p-2 sm:p-4 space-y-2 flex-1 flex flex-col justify-between">
        
        <div className="space-y-0.5">
          <p className="text-[8px] sm:text-[10px] font-bold text-blue-600 uppercase tracking-tight">
            {product.brand}
          </p>
          <h3 className="line-clamp-2 text-[11px] sm:text-sm font-extrabold text-slate-800 tracking-tight leading-tight sm:min-h-10 min-h-8.5">
            {product.name}
          </h3>
        </div>

        {/* Compact Net Contents Descriptor */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs border-y border-gray-100 py-1.5">
          <span className="text-gray-400 font-medium">Weight</span>
          <span className="font-bold text-slate-600 bg-gray-100 px-1.5 py-0.5 rounded-sm scale-90 sm:scale-100">
            {product.weight}
          </span>
        </div>

        {/* Pricing Matrix Setup (Compact & Read-Optimized for Mobile) */}
        <div className="rounded-lg sm:rounded-2xl border border-gray-100 bg-slate-50/60 p-2 sm:p-3 space-y-0.5 sm:space-y-1.5">

          <div className="flex justify-between items-center border-gray-200/50">
            <span className="text-[10px] sm:text-xs text-slate-500 font-bold">MRP</span>
            <span className="text-xs  sm:text-lg font-black text-emerald-600 tracking-tight">
              Rs. {Number(product.mrp).toFixed(0)}
            </span>
          </div>
        </div>

        {/* Stock Alerts Display Strip */}
        <div className="flex items-center justify-between text-[9px] sm:text-xs pt-0.5">
          <span className="text-gray-400 font-medium">Availability</span>
          <span className={`font-black uppercase text-[9px] sm:text-[10px] tracking-wide px-1.5 py-0.5 rounded-md border ${
            isOutOfStock 
              ? "bg-red-50 text-red-600 border-red-100" 
              : "bg-emerald-50 text-emerald-700 border-emerald-100"
          }`}>
            {isOutOfStock ? "Out" : `${product.stockAvailable} Av`}
          </span>
        </div>

      </div>
    </Card>
  );
}
