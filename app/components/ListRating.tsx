'use client'

import { Rating } from "@mui/material"
import Heading from "./Heading"
import moment from "moment"
import Avatar from "./Avatar"

type ListRatingPropType = {
    product: any
}

function ListRating({ product }: ListRatingPropType) {
  console.log('bure kabisa')
  return (
    <div>
        <Heading title="Product Review" />
        <div className="text-sm mt-2">
            { product.reviews && product.reviews.map((review: any) => (
                <div key={review.id} className="max-w-[300px]">
                    <div className='flex gap-2 items-center'>
                        <Avatar />
                        <div className='font-semibold'>{review?.user.name}</div>
                        <div className="font-light">{moment(review.createdDate).fromNow()}</div>
                    </div>
                    <div className="mt-2">
                      <Rating value={review.rating} readOnly />
                    </div>
                    <div className="ml-2">{review.comment}</div>
                    <hr className="my-4" />
                </div>
            ))}
        </div>
    </div>
  )
}

export default ListRating