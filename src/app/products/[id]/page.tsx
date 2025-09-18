import { getProductById } from "@/services/getPorducts";
import React from "react";

type ParamsProps = {
  params: { id: number };
};
export default async function page({ params }: ParamsProps) {
  const { id } = await params;
  const product = await getProductById(id);
  return <div>{product.name}</div>;
}
