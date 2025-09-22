"use client";
import { useCart } from "@/context/CartProvider";
import { useUserProfile } from "@/context/UserProfile";
import { getCartProducts } from "@/services/getPorducts";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Cart() {
  const { showCart, setShowCart } = useCart();
  const { token } = useUserProfile();
  const [cartProducts, setCartProducts] = useState({});

  useEffect(() => {
    const getCart = async () => {
      const products = await getCartProducts(token);
      setCartProducts(products);
    };
    getCart();
  }, [token]);

  console.log(cartProducts);

  return (
    <>
      <div
        className={`z-30 fixed w-[540px] top-0 min-h-screen bg-white p-10 transition-transform duration-1000 ease-out ${
          showCart ? "right-0 translate-x-0" : "right-0 translate-x-full"
        }`}
      >
        <div className="flex justify-between ">
          <h1 className=" text-[#10151F[ font-[500] text-[20px]">
            {" "}
            Shopping Cart (0)
          </h1>
          <X onClick={() => setShowCart(false)} className="cursor-pointer" />
        </div>

        <div className=" mt-[151px] flex flex-col justify-center items-center">
          <div className=" relative w-[170px] h-[135px] ">
            <Image
              src="/images/big-cart.png"
              alt="empty cart"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-[#10151F] text-[24px] font-[600] mt-6">Ooops!</p>
          <p className="text-[#3E424A] text-[14px] font-[400] mt-[10px]">
            You’ve got nothing in your cart just yet...
          </p>
          <div
            className="flex justify-center items-center w-[214px] h-[41px] bg-[#FF4000] text[14px]  rounded-[10px] font-[400] text-white mt-[58px] cursor-pointer"
            onClick={() => setShowCart(false)}
          >
            Start shopping
          </div>
        </div>
      </div>
      {showCart && (
        <div className=" h-screen z-20 top-0 mx-[-100px] w-full fixed bg-black opacity-30"></div>
      )}
      {/* empty cart */}
    </>
  );
}
