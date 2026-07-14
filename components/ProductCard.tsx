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
  const isLowStock = Number(product.stockAvailable) > 0 && Number(product.stockAvailable) <= 3;
  const isOutOfStock = Number(product.stockAvailable) <= 0;

  return (
    <Card className="group overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-0 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      
      {/* 1. Top Section (Image and Hover Overlay Actions) */}
      <div className="relative aspect-square overflow-hidden bg-slate-50 border-b border-gray-100 flex items-center justify-center p-4">
        <img 
                        src={product.image || "/products/placeholder.png"} 
                        alt={product.name}
                        className="w-full h-full object-contain p-2"
                        loading="lazy"
                      />

        {/* Dynamic Category Tag Overlay */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] font-black uppercase tracking-wider bg-slate-900/90 text-white backdrop-blur-xs px-2.5 py-1 rounded-lg shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Sleek action trigger overlay appearing gracefully on card focus/hover */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-3 z-20">
          <div className="w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <ProductImageViewer
              image={product.image}
              name={product.name}
            />
          </div>
        </div>
      </div>

      {/* 2. Middle Section (Core Information Elements) */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
            {product.brand}
          </p>
          <h3 className="line-clamp-2 text-sm sm:text-base font-extrabold text-slate-800 tracking-tight leading-snug min-h-10">
            {product.name}
          </h3>
        </div>

        {/* Physical Metrics Row */}
        <div className="flex items-center justify-between text-xs border-y border-gray-100 py-2 my-1">
          <span className="text-gray-400 font-medium">Net Contents</span>
          <span className="font-bold text-slate-700 bg-gray-100 px-2 py-0.5 rounded">
            {product.weight}
          </span>
        </div>

        {/* Pricing Layout Matrix */}
        <div className="rounded-xl border border-gray-100 bg-slate-50/60 p-3 space-y-1.5 shadow-inner">
          <div className="flex justify-between items-baseline text-xs">
            <span className="text-gray-400 font-medium">Max Retail Price (MRP)</span>
            <span className="font-extrabold text-gray-500 line-through">
              Rs. {Number(product.mrp).toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-baseline pt-1 border-t border-gray-200/50">
            <span className="text-xs text-slate-500 font-bold">Dealer Rate</span>
            <span className="text-base font-black text-emerald-600 tracking-tight">
              Rs. {Number(product.dealerRate).toFixed(2)}
            </span>
          </div>
        </div>

        {/* 3. Bottom Section (Live Inventory Stock Indicators) */}
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-gray-400 font-medium">Stock Status</span>
          
          <Badge
            className={`rounded-lg px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase border shadow-none ${
              isOutOfStock 
                ? "bg-red-50 text-red-600 border-red-200" 
                : isLowStock 
                  ? "bg-amber-50 text-amber-600 border-amber-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
            }`}
          >
            {isOutOfStock 
              ? "Out of Stock" 
              : isLowStock 
                ? `${product.stockAvailable} Low` 
                : `${product.stockAvailable} Available`}
          </Badge>
        </div>

      </div>
    </Card>
  );
}
