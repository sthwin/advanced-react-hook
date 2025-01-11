import Image from "next/image"
import Button from "./button"
import { Product } from "@/shared/api/data"


interface ProductItemProps {
    product: Product
}

const ProductItem = ({
    product
}: ProductItemProps) => {
    const { name, price, thumbnail } = product
    return <div className="flex justify-between w-full mx-2 border px-4 py-3 rounded-md shadow-lg">
        <div className="flex flex-col flex-1 justify-between">
            <div>
                <h2 className="text-2xl font-bold leading-tight">{name}</h2>
                <div className="text-xl leading-tight">{price}</div>
            </div>
            <Button onClick={() => console.log("주문하기")}>주문하기</Button>
        </div>
        <div>
            <Image src={thumbnail} width={100} height={100} priority alt={name} />
        </div>
    </div>
}

export default ProductItem      