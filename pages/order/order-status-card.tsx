import Button from "@/components/button"
import Card from "@/components/card"
import { Order } from "@/shared/api/data"

const OrderStatusCard = ({
    id,
    status,
    name,
    orderDate,

}: Order) => {
    return (
        <Card
            header={<>
                <strong>{status}</strong>
                <div>{name}</div>
            </>}
            data={[
                { title: "주문일시", content: orderDate },
                { title: "주문번호", content: id },
            ]}
            footer={<div className="flex gap-1">
                <Button className="border-slate-400 text-black w-fit">전화</Button>
                <Button className="border-slate-400 text-black w-fit">가게보기</Button>
            </div>}
        >
        </Card>
    )
}

export default OrderStatusCard