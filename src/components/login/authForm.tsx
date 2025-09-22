"use client";
import Login from "@/components/login/login";
import Register from "@/components/login/Register";
import Image from "next/image";
import React, { useState } from "react";

export default function AuthForm() {
  const [login, setLogin] = useState(true);
  return (
    <div className="flex ml-[-100px]">
      <Image
        src="/images/login-image.png"
        alt="couple"
        width={948}
        height={1000}
      />
      <div className="flex flex-col justify-center pl-[173px]">
        {login && <Login setLogin={setLogin} />}
        {!login && <Register setLogin={setLogin} />}
      </div>
    </div>
  );
}
