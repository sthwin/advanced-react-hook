"use client"

import OrderableProductItem from "@/pages/order/orderable-product-item";
import { Product } from "@/shared/api/data";
import { fetchProducts } from "@/shared/api/fetch-products";
import useErrorDialog from "@/shared/hooks/use-error-dialog";
import { useLoadingDialog } from "@/shared/hooks/use-loading-dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const { startLoading, stopLoading } = useLoadingDialog()
  const { showErrorDialog } = useErrorDialog()
  const router = useRouter()


  const fetch = async () => {
    try {
      startLoading()
      const data = await fetchProducts()
      setProducts(data)
      stopLoading()
    } catch (error) {
      await showErrorDialog(error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다', () => {
        console.log('closeDialog')
        router.push("/")
      })
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <ul className="flex flex-col justify-center w-full pb-16">
      {products.map((product) => (
        <li key={product.id} className="flex my-2">
          <OrderableProductItem product={product} />
        </li>
      ))}
    </ul>
  );
}
