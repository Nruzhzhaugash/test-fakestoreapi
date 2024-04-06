"use client"
import { useAppSelector } from "@/shared/lib/reduxHooks";
import Link from "next/link";
import React from "react";
import CreateProductListProps from "./props";
import ProductCard from "@/entities/ProductCard/ui/ProductCard";

export default function CreatedProductsList({ amount }: CreateProductListProps) {
  const createdProducts = useAppSelector((state) => state.create.products);
  const list = createdProducts.filter((_, i) => i < amount);

  return (
    <>
      {list.map((product) => (
        <Link className="border-[1px] border-black border-solid rounded-[5px]" href={`/products/${product.id}`} key={product.id}>
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

