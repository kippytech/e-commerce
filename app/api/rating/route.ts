import { getCurrentUser } from "@/actions/getCurrentUser";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { comment, rating, product, userId } = body;

  //ascertain the user has made an order & has been delivered before commenting
  const deliveredOrder = currentUser.orders.some(
    (order: any) =>
      order.products.find((item: any) => item.id === product.id) &&
      order.deliveryStatus === "delivered",
  );

  const userReview = product.reviews.find((review: Review) => {
    return review.userId === currentUser.id;
  });

  //prevent user from giving a review if:
  if (userReview || !deliveredOrder) {
    return NextResponse.error();
  }

  //create review
  const review = await prisma?.review.create({
    data: {
      comment,
      rating,
      productId: product.id,
      userId,
    },
  });

  return NextResponse.json(review);
}
