import Image from "next/image";
import React from "react";

export default function Profile() {
  return (
    <div className="flex  w-[108px] h-10 items-center justify-between ">
      <Image
        src="/icons/shopping-cart.png"
        alt="cart icon"
        width={24}
        height={24}
      />
      <Image
        src="/icons/avatar.png"
        alt="profile avatar"
        width={40}
        height={40}
        className="ml-2"
      />
      <Image
        src="/icons/header-arrow.png"
        alt="arrow down"
        width={20}
        height={20}
      />
    </div>
  );
}
