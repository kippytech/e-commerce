'use client'

import { useCart } from "@/hooks/useCart"
import { formattedPrice } from "@/utils/formatPrice"
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Heading from "./Heading"
import Button from "./Button"

type CheckoutFormPropTypes = {
    clientSecret: string
    handlePaymentSuccess: (value: boolean) => void
}

export default function CheckoutForm({ clientSecret, handlePaymentSuccess }: CheckoutFormPropTypes) {
    const { cartTotalAmount, handleClearCart, handlePaymentIntent } = useCart()
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const formatted_Price = formattedPrice(cartTotalAmount)

    useEffect(() => {
        if (!stripe) {
            return
        }
        if (!clientSecret) {
            return
        }
        handlePaymentSuccess(false)
    }, [stripe])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }
        setIsLoading(true)

        stripe.confirmPayment({
            elements, redirect: 'if_required'
        }).then((result) => {
            if (!result.error) {
                toast.success('Checkout Success')
                handleClearCart()
                handlePaymentSuccess(true)
                handlePaymentIntent(null)
            }
            setIsLoading(false)
        })
    }

    return (
        <form onSubmit={handleSubmit} id="payment-form">
            <div className="mb-6">
                <Heading title="Enter your payment details to complete checkout" />
            </div>
            <h2 className="mb-2 font-semibold">Address Information</h2>
            <AddressElement options={{mode: 'shipping', allowedCountries: ['US', 'KE']}} />
            <h2 className="mt-4 mb-2 font-semibold">Payment Information</h2>
            <PaymentElement id="payment-element" options={{layout: 'tabs'}} />
            <div className="py-4 text-center text-slate-700 text-xl font-bold">
                Total: {formatted_Price}
            </div>
            <Button label={isLoading ? 'Processing...' : 'Pay now'} disabled={isLoading || !stripe || !elements} onClick={() => {}} />
        </form>
    )
}