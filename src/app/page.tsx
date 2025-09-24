"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAllProducts } from "@/services/getPorducts";
import ProductsListContainer from "@/components/products/ProductsListContainer";
import Filter from "@/components/products/Filter";
import Pagination from "@/components/products/Pagination";
import { Product } from "@/types/productTypes";

type Meta = {
  current_page: number;
  from: number;
  to: number;
  per_page: number;
  total: number;
};

type Links = {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
};

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [links, setLinks] = useState<Links | null>(null);

  const page = Number(searchParams.get("page")) || 1;
  const priceFrom = searchParams.get("price_from");
  const priceTo = searchParams.get("price_to");
  const sort = searchParams.get("sort");

  useEffect(() => {
    async function fetchProducts() {
      const res = await getAllProducts({
        page,
        priceFrom: priceFrom ? Number(priceFrom) : undefined,
        priceTo: priceTo ? Number(priceTo) : undefined,
        sort: sort || undefined,
      });

      setProducts(res.data || []);
      setMeta(res.meta || null);
      setLinks(res.links || null);
    }
    fetchProducts();
  }, [page, priceFrom, priceTo, sort]);

  return (
    <div>
      {meta && <Filter meta={meta} />}
      <ProductsListContainer products={products} />
      {meta && <Pagination meta={meta} />}
    </div>
  );
}
