import { ProductCard } from "@/entities/ProductCard";
import { useAppSelector } from "@/shared/lib/reduxHooks";
import Link from "next/link";
import React from "react";

const CreatedProductsList = () => {
  const createdProducts = useAppSelector((state) => state.create.products);

  return (
    <div>
      <h2>Created Products</h2>
      <ul>
        {createdProducts.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <ProductCard
              image={product.image}
              title={product.title}
              price={product.price}
              category={product.category}
            />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CreatedProductsList;
