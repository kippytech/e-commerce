'use client'

import { CartContextProvider } from "@/hooks/useCart"

type CartProviderPropTypes = {
    children: React.ReactNode
}

function CartProvider({ children }: CartProviderPropTypes) {
  return (
    <CartContextProvider>
        {children}
    </CartContextProvider>
  )
}

export default CartProvider