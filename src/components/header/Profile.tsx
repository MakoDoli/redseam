"use client";
import { useCart } from "@/context/CartProvider";
import { useUserProfile } from "@/context/UserProfile";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Profile() {
  const { avatar, user } = useUserProfile();
  const { setShowCart } = useCart();

  const profileImage = user && avatar ? avatar : "";
  return (
    <div className="flex h-10 items-center justify-between ">
      {user && (
        <div onClick={() => setShowCart(true)} className="cursor-pointer">
          <Image
            src="/icons/shopping-cart.png"
            alt="cart icon"
            width={24}
            height={24}
            className="mr-5"
          />
        </div>
      )}
      <div className="relative size-10 rounded-full mr-2 ">
        <Image
          src={profileImage || "/icons/user.png"}
          alt="profile avatar"
          fill
          className="rounded-full"
        />
      </div>
      {user ? (
        <Image
          src="/icons/header-arrow.png"
          alt="arrow down"
          width={20}
          height={20}
        />
      ) : (
        <Link href="/login">
          <p className="text-[Log in] text-[12px] font-[500]">Log in</p>
        </Link>
      )}
    </div>
  );
}
