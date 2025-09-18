import Image from "next/image";
import React from "react";

export default function Filter() {
  return (
    <div className="h-[63px] flex justify-between items-center">
      <h1 className="font-semibold text-[#10151F] text-[42px]">Products</h1>
      <div className="w-[404px] h-[24px] text-[#3E424A] flex">
        <p className="text-[12px] font-regular mr-[64px] ">
          Showing 1-10 of 100 results
        </p>
        <div className="w-[64px] h-6 flex gap-2  mr-8">
          <Image
            src="/icons/filter.png"
            alt="filter icon"
            width={24}
            height={24}
          />
          <p className="text[16px] font-regular ">Filter</p>
        </div>
        <p className="">Sort by</p>
      </div>
    </div>
  );
}
