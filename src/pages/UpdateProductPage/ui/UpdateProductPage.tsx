"use client";
import React, { useEffect } from "react";
import { EditProductForm } from "@/features/updateProduct";
import { useAppDispatch, useAppSelector } from "@/shared/lib/reduxHooks";

const ProductEditPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    products: { list },
  } = useAppSelector((state) => state);

  return (
    <div>
      <h2>Edit Product</h2>
      <EditProductForm
        product={{
          id: 21,
          title: "",
          price: 0,
          category: "",
          description: "",
          image: "",
        }}
        onSave={() => { } } onDelete={function (): void {
          throw new Error("Function not implemented.");
        } }      />
    </div>
  );
};

export default ProductEditPage;
