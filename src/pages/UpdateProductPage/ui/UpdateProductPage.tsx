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
      <EditProductForm product={list} />
    </div>
  );
};

export default ProductEditPage;
