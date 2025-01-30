"use client"
import type { Order } from "@/shared/api/data"
import { fetchOrders } from "@/shared/api/fetch-order"
import { useLoadingDialog } from "@/shared/hooks/use-loading-dialog"
import { DialogProvider } from "@/shared/lib/context/dialog-context"
import { useEffect, useState } from "react"
import OrderDeliveryCard from "./order-delivery-card"
import OrderPaymentCard from "./order-payment-card"
import OrderStatusCard from "./order-status-card"

const OrderPage = () => {
    const { startLoading, stopLoading } = useLoadingDialog()
    const [order, setOrder] = useState<Order | null>(null)
    const [error, setError] = useState<Error | undefined>(undefined)

    const fetch = async () => {
        startLoading()
        const { order, error } = await fetchOrders()
        setOrder(order)
        setError(error)
        stopLoading()
    }

    useEffect(() => {
        fetch()
    }, [])

    useEffect(() => {
        const timer = setInterval(async () => {
            const { order } = await fetchOrders()
            setOrder(order)
        }, 3000)
        return () => clearInterval(timer)
    }, [])

    if (error) {
        showErrorDialog(error.message)
        return null
    }

    if (!order) {
        return null
    }

    return (
        <DialogProvider>
            <div className="space-y-4">
                <OrderStatusCard {...order} />
                <OrderDeliveryCard {...order} />
                <OrderPaymentCard {...order} />
            </div>
        </DialogProvider>
    )
}

export default OrderPage

function showErrorDialog(message: string) {
    throw new Error("Function not implemented.: " + message)
}
