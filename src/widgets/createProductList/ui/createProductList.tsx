"use client";
import { useAppDispatch, useAppSelector } from "@/shared/lib/reduxHooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductCard from "@/entities/ProductCard/ui/ProductCard";
import CreateProductListProps from "./props";
import { Product } from "@/shared/model/products/products";

const CreatedProductsList = ({ amount }: CreateProductListProps) => {
  const [products, setProducts] = useState(
    useAppSelector((state) => state.create.products)
  );

  const handleRemoveProduct = (productId: string | number) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const list = products.slice(20, 41);

  return (
    <>
      {list.map((product: Product) => (
        <div key={product.id}>
          <Link
            className="border-[1px] border-black border-solid rounded-[5px]"
            href={`/products/${product.id}`}
          >
            <ProductCard
              image={product.image}
              title={product.title}
              price={product.price}
              category={product.category}
            />
          </Link>
          {products.find((p) => p.id === product.id) && (
            <button onClick={() => handleRemoveProduct(product.id)}>
              Удалить
            </button>
          )}
        </div>
      ))}
    </>
  );
};

export default CreatedProductsList;
