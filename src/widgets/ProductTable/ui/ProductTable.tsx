"use client";
import React, { useCallback, useEffect, useState } from "react";
import * as Antd from 'antd'
import { useAppDispatch, useAppSelector } from "@/shared/lib/reduxHooks";
import {
  Product,
  deleteProduct,
  updateProduct,
} from "@/shared/model/products/products";
import Image from "next/image";
import EditProductForm from "@/features/updateProduct/ui/updateForm";

const ProductsTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.list);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Функция для удаления продукта
  const deleteProductHandler = useCallback(
    (productId: number | string) => {
      dispatch(deleteProduct(productId))
        .unwrap()
        .then(() => {
          Antd.message.success("Product deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          Antd.message.error("Failed to delete product");
        });
    },
    [dispatch]
  );

  useEffect(() => {
    if (deleteConfirmationVisible && !isDeleting) {
      setIsDeleting(true);
      deleteProductHandler(editingProduct?.id || "");
      setTimeout(() => {
        setDeleteConfirmationVisible(false);
        setIsDeleting(false);
      }, 1000);
    }
  }, [
    deleteConfirmationVisible,
    deleteProductHandler,
    editingProduct,
    isDeleting,
  ]);

  const editProduct = (editedProduct: Product) => {
    setEditingProduct(null);
    dispatch(updateProduct(editedProduct));
    setIsModalVisible(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalVisible(true);
  };

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
          width={50}
          height={50}
          alt="Product"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Product) => (
        <div className="flex flex-col gap-5">
          <Antd.Button
            type="primary"
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Antd.Button>
          <Antd.Button
            className="bg-red-600 text-white"
            onClick={() => {
              setEditingProduct(record);
              setDeleteConfirmationVisible(true);
            }}
          >
            Delete
          </Antd.Button>
        </div>
      ),
    },
  ];

  return (
    <div className="text-xl mb-8">
      <h2>Existing Products</h2>
      <Antd.Table dataSource={products} columns={columns} />

      <Antd.Modal
        title="Edit Product"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <EditProductForm
          product={editingProduct}
          onSave={editProduct}
          onDelete={() => {
            if (editingProduct) {
              setEditingProduct(editingProduct);
              setDeleteConfirmationVisible(true);
            }
          }}
        />
      </Antd.Modal>

      <Antd.Modal
        title="Confirm Deletion"
        onOk={() => {
          if (editingProduct) {
            deleteProductHandler(editingProduct.id);
            setDeleteConfirmationVisible(false);
          }
        }}
        onCancel={() => setDeleteConfirmationVisible(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this product?</p>
      </Antd.Modal>
    </div>
  );
};

export default ProductsTable;
