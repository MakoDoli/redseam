import ProductsListContainer from "@/components/products/ProductsListContainer";
import { getAllProducts } from "@/services/getPorducts";

export default async function Home() {
  const products = await getAllProducts();
  console.log("Products: ", products);
  return (
    <>
      <ProductsListContainer products={products} />
    </>
  );
}
