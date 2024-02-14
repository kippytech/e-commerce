"use client";

import { Rating } from "@mui/material";
import Heading from "./Heading";
import moment from "moment";
import Avatar from "./Avatar";

type ListRatingProps = {
  product: any;
};

function ListRating({ product }: ListRatingProps) {
  console.log("bure kabisa");

  if (product.reviews.length === 0) return null;

  return (
    <div>
      <Heading title="Product Reviews" />
      <div className="mt-2 text-sm">
        {product.reviews &&
          product.reviews.map((review: any) => (
            <div key={review.id} className="max-w-[300px]">
              <div className="flex items-center gap-2">
                <Avatar src={review?.user.image} />
                <div className="font-semibold">{review?.user.name}</div>
                <div className="font-light">
                  {moment(review.createdDate).fromNow()}
                </div>
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
  );
}

export default ListRating;
