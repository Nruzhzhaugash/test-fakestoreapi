"use client";
import ProductCard from "@/entities/ProductCard/ui/ProductCard";
import Link from "next/link";

export default function ProductList({ amount, products }: ProductProps) {
  const list = products.filter((_, i) => i < amount);

  return (
    <>
      {list.map(({ id, image, title, price, category }) => (
        <Link
          className="border-[1px] border-black border-solid rounded-[5px]"
          href={`/products/${id}`}
          key={id}
        >
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
}
