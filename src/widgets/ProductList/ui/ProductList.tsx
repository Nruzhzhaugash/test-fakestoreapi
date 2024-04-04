"use client";
import { ProductCard } from "@/entities/ProductCard";
import Link from "next/link";

const ProductList = ({ amount, products }: ProductProps) => {
  const list = products.filter((_, i) => i < amount);

  return (
    <>
      {list.map(({ id, image, title, price, category }) => (
        <Link href={`/products/${id}`} key={id}>
          <ProductCard
            image={image}
            title={title}
            price={price}
            category={category}
          />
        </Link>
      ))}
    </>
  );
};

export default ProductList;
