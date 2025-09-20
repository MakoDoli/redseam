import Login from "@/components/login/login";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="flex">
      <Image
        src="/images/login-image.png"
        alt="couple"
        width={948}
        height={1000}
      />
      <div className="flex flex-col justify-center pl-[173px]">
        <h1 className="text-[#10151F] text-[42px] font-[600]"> Log in</h1>
        <Login />
      </div>
    </div>
  );
}
