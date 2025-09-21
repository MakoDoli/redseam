"use client";
import { UserType } from "@/types/userTypes";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const avatar = user?.avatar || "";
  return (
    <div className="flex h-10 items-center justify-between ">
      {user && (
        <Image
          src="/icons/shopping-cart.png"
          alt="cart icon"
          width={24}
          height={24}
          className="mr-5"
        />
      )}
      <Image
        src={avatar || "/icons/user.png"}
        alt="profile avatar"
        width={40}
        height={40}
        className="mr-2 rounded-full"
      />
      {avatar ? (
        <Image
          src="/icons/header-arrow.png"
          alt="arrow down"
          width={20}
          height={20}
        />
      ) : (
        <p className="text-[Log in] text-[12px] font-[500]">Log in</p>
      )}
    </div>
  );
}
