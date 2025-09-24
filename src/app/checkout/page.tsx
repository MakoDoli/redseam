import CheckoutForm from "@/components/cart/CheckoutForm";
import CheckoutItems from "@/components/cart/CheckoutItems";
import React from "react";

export default function page() {
  return (
    <div>
      <h1 className="font-semibold text-[#10151F] text-[42px] mt-[72px] mb-[42px]">
        Checkout
      </h1>
      <div className="flex w-full justify-between">
        <CheckoutForm />
        <CheckoutItems />
      </div>
    </div>
  );
}
