import NavBar from "@/components/nav-bar"
import Page from "@/components/page"
import ProductList from "@/components/product-list"
import Title from "@/components/title"

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Page header={<Title>메뉴목록</Title>} footer={<NavBar />} >
        <ProductList />
      </Page>
    </div>
  )
}

Home.displayName = "Home"
