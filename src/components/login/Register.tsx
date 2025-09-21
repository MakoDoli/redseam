"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    console.log({
      photo,
      username,
      email,
      password,
      confirmPassword,
    });
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", confirmPassword);
    if (photo) formData.append("avatar", photo);
  };

  return (
    <>
      <h1 className="text-[#10151F] text-[42px] font-[600] mb-12">
        Registration
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-[554px] relative flex flex-col"
      >
        <div className="flex items-center gap-4 h-[100px] mb-6">
          <label
            htmlFor="photo-upload"
            className="flex items-center gap-2 cursor-pointer"
          >
            {preview ? (
              <Image
                src={preview}
                alt="preview"
                width={100}
                height={100}
                className="rounded-full mr-4"
              />
            ) : (
              <div className="size-[100px] rounded-full border border-[#E1DFE1] flex justify-center items-center mr-4">
                <Image
                  src="/icons/camera.png"
                  alt="camera"
                  width={20}
                  height={20}
                />
              </div>
            )}
            <span className="text-[14px] font-[400] text-[#10151F]">
              {`Upload ${preview ? "new" : ""} photo`}
            </span>
          </label>
          {preview && (
            <p
              onClick={handleRemovePhoto}
              className="text-[#FF4000] text-[14px] cursor-pointer"
            >
              Remove photo
            </p>
          )}
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {!username && (
          <p className="absolute text-[#FF4000] top-[135px] left-[93px]">*</p>
        )}
        {!email && (
          <p className="absolute text-[#FF4000] top-[200px] left-[59px]">*</p>
        )}
        {!password && (
          <p className="absolute text-[#FF4000] top-[265px] left-[88px]">*</p>
        )}
        {!confirmPassword && (
          <p className="absolute text-[#FF4000] top-[354px] left-[151px]">*</p>
        )}

        <input
          type="text"
          value={username}
          required
          placeholder="Username"
          className="mb-6 h-[42px] w-full rounded-lg border border-[#E1DFE1] px-4 py-[10px] text-[14px] text-[#10151F] font-[400]"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          value={email}
          required
          placeholder="Email"
          className="mb-6 h-[42px] w-full rounded-lg border border-[#E1DFE1] px-4 py-[10px] text-[14px] text-[#10151F] font-[400]"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          required
          placeholder="Password"
          className="h-[42px] w-full rounded-lg border border-[#E1DFE1] px-4 py-[10px] text-[14px] text-[#10151F] font-[400] mb-[46px]"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-[271px] cursor-pointer"
        >
          <Image
            src="/icons/eye.png"
            alt="show password"
            width={17}
            height={12}
          />
        </div>
        <input
          type={showConfirm ? "text" : "password"}
          value={confirmPassword}
          placeholder="Confirm password"
          className="h-[42px] w-full rounded-lg border border-[#E1DFE1] px-4 py-[10px] text-[14px] text-[#10151F] font-[400] mb-[46px]"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div
          onClick={() => setShowConfirm((prev) => !prev)}
          className="absolute right-4 top-[359px] cursor-pointer"
        >
          <Image
            src="/icons/eye.png"
            alt="show confirm"
            width={17}
            height={12}
          />
        </div>

        <button
          type="submit"
          className="w-full h-[41px] text-white text-[14px] font-[400] bg-[#FF4000] rounded-[10px] flex justify-center items-center mb-6"
        >
          Register
        </button>

        <p className="text-[14px] font-[400] text-[#3E424A] text-center">
          Already member? <span className="text-[#FF4000] ml-1">Log in</span>
        </p>
      </form>
    </>
  );
}
