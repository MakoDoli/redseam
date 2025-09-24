/* eslint-disable @next/next/no-img-element */
"use client";
import { useCart } from "@/context/CartProvider";
import { useUserProfile } from "@/context/UserProfile";
import { checkout } from "@/server/action";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

export default function CheckoutForm() {
  const { email, setEmail, token } = useUserProfile();
  const [showModal, setShowModal] = useState(false);
  const { setProductsInCart } = useCart();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    // const payload = {
    //   name: formData.get("name") as string,
    //   surname: formData.get("surname") as string,
    //   email: formData.get("email") as string,
    //   address: formData.get("address") as string,
    //   zip_code: formData.get("zip_code") as string,
    // };
    const data = await checkout(formData, token);
    if (data.message) toast(data.message);

    setProductsInCart((prev) => prev - 1);
    setShowModal(true);
  };
  console.log("TOKEN", token);
  return (
    <div className="rounded-[16px] w-[1129px] h-[635px] bg-[#F8F6F7] px-[47px] py-[72px]">
      <h2 className="text-[#10151F] mb-[46px] text-[22px] font-[500]">
        Order details
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="w-[578px] space-y-[33px] ">
          <div className="flex gap-6 w-full ">
            <input
              className="text-[#3E424A] font-[400] text[14px] px-3 py-[10.5px] rounded-lg border border-[#E1DFE1] bg-white w-full"
              placeholder="Name"
              name="name"
              required
            />
            <input
              className="text-[#3E424A] font-[400] text[14px] px-3 py-[10.5px] rounded-lg border border-[#E1DFE1] bg-white w-full"
              placeholder="Surname"
              name="surname"
              required
            />
          </div>
          <div className="relative">
            <input
              className={`text-[#3E424A] font-[400] text[14px] ${
                !email ? "px-9" : "px-3"
              } py-[10.5px] rounded-lg border border-[#E1DFE1] bg-white w-[578px]`}
              placeholder="Email"
              value={email}
              name="email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            {!email && (
              <img
                src="/icons/email.png"
                alt="email"
                className="absolute top-[14px] left-3"
              />
            )}
          </div>
          <div className="flex gap-6 w-full">
            <input
              className="text-[#3E424A] font-[400] text[14px] px-3 py-[10.5px] rounded-lg border border-[#E1DFE1] bg-white w-full"
              placeholder="Address"
              name="address"
              required
            />
            <input
              className="text-[#3E424A] font-[400] text[14px] px-3 py-[10.5px] rounded-lg border border-[#E1DFE1] bg-white w-full"
              placeholder="Zip code"
              required
              name="zip_code"
              type="number"
            />
          </div>
        </div>
        <button className=" absolute right-[100px] bottom-[181px] flex justify-center items-center w-[460px] h-[59px] bg-[#FF4000] text-[14px] rounded-[10px] font-[400] text-white mt-[58px] cursor-pointer">
          pay
        </button>
      </form>
      {showModal && (
        <>
          <div className="fixed inset-0 z-10 bg-black opacity-30"></div>
          <div className="absolute z-20 bg-white top-0 left-1/2 -translate-x-1/2 w-[876px] h-[590px] pt-[138px] flex flex-col justify-center items-center ">
            <div className="size-[76px] flex justify-center items-center bg-[#F8F6F7] rounded-full mb-[40px]">
              <img src="/icons/checkout.png" alt="checked" />
            </div>
            <h1 className="text-[42px] font-[600]text-[#10151F] mb-4">
              {" "}
              Congrats!
            </h1>
            <p className="font-[400] text-[14px] text-[#3E424A] mb-[74px]">
              Your order is placed successfully!
            </p>
            <Link
              href="/"
              className="w-[214px] h-[41px] rounded-[10px] bg-[#FF4000]  flex justify-center items-center text-white text-[14px] font-[400]"
            >
              Continue shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
