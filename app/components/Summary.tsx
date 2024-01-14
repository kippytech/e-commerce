'use client'

import { Order, Product, User } from "@prisma/client"
import { useEffect, useState } from "react"
import Heading from "./Heading"
import { formattedPrice } from "@/utils/formatPrice"
import { formatNumber } from "@/utils/formatNumber"

type SummaryProps = {
    orders: Order[]
    products: Product[]
    users: User[]
}

type SummaryDataType = {
    [key: string]: {
        label: string
        digit: number
    }
}

function Summary({ orders, products, users }: SummaryProps) {

    const [summaryData, setSummaryData] = useState<SummaryDataType>({
        sales: {
            label: 'Total Sales',
            digit: 0
        },
        products: {
            label: 'Total Products',
            digit: 0
        },
        orders: {
            label: 'Total Orders',
            digit: 0
        },
        paidOrders: {
            label: 'Paid Orders',
            digit: 0
        },
        unpaidOrders: {
            label: 'Unpaid Orders',
            digit: 0
        },
        users: {
            label: 'Total Users',
            digit: 0
        },
    })

    useEffect(() => {
        setSummaryData((prev) => {
            let tempData = {...prev}

            const totalSales = orders.reduce((acc, item) => {
                if (item.status === 'complete') {
                    return acc + item.amount
                } else return acc
            }, 0)

            const paidOrders = orders.filter((order) => {
                return order.status === 'complete'
            })

            const unpaidOrders = orders.filter((order) => {
                return order.status === 'pending'
            })

            tempData.sales.digit = totalSales
            tempData.orders.digit = orders.length
            tempData.paidOrders.digit = paidOrders.length
            tempData.unpaidOrders.digit = unpaidOrders.length
            tempData.products.digit = products.length
            tempData.users.digit = users.length

            return tempData
        })
    }, [orders, products, users]) 

    //get summary keys ( coz cant map thro objects like arrays)
    const summaryKeys = Object.keys(summaryData)

  return (
    <div className="max-w-[1150px] mx-auto">
        <div className="mb-2 mt-8">
            <Heading title='Stats' center />
        </div>
        <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            { summaryKeys && summaryKeys.map((key) => (
                <div key={key} className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition">
                    <div className="text-xl md:text-4xl font-bold">
                        {
                            summaryData[key].label === 'Total Sales' ? <>{formattedPrice(summaryData[key].digit)} </> : <>{formatNumber(summaryData[key].digit)}</>
                        }
                    </div>
                    <div>{summaryData[key].label}</div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Summary