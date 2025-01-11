import { delay } from "@/lib/utils";
import { defaultOrder } from "./data";

export const fetchOrders = async () => {
    await delay(1000)
    return defaultOrder
  }