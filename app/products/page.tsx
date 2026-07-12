import Image from "next/image";

type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
};

export default function ProductCard() {
  return (
    <div className="">
        This is product card
    </div>
  );
}