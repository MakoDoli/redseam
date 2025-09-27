import ProductImages from "@/components/product-details/ProductImages";
import { getProductById } from "@/services/getPorducts";
import React from "react";
type ParamsProps = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: ParamsProps) => {
  const { id } = await params;
  const data = await getProductById(Number(id));
  const title = data.name;

  return {
    title,
  };
};

export default async function page({ params }: ParamsProps) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  return (
    <div>
      <p className="text-[#10151F] text-[14px] font-[300] mt-[30px] mb-[49px]">
        Listing/Product
      </p>
      <ProductImages product={product} />
    </div>
  );
}
