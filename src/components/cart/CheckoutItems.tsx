"use client";
import React, { useEffect, useState } from "react";
import CartProductCard, { CartProduct } from "./CartProductCard";
import { getCartProducts } from "@/services/getPorducts";
import { useUserProfile } from "@/context/UserProfile";

export default function CheckoutItems() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const { token } = useUserProfile();

  const totalPrice =
    cartProducts.length > 0
      ? cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0)
      : 0;

  useEffect(() => {
    const getCart = async () => {
      const products = await getCartProducts(token);
      setCartProducts(products);
    };
    getCart();
  }, [token]);
  return (
    <div className="pl-[131px]">
      <div className="space-y-9 mb-[81px] h-[304px] overflow-auto">
        {cartProducts.length >= 1 &&
          cartProducts.map((product) => (
            <CartProductCard key={product.id} product={product} token={token} />
          ))}
      </div>
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
      </div>
    </div>
  );
}
