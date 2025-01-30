import { useEffect, useRef } from "react"
import Dialog from "./dialog"

interface PaymentSuccessDialogProps {
    leftButtonClick?: () => void
    rightButtonClick?: () => void
}

const PaymentSuccessDialog = ({ leftButtonClick, rightButtonClick }: PaymentSuccessDialogProps) => {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        if (ref && ref.current) {
            const buttons = Array.from(ref.current.querySelectorAll("button"))

            if (buttons.length === 0) return

            const targetButton = buttons[buttons.length - 1]
            targetButton.focus()
        }
    }, [])

    return (<Dialog
        ref={ref}
        header={<div className="flex items-center gap-2 text-xl font-bold">결제완료</div>}
        footer={<div className="flex w-full text-sm gap-2">
            <button
                className="border border-slate-400 text-black flex-1 rounded-md py-1"
                onClick={() => { leftButtonClick?.() }}
            >
                아니오
            </button>
            <button
                className="border border-slate-400 text-black flex-1 rounded-md py-1 focus:bg-brand focus:text-white focus:border-none"
                onClick={() => { rightButtonClick?.() }}
            >
                예
            </button>
        </div>}
    >
        <div className="min-h-16">결제가 완료되었습니다. 주문 상태를 보러 가시겠습니까?</div>
    </Dialog>)
}

export default PaymentSuccessDialog