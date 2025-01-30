import Page from "@/components/page"
import Title from "@/components/title"
import CartPageWrapper from "@/pages/cart/cart-page-wrapper"
import PaymentButton from "@/pages/cart/payment-button"
import { DialogProvider } from "@/shared/lib/context/dialog-context"
import { Suspense } from "react"

function CartPage() {
    return (
        <DialogProvider>
            <Page className="flex flex-col gap-4 w-full justify-center items-center px-2 pb-20"
                header={
                    <div className="flex w-full items-center justify-start px-2">
                        <Title backUrl="/" className="flex-1">장바구니</Title>
                    </div>
                }
                footer={
                    <PaymentButton />
                }>
                <Suspense fallback={<div>Loading...</div>}>
                    <CartPageWrapper />
                </Suspense>
            </Page>
        </DialogProvider>
    )
}

export default CartPage