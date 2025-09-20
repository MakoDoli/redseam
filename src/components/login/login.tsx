"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-[554px] relative flex flex-col">
      <input
        type="text"
        placeholder="Email"
        className="mb-6 h-[42px] w-full rounded-lg border border-[#E1DFE1] px-4 py-[10px] text-[14px] text-[#10151F] font-[400] "
      />
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className=" h-[42px] w-full rounded-lg border border-[#E1DFE1] px-4 py-[10px] text-[14px] text-[#10151F] font-[400] mb-[46px] "
      />
      <div
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-4 top-20 cursor-pointer"
      >
        <Image
          src="/icons/eye.png"
          alt="show password"
          width={17}
          height={12}
        />
      </div>
      <button className="w-full h-[41px] text-white text-[14px] font-[400] bg-[#FF4000] rounded-[10px] flex justify-center items-center mb-6">
        Log in
      </button>
      <p className="text-[14px] font-[400] text-[#3E424A] text-center">
        Not a member? <span className="text-[#FF4000] ">Register</span>
      </p>
    </div>
  );
}
