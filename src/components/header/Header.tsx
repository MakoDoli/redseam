import Image from "next/image";
import React from "react";
import Profile from "./Profile";

export default function Header() {
  return (
    <div className="bg-white flex justify-between h-20 items-center">
      <Image src="/logos/logo.png" width={180} height={24} alt="redseam logo" />
      <Profile />
    </div>
  );
}
