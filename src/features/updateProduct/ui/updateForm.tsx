"use client"
import { Button, Form, Input, message, Modal } from "antd";
import React, { useState } from "react";
import { Product } from "@/shared/model/products/products";

interface EditProductFormProps {
  product: Product | any;
  onSave: (editedProduct: Product) => void;
  onDelete: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({
  product,
  onSave,
  onDelete,
}) => {
  const [editedProduct, setEditedProduct] = useState<Product | any>(product);

  const handleSave = () => {
    if (editedProduct) {
      onSave(editedProduct);
      try {
        localStorage.setItem("editedProduct", JSON.stringify(editedProduct));
        message.success("Product updated successfully");
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  };

  const confirmDelete = () => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this product?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        onDelete();
      },
    });
  };

  return (
    <Form name="edit_product_form" layout="vertical">
      <Form.Item label="Title">
        <Input
          value={editedProduct?.title}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, title: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Price">
        <Input
          type="number"
          value={editedProduct?.price}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, price: +e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Category">
        <Input
          value={editedProduct?.category}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, category: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Description">
        <Input.TextArea
          value={editedProduct?.description}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, description: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Image URL">
        <Input
          value={editedProduct?.image}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, image: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
        <Button
          className="bg-red-600 text-white"
          onClick={confirmDelete}
          style={{ marginLeft: 10 }}
        >
          Delete
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProductForm;
