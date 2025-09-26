import Image from "next/image";
import React from "react";
import Profile from "./Profile";
import Link from "next/link";
import Cart from "../cart/Cart";

export default function Header() {
  return (
    <div className="relative bg-white flex justify-between h-20 items-center">
      <Link href="/">
        <Image
          src="/logos/Logo.png"
          width={180}
          height={24}
          alt="redseam logo"
        />
      </Link>
      <Profile />
      <Cart />
    </div>
  );
}
