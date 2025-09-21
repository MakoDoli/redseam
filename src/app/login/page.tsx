import Login from "@/components/login/login";
import Register from "@/components/login/Register";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="flex ml-[-100px]">
      <Image
        src="/images/login-image.png"
        alt="couple"
        width={948}
        height={1000}
      />
      <div className="flex flex-col justify-center pl-[173px]">
        {/* <Login /> */}
        <Register />
      </div>
    </div>
  );
}
