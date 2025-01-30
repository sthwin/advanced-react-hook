"use client"

import { DialogProvider } from "@/shared/lib/context/dialog-context"
import { useSearchParams } from "next/navigation"
import OrderForm from "../order/order-form"
import CartProductItem from "./cart-product-item"

const CartPageWrapper = () => {
   
    const productId = useSearchParams()?.get("productId")

    return (<DialogProvider>
            <div className="flex flex-col gap-4 w-full justify-center items-center px-2 pb-20">
                {productId && <CartProductItem productId={productId} />}
                <OrderForm/>
            </div>
        </DialogProvider>)
}

export default CartPageWrapper