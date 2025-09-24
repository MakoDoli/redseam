"use client";
import { useCart } from "@/context/CartProvider";
import { useUserProfile } from "@/context/UserProfile";
import { colorMap } from "@/data/constants";
import { addToCart } from "@/server/action";
import { Product } from "@/types/productTypes";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

export default function ProductImages({ product }: { product: Product }) {
  const { token } = useUserProfile();
  const { setProductsInCart } = useCart();
  const {
    id,
    images,
    name,
    price,
    available_colors,
    available_sizes,
    quantity: amount,
    brand,
    description,
  } = product;
  const [imageNumber, setImageNumber] = useState(0);
  const [size, setSize] = useState("L");
  const [quantity, setQuantity] = useState(1);
  const [openSelect, setOpenSelect] = useState(false);

  const handleCart = async () => {
    if (amount < 1 || !amount) return toast.error("Item is out of stock");
    if (!available_sizes) return toast.error("Item is out of stock");
    const newProduct = {
      color: available_colors[imageNumber].toLowerCase(),
      quantity,
      size,
    };

    const cartProduct = await addToCart(newProduct, token, id);
    if (cartProduct.message) return toast.error(cartProduct.message);
    if (cartProduct.id) {
      setProductsInCart((prev) => prev + 1);
      toast.success("Product was added to cart", { duration: 1000 });
    }
  };

  return (
    <div className="flex mb-[110px] ">
      {/* small images */}
      <div className="w-[121px]  mr-6 space-y-[9px]">
        {images.map((img, index) => (
          <div
            key={img.slice(4)}
            className={`relative h-[161px] w-[121px] cursor-pointer  ${
              imageNumber === index && "border border-[#FF4000]"
            } `}
            onClick={() => setImageNumber(index)}
          >
            <Image
              src={img}
              alt="product image"
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {/* main image */}
      <div className=" relative min-w-[703px] h-[937px] mr-[168px]">
        <Image
          src={images[imageNumber]}
          alt="cover image"
          fill
          className="object-cover rounded-[10px]"
        />
      </div>
      {/* options */}
      <div>
        <h1 className="text-[32px] font-[600] text-[#10151F] mb-[21px]">
          {name}
        </h1>
        <p className="text-[32px] font-[600] text-[#10151F] mb-[56px]">
          $ {price}
        </p>
        <div>
          {/* Color */}
          <p>Color: {available_colors[imageNumber]}</p>
          <div className="flex gap-[13px] mb-[53px] ">
            {available_colors.map((color, index) => (
              <div
                key={color}
                className={`size-[38px] ${
                  color === "White" && "border border-[#E1DFE1]"
                } rounded-full cursor-pointer ${
                  index === imageNumber && "border border-[#FF4000]"
                }`}
                style={{
                  backgroundColor: colorMap[color as keyof typeof colorMap],
                }}
                onClick={() => setImageNumber(index)}
              ></div>
            ))}
          </div>
          {/* Size */}
          <p className="text[#10151F] text-[16px] font-[400]">Size: {size}</p>
          <div className="w-[382px] h-[42px] flex justify-between mb-12">
            {available_sizes &&
              available_sizes.map((s) => (
                <div
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-[70px] h-[42px] cursor-pointer rounded-[10px] flex justify-center items-center border ${
                    size === s ? "border-[#10151F]" : "border-[#E1DFE1]"
                  }  text-[#10151F] text-[16px] font-[400]`}
                >
                  {s}
                </div>
              ))}
          </div>
          {/* Quantity */}
          {!amount && (
            <p className="text[#10151F] text-[16px] font-[400] mb-[100px]">
              Sold out
            </p>
          )}
          {amount && (
            <>
              <p className="text[#10151F] text-[16px] font-[400] mb-4">
                Quantity
              </p>
              <div
                className="text[#10151F] px-3 text-[16px] font-[400] relative rounded-[10px] w-[70px] justify-around h-[42px] flex gap-3 border border-[#E1DFE1] items-center cursor-pointer mb-[56px]"
                onClick={() => setOpenSelect((prev) => !prev)}
              >
                <p>{quantity}</p>
                <ChevronDown />
                {openSelect && (
                  <div className="absolute w-[70px] max-h-[148px] top-[44px] scroll-auto flex flex-col gap-2 border border-[#E1DFE1] bg-white overflow-auto text-left  rounded-[10px]">
                    {Array.from({ length: amount }, (_, i) => i + 1).map(
                      (num) => (
                        <div
                          key={num}
                          className="hover:bg-[#E1DFE1] px-3 transition-colors duration-300"
                          onClick={() => setQuantity(num)}
                        >
                          {num}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </>
          )}
          {/* Cart */}
          <div
            className="bg-[#FF4000] max-w-[704px] h-[59px]  rounded-[10px] flex justify-center items-center gap-[10px] cursor-pointer mb-[72px]"
            onClick={handleCart}
          >
            <Image
              src="/icons/white-cart.png"
              alt="cart"
              width={24}
              height={24}
            />
            <p className="text-[18px] font-[500] text-white">Add to cart</p>
          </div>
        </div>
        <div className="max-w-[704px] border border-[#E1DFE1] mb-[71px]"></div>
        <div className="max-w-[704px] flex justify-between h-[61px] items-center mb-2">
          <p className="text-[20px] font-[500] text-[#10151F]">Details</p>
          <div className="relative w-[109px] h-[61px] ">
            <Image
              src={brand.image}
              alt="brand logo"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <p className="text[#10151F] text-[16px] font-[400] mb-[19px]">
          Brand: {brand.name}
        </p>
        {description ? (
          <p className="text[#10151F] text-[16px] font-[400]">{description}</p>
        ) : (
          <p>
            Someone deleted some products, so programer was lazy to add all
            properties to new products
          </p>
        )}
      </div>
    </div>
  );
}
