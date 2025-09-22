"use client";
import { ReactNode, useContext, useState, createContext } from "react";

type CartContextType = {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CartContext = createContext<CartContextType>({
  showCart: false,
  setShowCart: () => {},
});

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [showCart, setShowCart] = useState(false);
  return (
    <CartContext.Provider value={{ showCart, setShowCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within provider");
  return context;
};
