// app/products/page.tsx (Server Component)
import { getAllProducts } from "@/services/getPorducts";
import ProductsListContainer from "@/components/products/ProductsListContainer";
import Filter from "@/components/products/Filter";
import Pagination from "@/components/products/Pagination";
import { Suspense } from "react";
//import { Product } from "@/types/productTypes";

// type Meta = {
//   current_page: number;
//   from: number;
//   to: number;
//   per_page: number;
//   total: number;
// };

type SearchParams = {
  page?: string;
  price_from?: string;
  price_to?: string;
  sort?: string;
};

type ProductsPageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const priceFrom = params.price_from;
  const priceTo = params.price_to;
  const sort = params.sort;

  const res = await getAllProducts({
    page,
    priceFrom: priceFrom ? Number(priceFrom) : undefined,
    priceTo: priceTo ? Number(priceTo) : undefined,
    sort: sort || undefined,
  });

  const products = res.data || [];
  const meta = res.meta || null;

  return (
    <div>
      <Suspense fallback={null}>{meta && <Filter meta={meta} />}</Suspense>
      <ProductsListContainer products={products} />
      <Suspense fallback={null}>{meta && <Pagination meta={meta} />}</Suspense>
    </div>
  );
}
