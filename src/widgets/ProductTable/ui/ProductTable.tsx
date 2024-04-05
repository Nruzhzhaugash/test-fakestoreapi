"use client";
import { Table } from "antd";
import { useAppSelector } from "@/shared/lib/reduxHooks";
import Image from "next/image";

const ProductsTable = () => {
  const {
    products: { list },
  } = useAppSelector((state) => state);
  const createdProducts = useAppSelector((state) => state.create.products);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text: string) => (
        <Image
          src={text}
          alt="Product"
          width={50}
          height={50}
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
  ];

  return (
    <div className="text-xl mb-8">
      <h2>Existing Products</h2>
      <Table dataSource={list} columns={columns} />

      <h2 className="text-xl mb-8 mt-10">Created Products</h2>
      <Table dataSource={createdProducts} columns={columns} />
    </div>
  );
};

export default ProductsTable;
