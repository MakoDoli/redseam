"use client";
import { Product } from "@/types/productTypes";
import Image from "next/image";
import React, { useState } from "react";

export default function ProductImages({ product }: { product: Product }) {
  const { images, name, price, available_colors, available_sizes } = product;
  const [imageNumber, setImageNumber] = useState(0);
  const [size, setSize] = useState("L");

  console.log("COlors", available_colors);
  return (
    <div className="flex ">
      {/* small images */}
      <div className="w-[121px]  mr-6 space-y-[9px]">
        {images.map((img, index) => (
          <div
            key={img.slice(4)}
            className={`relative h-[161px] cursor-pointer  ${
              imageNumber === index && "border border-[#FF4000]"
            } `}
            onClick={() => setImageNumber(index)}
          >
            <Image
              src={img}
              alt="product image"
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {/* main image */}
      <div className=" relative w-[703px] h-[937px] mr-[168px]">
        <Image
          src={images[imageNumber]}
          alt="cover image"
          fill
          className="object-cover rounded-[10px]"
        />
      </div>
      {/* options */}
      <div>
        <h1 className="text-[32px] font-[600] text-[#10151F] mb-[21px]">
          {name}
        </h1>
        <p className="text-[32px] font-[600] text-[#10151F] mb-[56px]">
          $ {price}
        </p>
        <div>
          <p>Color: {available_colors[imageNumber]}</p>
          <div className="flex gap-[13px] mb-[53px] ">
            {available_colors.map((color, index) => (
              <div
                key={color}
                className={`size-[38px] ${
                  color === "White" && "border border-[#E1DFE1]"
                } rounded-full cursor-pointer ${
                  index === imageNumber && "border border-[#FF4000]"
                }`}
                style={
                  color === "Mauve"
                    ? { backgroundColor: "#E0B0FF" }
                    : { backgroundColor: color.toLowerCase() }
                }
                onClick={() => setImageNumber(index)}
              ></div>
            ))}
          </div>
          <p className="text[#10151F] text-[16px] font-[400]">Size: {size}</p>
          <div className="w-[382px] h-[42px] flex justify-between mb-12">
            {available_sizes.map((s) => (
              <div
                key={s}
                onClick={() => setSize(s)}
                className={`w-[70px] h-[42px] cursor-pointer rounded-[10px] flex justify-center items-center border ${
                  size === s ? "border-[#10151F]" : "border-[#E1DFE1]"
                }  text-[#10151F] text-[16px] font-[400]`}
              >
                {s}
              </div>
            ))}
          </div>
          <p className="text[#10151F] text-[16px] font-[400] mb-4">Quantity</p>
        </div>
      </div>
    </div>
  );
}
