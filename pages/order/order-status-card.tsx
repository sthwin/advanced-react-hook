"use client"
import Button from "@/components/button"
import Card from "@/components/card"
import Dialog from "@/components/dialog"
import { Order } from "@/shared/api/data"
import { useDialog } from "@/shared/lib/context/dialog-context"
import { memo, useCallback, useMemo } from "react"

const OrderStatusCard = ({
    id,
    status,
    name,
    orderDate,
    position
}: Order) => {
    console.log("OrderStatusCard rendered")
    const { openDialog, closeDialog } = useDialog()
    const calculateDeliveryMinute = () => {
        console.log("calcalculateDeliveryMinute")
        const 오랜시간 = 99999
        for (let i = 0; i < 오랜시간; i++) { }

        if (!position) return "-"
        return `${position[0]}분`
    }

    const expectedDeliveryTime = useMemo(calculateDeliveryMinute, [position[0]])

    const onClick = useCallback(() => {
        openDialog(<Dialog
            header={<div>위치보기</div>}
            footer={<div><Button onClick={closeDialog}>확인</Button></div>}
        >
            <ul>
                <li>위도: {position?.[0]}</li>
                <li>경도: {position?.[1]}</li>
            </ul>
        </Dialog>)
    }, [position])

    return (
        <Card
            header={<>
                <strong>{status}</strong>
                <div>{name}</div>
            </>}
            data={[
                { title: "주문일시", content: orderDate },
                { title: "주문번호", content: id },
                { title: "도착에상시간", content: <ExpectedDeliveryTime expectedDeliveryTime={expectedDeliveryTime} onClick={onClick} /> },
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

const ExpectedDeliveryTime = memo(({ expectedDeliveryTime, onClick }: { expectedDeliveryTime: string, onClick: () => void }) => {
    console.log("ExpectedDeliveryTime rendered")
    return (<>
        {expectedDeliveryTime}<Button className="w-fit ml-2" onClick={onClick}>위치보기</Button>
    </>)
})

ExpectedDeliveryTime.displayName = "ExpectedDeliveryTime"