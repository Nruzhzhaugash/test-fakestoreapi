"use client";
import { useGetProductQuery } from "@/shared/api/apiSlice";
import { useAppSelector } from "@/shared/lib/reduxHooks";
import Product from "@/widgets/Product/ui/Product";
import ProductList from "@/widgets/ProductList/ui/ProductList";
import RightOutlined from "@ant-design/icons";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SoloProductPage() {
  const params = useParams() as { id: string | number };
  const {
    products: { list },
  } = useAppSelector((state) => state);

  const { data } = useGetProductQuery({
    id: params.id,
  });

  return (
    <section className="py-10">
      <div className="flex gap-[6px] mb-10">
        <Link
          href={"/products"}
          className="text-md font-meduim hover:underline"
        >
          Product Listing
        </Link>
        <RightOutlined className="relative top-[5px]" />
        <h3 className="text-md font-meduim text-blue-500 ">{data?.title}</h3>
      </div>
      <Product {...data} />
      <h1 className="text-xl mb-5 mt-12">Similar Products</h1>
      <div className="grid grid-cols-4 gap-[30px]">
        <ProductList amount={4} products={list} />
      </div>
    </section>
  );
};

