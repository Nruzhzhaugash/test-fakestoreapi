import { ProductCard } from "@/entities/ProductCard";
import { useAppSelector } from "@/shared/lib/reduxHooks";
import Link from "next/link";
import React from "react";
import { CreateProductListProps } from "./props";

const CreatedProductsList = ({ amount }: CreateProductListProps) => {
  const createdProducts = useAppSelector((state) => state.create.products);
  const list = createdProducts.filter((_, i) => i < amount);

  return (
    <>
      {list.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id}>
          <ProductCard
            image={product.image}
            title={product.title}
            price={product.price}
            category={product.category}
          />
        </Link>
      ))}
    </>
  );
};

export default CreatedProductsList;
