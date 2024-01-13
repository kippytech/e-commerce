'use client'

import { Order, User } from "@prisma/client"
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { formattedPrice } from "@/utils/formatPrice"
import Heading from "@/app/components/Heading"
import Status from "@/app/components/Status"
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md"
import ActionBtn from "@/app/components/ActionBtn"
import { useCallback } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import moment from "moment"

type ManageOrdersClientProps = {
    orders: ExtendedOrder[]
} 

type ExtendedOrder = Order & {
    user: User
}

function ManageOrdersClient({ orders }: ManageOrdersClientProps) {

    const router = useRouter()
    

    let rows: any = []

    if (orders) {
        rows = orders.map((order) => {
            return {
                id: order.id,
                customer: order.user.name,
                amount: formattedPrice(order.amount / 100), //had multiplied by 100 in stripe
                paymentStatus: order.status,
                date: moment(order.createdAt).fromNow(),
                deliveryStatus: order.deliveryStatus
            }
        })
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 220},
        {field: 'customer', headerName: 'Customer Name', width: 130},
        {field: 'amount', headerName: 'Amount', width: 130, renderCell: (params) => {
            return <div className="font-bold text-slate-800">{params.row.price}</div>
        }, },
        //{field: 'paymentStatus', headerName: 'Payment Status', width: 130},
        {field: 'paymentStatus', headerName: 'Payment Status', width: 130, renderCell: (params) => {
        return <div>{params.row.paymentStatus === 'pending' ? (<Status  text='pending' icon={MdAccessTimeFilled} bg='bg-slate-200' color='text-slate-700' /> ) : params.row.paymentStatus === 'complete' ? ( <Status  text='completed' icon={MdDone} bg='bg-teal-200' color='text-teal-700' /> ) :  <></> }</div>
        }, },
        {field: 'deliveryStatus', headerName: 'Delivery Status', width: 130, renderCell: (params) => {
        return <div>{params.row.deliveryStatus === 'pending' ? (<Status  text='pending' icon={MdAccessTimeFilled} bg='bg-slate-200' color='text-slate-700' /> ) : params.row.deliveryStatus === 'dispatched' ? ( <Status  text='dispatched' icon={MdDeliveryDining} bg='bg-purple-200' color='text-purple-700' /> ) : params.row.deliveryStatus === 'delivered' ? (
            <Status  text='delivered' icon={MdAccessTimeFilled} bg='bg-teal-200' color='text-teal-700' /> ) : params.row.deliveryStatus === 'dispatched' ? ( <Status  text='dispatched' icon={MdDone} bg='bg-purple-200' color='text-purple-700' />
        ) :  ( <></> ) }</div>
        }, },
        {field: 'date', headerName: 'Date', width: 130},
        {field: 'actions', headerName: 'Actions', width: 200, renderCell: (params) => {
            return <div className="flex justify-between gap-4 w-full">
                <ActionBtn  icon={MdDeliveryDining} onClick={() => {handleDispatch(params.row.id)}} />
                <ActionBtn  icon={MdDone} onClick={() => {handleDeliver(params.row.id)}} />
                <ActionBtn  icon={MdRemoveRedEye} onClick={() => {router.push(`order/${params.row.id}`)}} />
            </div>
        }, }
    ]

    const handleDispatch = useCallback((id: string) => {
        axios.put('/api/order', {
            id, deliveryStatus: 'dispatched'
        }).then((res) => {
            toast.success('Order dispatched')
            router.refresh()
        }).catch((err) => {
            toast.error('Something went wrong')
            console.log(err)
        })
    }, [])

    const handleDeliver = useCallback((id: string) => {
        axios.put('/api/order', {
            id, deliveryStatus: 'delivered'
        }).then((res) => {
            toast.success('Order delivered')
            router.refresh()
        }).catch((err) => {
            toast.error('Something went wrong')
            console.log(err)
        })
    }, [])

  return (
    <div className="max-w-[1150px] mx-auto text-xl">
        <div className="mt-8 mb-4">
            <Heading title="Manage Orders"  center />
        </div>
        <div style={{ height: 600, width: '100%'}}>
          <DataGrid 
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
                paginationModel: {page: 0, pageSize: 9}
            }
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
          />
        </div>
    </div>
  )
}

export default ManageOrdersClient