import { Product } from "@/types/productTypes";
import Image from "next/image";
import React from "react";

export type CartProduct = Product & {
  size: string;
  color: string;
};
export default function CartProductCard({ product }: { product: CartProduct }) {
  const { available_colors, size, quantity, color, price, name, images } =
    product;
  const currentImageIndex = available_colors.findIndex(
    (imageColor) => imageColor.toLowerCase() === color
  );
  const currentImage = images[currentImageIndex];

  console.log("INdeX IS!:", currentImage);
  console.log(product);
  return (
    <div className="">
      {/* product */}
      <div className="flex w-[460px] h-[134px] ">
        <div className="relative w-[100px] h-[134px] rounded-[10px] border border-[#E1DFE1] mr-[17px]">
          <Image
            src={currentImage}
            alt="product image"
            fill
            className="object-cover rounded-[10px]"
          />
        </div>
        {/* product info */}
        <div className="w-full mt-[11px] ">
          <div className="flex justify-between">
            <h2 className="font-[500] text-[14px] text-[#10151F] mt-[11px]]">
              {name}
            </h2>
            <p className="font-[500] text-[14px] text-[#10151F] mt-[11px]]">
              $ {price}
            </p>
          </div>
          <p className="font-[400] text-[12px] text-[#3E424A] my-2">{color}</p>
          <p className="font-[400] text-[18px] text-[#3E424A] mb-3">{size}</p>
          <div className="flex justify-between">
            <div className="flex justify-around items-center w-[70px] h-6 rounded-[22px] border border-[#E1DFE1]">
              <div className="bg-[#E1DFE1] h-[1.5px] w-[10px] cursor-pointer"></div>
              <p className="text-[12px]">{quantity}</p>
              <div className=" relative size-[10px] cursor-pointer">
                <Image src="/icons/plus.png" alt="increase" fill />
              </div>
            </div>
            <p className="text-[12px] font-[400] text-[#3E424A] cursor-pointer">
              Remove
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
