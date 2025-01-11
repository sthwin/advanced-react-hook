import NavBar from "@/components/nav-bar"
import Page from "@/components/page"
import Title from "@/components/title"
import OrderDeliveryCard from "@/pages/order/order-delivery-card"
import OrderPaymentCard from "@/pages/order/order-payment-card"
import OrderStatusCard from "@/pages/order/order-status-card"
import { fetchOrders as fetchOrder } from "@/shared/api/fetch-order"
import { use } from "react"

const OrderPage = () => {
    const order = use(fetchOrder())

    return (
        <Page
            className="flex flex-col gap-4"
            header={<Title>주문내역</Title>}
            footer={<NavBar />}>
            <OrderStatusCard {...order} />
            <OrderPaymentCard {...order} />
            <OrderDeliveryCard {...order} />
        </Page>
    )
}

export default OrderPage