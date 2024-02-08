"use client";

import { CartContextProvider } from "@/hooks/useCart";

type CartProviderProps = {
  children: React.ReactNode;
};

function CartProvider({ children }: CartProviderProps) {
  return <CartContextProvider>{children}</CartContextProvider>;
}

export default CartProvider;
