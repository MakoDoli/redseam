import { Product } from "@/types/productTypes";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const { cover_image, name, price, id } = product;
  const title = name.at(0)?.toUpperCase() + name.slice(1);
  return (
    <Link href={`/products/${id}`}>
      <div className="w-[412px] h-[614px] space-y-3">
        <div className="w-[412px] h-[549px]  relative">
          <Image src={cover_image} fill alt="image" className="object-cover" />
        </div>
        <div className="h-[53px]  space-y-[2px]">
          <p className="text-[18px] font-medium">{title}</p>
          <p className="text-[16px] font-medium">$ {price}</p>
        </div>
      </div>
    </Link>
  );
}
