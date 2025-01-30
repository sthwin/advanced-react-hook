import { delay } from "@/lib/utils";
import { defaultOrder, Order } from "./data";

export async function fetchOrders(): Promise<{
  order: Order | null;
  error?: Error;
}> {
  try {
    await delay(500)
    return { order: {...defaultOrder, position: Date.now() % 2 === 0 ? [30, 30] : [60, 60]} }
  } catch (error) {
    if (error instanceof Error) {
      return { order: null, error }
    }
    return { order: null, error: new Error('알 수 없는 에러가 발생했습니다.') }
  }
}


export async function fetchCreteOrder(): Promise<
  void | { error: Error }
> {
  try {
    await delay(1000)
    return
  } catch (error) {
    if (error instanceof Error) {
      return { error }
    }
    return { error: new Error(`${error}`) }
  }
}