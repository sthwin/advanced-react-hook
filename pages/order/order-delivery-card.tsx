"use client"
import Card from "@/components/card"
import { Order } from "@/shared/api/data"

const OrderDeliveryCard = ({
    deliveryAddress,
    deliveryContact,
    messageToShop,
    messageToRider
}: Order) => {
    return (
        <Card
            data={[
                { title: "배달주소", content: deliveryAddress },
                { title: "전화번호", content: deliveryContact },
                { title: "가게사장님께", content: messageToShop },
                { title: "배달사장님께", content: messageToRider },
            ]}
        >
        </Card>
    )
}

export default OrderDeliveryCard