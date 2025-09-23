"use client";
import { ReactNode, useContext, useState, createContext } from "react";

type CartContextType = {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  productsInCart: number;
  setProductsInCart: React.Dispatch<React.SetStateAction<number>>;
};

export const CartContext = createContext<CartContextType>({
  showCart: false,
  setShowCart: () => {},
  productsInCart: 0,
  setProductsInCart: () => {},
});

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [showCart, setShowCart] = useState(false);
  const [productsInCart, setProductsInCart] = useState(0);
  return (
    <CartContext.Provider
      value={{ showCart, setShowCart, productsInCart, setProductsInCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within provider");
  return context;
};
