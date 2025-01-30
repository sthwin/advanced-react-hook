import Loading from "@/components/loading"
import NavBar from "@/components/nav-bar"
import Page from "@/components/page"
import Title from "@/components/title"
import Order from "@/pages/order/order"
import { Suspense } from "react"

export default async function OrderPage() {
    return (
        <Page
            className="flex flex-col gap-4 pb-20"
            header={<Title>주문내역</Title>}
            footer={<NavBar />}>
            <Suspense fallback={<Loading />}>
                <Order />
            </Suspense>
        </Page>
    )
}