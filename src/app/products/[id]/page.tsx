import ProductImages from "@/components/product-details/ProductImages";
import { getProductById } from "@/services/getPorducts";
import React from "react";

type ParamsProps = {
  params: { id: number };
};
export default async function page({ params }: ParamsProps) {
  const { id } = params;
  const product = await getProductById(id);

  return (
    <div>
      <p className="text-[#10151F] text-[14px] font-[300] mt-[30px] mb-[49px]">
        Listing/Product
      </p>
      <ProductImages product={product} />
    </div>
  );
}
