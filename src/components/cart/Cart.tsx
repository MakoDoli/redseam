"use client";
import { useCart } from "@/context/CartProvider";
import { useUserProfile } from "@/context/UserProfile";
import { getCartProducts } from "@/services/getPorducts";

import { X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CartProductCard, { CartProduct } from "./CartProductCard";
import Link from "next/link";

export default function Cart() {
  const { showCart, setShowCart, productsInCart, setProductsInCart } =
    useCart();
  const { token } = useUserProfile();
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const totalQuantity =
    cartProducts.length > 0
      ? cartProducts.reduce((acc, item) => acc + item.quantity, 0)
      : 0;
  const totalPrice =
    cartProducts.length > 0
      ? cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0)
      : 0;

  // 🔒 Lock page scroll when cart is open
  useEffect(() => {
    if (showCart) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showCart]);

  // Fetch cart products
  useEffect(() => {
    const getCart = async () => {
      const products = await getCartProducts(token);
      setCartProducts(products);
    };
    getCart();
  }, [token, productsInCart]);

  return (
    <>
      {/* Cart wrapper */}
      <div
        className={`z-30 fixed top-0 right-0 h-full w-[540px] bg-white p-10 flex flex-col transition-transform duration-500 ease-out 
          ${showCart ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between mb-6 shrink-0">
          <h1 className="text-[#10151F] font-[500] text-[20px]">
            Shopping Cart ({totalQuantity})
          </h1>
          <X onClick={() => setShowCart(false)} className="cursor-pointer" />
        </div>

        {/* Scrollable product list */}
        <div className="flex-1 overflow-y-auto pr-2">
          {cartProducts.length < 1 ? (
            <div className="mt-[80px] flex flex-col justify-center items-center">
              <div className="relative w-[170px] h-[135px]">
                <Image
                  src="/images/big-cart.png"
                  alt="empty cart"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-[#10151F] text-[24px] font-[600] mt-6">
                Ooops!
              </p>
              <p className="text-[#3E424A] text-[14px] font-[400] mt-[10px]">
                You’ve got nothing in your cart just yet...
              </p>
              <div
                className="flex justify-center items-center w-[214px] h-[41px] bg-[#FF4000] text-[14px] rounded-[10px] font-[400] text-white mt-[58px] cursor-pointer"
                onClick={() => setShowCart(false)}
              >
                Start shopping
              </div>
            </div>
          ) : (
            <div className="space-y-9 mt-[68px]">
              {cartProducts.length >= 1 &&
                cartProducts.map((product) => (
                  <CartProductCard
                    key={product.id}
                    product={product}
                    token={token}
                    setProductsInCart={setProductsInCart}
                  />
                ))}
            </div>
          )}
        </div>

        {/* Checkout footer (pinned) */}
        {cartProducts.length > 0 && (
          <div className="shrink-0 border-t border-gray-200 pt-4 mt-4 sticky bottom-0 bg-white">
            <div className="flex justify-between text-[#3E424A] text-[16px] font-[400]">
              <p>Items subtotal</p>
              <p>$ {totalPrice}</p>
            </div>
            <div className="flex justify-between text-[#3E424A] text-[16px] font-[400]">
              <p>Delivery</p>
              <p>$ 5</p>
            </div>
            <div className="flex justify-between text-[#10151F] text-[20px] font-[500]">
              <p>Total</p>
              <p>$ {totalPrice + 5}</p>
            </div>
            <div onClick={() => setShowCart(false)}>
              <Link
                href="/checkout"
                className="h-[59px] w-full flex justify-center items-center text-white text-[18px] font-[500] mb-10 mt-[102px] rounded-[10px] bg-[#FF4000]"
              >
                Go to checkout
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {showCart && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-30"
          onClick={() => setShowCart(false)}
        />
      )}
    </>
  );
}
