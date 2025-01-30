import { delay } from "@/lib/utils"
import { data } from "./data"

export const fetchProducts = async () => {
  await delay(500)
  return data.products
}

export const fetchProduct = async (id: string) => {
  await delay(500)
  return data.products.find(product => product.id === id)
}
