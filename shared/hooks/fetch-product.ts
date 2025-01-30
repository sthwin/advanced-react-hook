import { Product } from "@/shared/api/data";
import { fetchProduct } from "@/shared/api/fetch-products";
import { useEffect, useState } from "react";

export const useFetchProduct = (id: string) => {
    const [data, setData] = useState<Product | undefined>(undefined)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true)
                const result = await fetchProduct(id)
                setData(result)
                setLoading(false)
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message)
                }
            } finally {
                setLoading(false)
            }
        }
        getProduct()
    }, [id])

    return { data, loading, error }
}