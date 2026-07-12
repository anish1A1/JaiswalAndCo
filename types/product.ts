export interface Product {
  id: string;
  name: string;
  weight: string;
  mrp: number;
  dealerRate: number;
  stockAvailable: number;
  image: string;
  brand: string;
  category: string; // Product Type
}