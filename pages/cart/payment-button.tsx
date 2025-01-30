import Button from "@/components/button"

const PaymentButton = () => {
    return <div className="flex w-full px-3 py-2">
        <Button className="bg-white w-full py-3" form="order-form">결제하기</Button>
    </div>
}
export default PaymentButton