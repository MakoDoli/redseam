"use client";
import React, { useState } from "react";
import Image from "next/image";
import { login } from "@/server/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/context/UserProfile";

export default function Login({
  setLogin,
}: {
  setLogin: (val: boolean) => void;
}) {
  const { setAvatar, setToken } = useUserProfile();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };
    const data = await login(payload);

    if (data.message) toast.error(data.message);
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("authToken", data.token);
      toast.success("Successfully logged in", { duration: 2000 });
      setAvatar(data.user.avatar);
      setToken(data.token);
      router.push("/");
    }
  };

  return (
    <>
      <h1 className="text-[#10151F] text-[42px] font-[600] mb-12"> Log in</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-[554px] relative flex flex-col">
          {!email && (
            <p className="absolute text-[#FF4000] top-[10px] left-[58px] ">*</p>
          )}
          {!password && (
            <p className="absolute text-[#FF4000] top-[75px] left-[88px] ">*</p>
          )}
          <input
            type="text"
            value={email}
            name="email"
            placeholder="Email"
            className="mb-6 h-[42px] w-full rounded-lg border border-[#E1DFE1] px-4 py-[10px] text-[14px] text-[#10151F] font-[400] "
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            name="password"
            placeholder="Password"
            className=" h-[42px] w-full rounded-lg border border-[#E1DFE1] px-4 py-[10px] text-[14px] text-[#10151F] font-[400] mb-[46px] "
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-20 cursor-pointer"
          >
            <Image
              src="/icons/eye.png"
              alt="show password"
              width={17}
              height={12}
            />
          </div>
          <button className="w-full h-[41px] text-white text-[14px] font-[400] bg-[#FF4000] rounded-[10px] flex justify-center items-center mb-6 cursor-pointer">
            Log in
          </button>

          <p className="text-[14px] font-[400] text-[#3E424A] text-center">
            Not a member?{" "}
            <span
              onClick={() => setLogin(false)}
              className="text-[#FF4000] ml-1 cursor-pointer"
            >
              Register
            </span>
          </p>
        </div>
      </form>
    </>
  );
}
