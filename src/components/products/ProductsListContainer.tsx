import { Product } from "@/types/productTypes";
import React from "react";
import ProductCard from "./ProductCard";

type ProductsProps = {
  products: Product[];
};

export default function ProductsListContainer({ products }: ProductsProps) {
  return (
    <div className="mt-[72px] space-y-8">
      <div className="grid grid-cols-4 gap-x-6 gap-y-12 ">
        {products?.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
