import Card from "@/components/card"
import { Order } from "@/shared/api/data"

const OrderPaymentCard = ({
    totalPrice,
    productPrice,
    discountPrice,
    deliveryPrice,
    paymentMethod
}: Order) => {
    return (
        <Card
            header={<>
                총 결제금액: {totalPrice.toLocaleString()}원
                <br />
                결제 방법: {paymentMethod}
            </>}
            data={[
                { title: "메뉴가격", content: <>{productPrice.toLocaleString()}원</> },
                { title: "배달료", content: <>{deliveryPrice.toLocaleString()}원</> },
                { title: "할인금액", content: <>{discountPrice.toLocaleString()}원</> },
            ]}
        >
        </Card>
    )
}

export default OrderPaymentCard