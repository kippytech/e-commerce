import { CartProductType } from "@/app/components/ProductDetails"
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

type CartContextType = {
    cartTotalQty: number
    cartProducts: CartProductType[] | null
    handleAddProductToCart: (product: CartProductType) => void
    handleRemoveProductFromCart: (product: CartProductType) => void
    handleCartQtyIncrease: (product: CartProductType) => void
    handleCartQtyDecrease: (product: CartProductType) => void
}

export const CartContext = createContext<CartContextType | null>(null)

//index signature
type PropType = {
    [propName: string]: any
}

export const CartContextProvider = ({ props }: PropType) => {
    const [cartTotalQty, setCartTotalQty] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)

    useEffect(() => {
        const cartItems: any = localStorage.getItem('cartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)
        setCartProducts(cProducts)
    }, [])

    const handleAddProductToCart = useCallback((product: CartProductType) => {
      setCartProducts((prev) => {
         let updatedCart;

         if (prev) {
            updatedCart = [...prev, product]
         } else {
            updatedCart = [product]
         }

         toast.success('Product added to cart')
         localStorage.setItem('CartItems', JSON.stringify(updatedCart))

         return updatedCart
        })
    }, [cartProducts])

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        if (cartProducts) {
            const filteredProducts = cartProducts.filter((item) => {
                return item.id !== product.id
            })

            setCartProducts(filteredProducts)

            toast.success('Product removed from the cart')
            localStorage.setItem('CartItems', JSON.stringify(filteredProducts))

        }
    }, [cartProducts])

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        let updatedCart;

        if (product.quantity === 99) {
            return toast.error('Oops max reached')
        }

        if (cartProducts) {
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

            if (existingIndex > 1) {
                updatedCart[existingIndex].quantity = ++updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('CartItems', JSON.stringify(updatedCart))
    
        }
    }, [cartProducts])

    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        let updatedCart;

        if (product.quantity === 1) {
            return toast.error('Oops min reached')
        }

        if (cartProducts) {
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

            if (existingIndex > 1) {
                updatedCart[existingIndex].quantity = --updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('CartItems', JSON.stringify(updatedCart))
    
        }
    }, [cartProducts])

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease
    }

    return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
    const context = useContext(CartContext)

    if (context === null) {
        throw new Error('useCart must be used within a CartContextProvider')
    }

    return context
}