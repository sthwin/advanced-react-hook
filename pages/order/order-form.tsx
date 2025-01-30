"use client"
import FormControl from "@/components/form-control"
import PaymentSuccessDialog from "@/components/payment-success-dialog"
import { fetchCreteOrder } from "@/shared/api/fetch-order"
import useErrorDialog from "@/shared/hooks/use-error-dialog"
import { useLoadingDialog } from "@/shared/hooks/use-loading-dialog"
import { useDialog, DialogProvider } from "@/shared/lib/context/dialog-context"
import { useRouter } from "next/navigation"
import { useRef } from "react"


export const getInputValueByName = (formRef: React.RefObject<HTMLFormElement>, name: string) => {
    if (formRef.current) {
        const element = formRef.current.elements.namedItem(name)
        if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement) {
            return element.value
        }
    }
    return ''
}

const OrderFormContent = () => {
    const router = useRouter()
    const { startLoading, stopLoading } = useLoadingDialog()
    const { showErrorDialog } = useErrorDialog()
    const formRef = useRef<HTMLFormElement>(null)
    const { openDialog, closeDialog } = useDialog()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        startLoading("결제 중...")
        try {
            // const address = getInputValueByName("address")
            // const contact = getInputValueByName("contact")
            // const payment = getInputValueByName("payment")
            // const message = getInputValueByName("message")
            // const riderMessage = getInputValueByName("riderMessage")
            await fetchCreteOrder()
            stopLoading()
            openDialog(<PaymentSuccessDialog
                leftButtonClick={() => { 
                    router.push("/")
                    closeDialog()
                 }}
                rightButtonClick={() => { 
                    router.push("/order")
                    closeDialog()
                 }}
            />)
        } catch (error) {
            if (error instanceof Error) {
                await showErrorDialog(`${error.message}`, () => router.push("/"))
            } else {
                await showErrorDialog(`알 수 없는 에러가 발생했습니다. ${error}`, () => router.push("/"))
            }
        }
    }

    return (
        <form className="flex flex-col gap-4 w-full" id="order-form" ref={formRef} onSubmit={handleSubmit}>
            <FormControl label="주소" htmlFor="address" required>
                <input
                    type="text"
                    id="address"
                    name="address"
                    className="bg-white w-full border rounded-md px-2 py-1"
                    placeholder="배달받을 주소를 입력하세요"
                    required
                    autoFocus
                />
            </FormControl>
            <FormControl label="연락처" htmlFor="contact" required>
                <input
                    type="text"
                    id="contact"
                    name="contact"
                    className="bg-white w-full border rounded-md px-2 py-1"
                    placeholder="연락처를 입력하세요"
                    required
                />
            </FormControl>
            <FormControl label="결제 수단" htmlFor="payment" required>
                <select
                    id="payment"
                    name="payment"
                    className="bg-white w-full border rounded-md px-2 py-1"
                    required
                >
                    <option value="마이페이">마이페이</option>
                    <option value="만나서 결제">만나서 결제</option>
                </select>
            </FormControl>
            <FormControl label="가게 사장님께" htmlFor="message" required={false}>
                <textarea
                    id="message"
                    name="message"
                    className="bg-white w-full border rounded-md px-2 py-1"
                />
            </FormControl>
            <FormControl label="라이더님께" htmlFor="riderMessage" required={false}>
                <textarea
                    id="riderMessage"
                    name="riderMessage"
                    className="bg-white w-full border rounded-md px-2 py-1"
                />
            </FormControl>
        </form>
    )
}

const OrderForm = () => {
    return (
        <DialogProvider>
            <OrderFormContent />
        </DialogProvider>
    )
}

export default OrderForm