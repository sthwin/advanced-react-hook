import ProductItem from "./product-item";
import { fetchProducts } from "@/shared/api/fetch-products";
import { use } from "react";

export default function ProductList() {
  const products = use(fetchProducts());

  return (
    <ul className="flex flex-col justify-center w-full">
      {products.map((product) => (
        <li key={product.id} className="flex my-2">
          <ProductItem product={product} />
        </li>
      ))}
    </ul>
  );
}
