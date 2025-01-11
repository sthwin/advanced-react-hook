import { delay } from "@/lib/utils"
import { data } from "./data"

export const fetchProducts = async () => {
  await delay(1000);
  return data.products;
}