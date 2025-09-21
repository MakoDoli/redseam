"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <h1 className="text-[#10151F] text-[42px] font-[600] mb-12">
        Registration
      </h1>
      <div className="w-[554px] relative flex flex-col">
        {!email && (
          <p className="absolute text-[#FF4000] top-[10px] left-[58px] ">*</p>
        )}
        {!password && (
          <p className="absolute text-[#FF4000] top-[75px] left-[88px] ">*</p>
        )}
        {!confirmPassword && (
          <p className="absolute text-[#FF4000] top-[164px] left-[151px] ">*</p>
        )}
        <input
          type="text"
          value={email}
          placeholder="Email"
          className="mb-6 h-[42px] w-full rounded-lg border border-[#E1DFE1] px-4 py-[10px] text-[14px] text-[#10151F] font-[400] "
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          placeholder="Password"
          className=" h-[42px] w-full rounded-lg border border-[#E1DFE1] px-4 py-[10px] text-[14px] text-[#10151F] font-[400] mb-[46px] "
          onChange={(e) => setPassword(e.target.value)}
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
        <input
          type={showConfirm ? "text" : "password"}
          value={confirmPassword}
          placeholder="Confirm password"
          className=" h-[42px] w-full rounded-lg border border-[#E1DFE1] px-4 py-[10px] text-[14px] text-[#10151F] font-[400] mb-[46px] "
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div
          onClick={() => setShowConfirm((prev) => !prev)}
          className="absolute right-4 top-[170px] cursor-pointer"
        >
          <Image
            src="/icons/eye.png"
            alt="show password"
            width={17}
            height={12}
          />
        </div>
        <button className="w-full h-[41px] text-white text-[14px] font-[400] bg-[#FF4000] rounded-[10px] flex justify-center items-center mb-6">
          Register
        </button>
        <p className="text-[14px] font-[400] text-[#3E424A] text-center">
          Already member? <span className="text-[#FF4000] ml-1 ">Log in</span>
        </p>
      </div>
    </>
  );
}
