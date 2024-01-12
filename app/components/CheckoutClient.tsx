'use client'

import { useCart } from "@/hooks/useCart"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import CheckoutForm from "./CheckoutForm"
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Button from "./Button"

const stripePromise = loadStripe((process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as stripe))

function CheckoutClient() {
    const { cartProducts, paymentIntent, handlePaymentIntent } = useCart()
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    const [paymentSuccess, setPaymentSuccess] = useState(false)

    const router = useRouter()

    useEffect(() => {
        //create payment intent as soona sthe page loads
        if (cartProducts) {
            setIsLoading(true)
            setIsError(false)

            fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'ContentType': 'application/json'
                },
                body: JSON.stringify({
                    items: cartProducts,
                    payment_intent_id: paymentIntent
                })
            }).then((res) => {
                setIsLoading(false)
                if (res.status === 401) {
                    return router.push('/login')
                }

                return res.json()
            }).then((data) => {
                setClientSecret(data.paymentIntent.client_secret)
                handlePaymentIntent(data.paymentIntent.id)
            }).catch((error) => {
                setIsError(true)
                toast.error('Something went wrong')
            })
        }
    }, [cartProducts, paymentIntent])

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            labels: 'floating'
        }
    }

    const handlePaymentSuccess = useCallback((value: boolean) => {
        setPaymentSuccess(value)
    }, [])

  return (
    <div className='w-full'>
        {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} handlePaymentSuccess={handlePaymentSuccess}/>
        </Elements>
      )}
      { isLoading && <div className="text-center">loading checkout...</div> }
      { isError && <div className="text-center text-rose-400">something went wrong</div> }
      { paymentSuccess && 
        <div className="flex items-center flex-col gap-4">
            <div className="text-teal-500 text-center">Payment Success</div>
            <div className="max-w-[220px] w-full">
                <Button label="View your orders" onClick={() => router.push('/order')}
            </div>
        </div> }
    </div>
  )
}

export default CheckoutClient