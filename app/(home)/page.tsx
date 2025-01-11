"use client"
import NavBar from "@/components/nav-bar";
import Page from "@/components/page";
import Title from "@/components/title";
import { Suspense } from "react";
import ProductList from "@/components/product-list";

export default function Home() {
  return (
    <div>
      <Page header={<Title>메뉴목록</Title>} footer={<NavBar />} >
        <Suspense fallback={
          <div className="flex justify-center items-center h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        }>
          <ProductList />
        </Suspense>
      </Page>
    </div>
  );
}
