"use client"
import ProductItem from "@/components/product-item"
import { Product } from "@/shared/api/data"
import { useRouter } from "next/navigation"

interface OrderableProductItemProps {
    product?: Product
}

const OrderableProductItem = ({ product }: OrderableProductItemProps) => {
    const router = useRouter()
    
    if (!product) {
        return null
    }

    const handleClick = () => {
        router.push(`/cart?productId=${product.id}`)
    }

    return <ProductItem product={product} onClick={handleClick} />
}

export default OrderableProductItem