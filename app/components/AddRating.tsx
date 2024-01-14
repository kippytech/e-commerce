'use client'

import { Order, Product, Review } from "@prisma/client"
import { SafeUser } from '@/types/index'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "./Heading";
import { Rating } from "@mui/material";
import Input from "./inputs/Input";
import Button from "./Button";
import toast from "react-hot-toast";
import axios from "axios";

type AddRatingProps = {
    product: Product & {
        reviews: Review[]
    };
    user: (SafeUser & {
        orders: Order[]
    }) | null
}

function AddRating({ product, user }: AddRatingProps) {

    const [isLoading, setIsLoading] =useState(false)
    const router = useRouter()

    const { register, handleSubmit, setValue, reset, formState: {errors }} = useForm<FieldValues>({
        defaultValues: {
            comment: '',
            rating: 1
        }
    })

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldTouch: true,
            shouldDirty: true,
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        if (data.rating === 0) {
            setIsLoading(false)
            return toast.error('No rating selected')
        }
        
        const ratingData = {...data, userId: user?.id, product: product}
        axios.post('/api/rating', ratingData).then(() => {
            toast.success('Rating submitted')
            router.refresh()
            reset()
        }).catch((error) => {
            toast.error('Something went wrong')
        }).finally(() => {
            setIsLoading(false)
        })
    } 

    if (!user || !product) return null

    //ascertain the user has made an order & has been delivered before commenting
    const deliveredOrder = user.orders.some((order: any) => order.products.find((item: any) => item.id === product.id) && order.deliveryStatus === 'delivered')

    const userReview = product.reviews.find((review: Review) => {
        return review.userId === user.id
    })

    //dont show ui if already reviewed
    if (userReview || !deliveredOrder) return null

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
        <Heading title="Rate this product" />
        <Rating onChange={(event, newValue) => {
            setCustomValue('rating', newValue)
        }} />
        <Input
          id='comment'
          label='Comment'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Button 
          label={isLoading ? 'Loading...' : 'Submit your rating'}
          onClick={handleSubmit(onSubmit)}
        />
    </div>
  )
}

export default AddRating