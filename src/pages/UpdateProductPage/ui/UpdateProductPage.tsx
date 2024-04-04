"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/reduxHooks";
import { useParams } from "next/navigation";
import { useGetProductQuery } from "@/shared/api/apiSlice";
import { EditProductForm } from "@/features/updateProduct";

const EditProductPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams() as { id: string | number };
  const {
    products: { list },
  } = useAppSelector((state) => state);

  const { data } = useGetProductQuery({
    id: params.id
  })

  return (
    <section>
      <EditProductForm 
        {...data}
      />
    </section>
  )
};


export default EditProductPage;
