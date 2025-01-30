"use client"
import ProductItem from "@/components/product-item"
import useErrorDialog from "@/shared/hooks/use-error-dialog"
import { useLoadingDialog } from "@/shared/hooks/use-loading-dialog"
import { DialogProvider } from "@/shared/lib/context/dialog-context"
import { useEffect } from "react"
import { useFetchProduct } from "../../shared/hooks/fetch-product"


interface ProductItemProps {
    productId: string
}

const CartProductItemContent = ({ productId }: ProductItemProps) => {
    const { data, loading, error } = useFetchProduct(productId)
    const { startLoading, stopLoading } = useLoadingDialog()
    const { showErrorDialog } = useErrorDialog()
    useEffect(() => {
        if (error) {
            showErrorDialog(error)
            return
        }
        if (loading) {
            startLoading()
        } else {
            stopLoading()
        }
    }, [loading, error])

    return <div className="flex justify-center items-center w-full">
        {data && <ProductItem product={data} />}
    </div>
}

const CartProductItem = (props: ProductItemProps) => {
    return (
        <DialogProvider>
            <CartProductItemContent {...props} />
        </DialogProvider>
    )
}

export default CartProductItem