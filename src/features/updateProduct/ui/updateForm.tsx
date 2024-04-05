"use client";
import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Product, updateProduct } from "@/shared/model/products/products";
import { useAppDispatch } from "@/shared/lib/reduxHooks";

interface EditProductFormProps {
  product: Product;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(product);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const updatedProduct = await updateProducts(product.id, formData);
      dispatch(updateProduct(updatedProduct));
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Title">
        <Input name="title" value={formData?.title} onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Price">
        <Input
          type="number"
          name="price"
          value={formData?.price}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Description">
        <Input.TextArea
          name="description"
          value={formData?.description}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Image">
        <Input name="image" value={formData?.image} onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Category">
        <Input
          name="category"
          value={formData?.category}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProductForm;
