"use client"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Input, Space } from "antd";
import { useAppDispatch, useAppSelector } from "@/shared/lib/reduxHooks";
import { createProduct } from "@/shared/model/createProduct/createSlice";
import { v4 as uuidv4 } from 'uuid';

const ProductForm = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.products.loading);
  const error = useAppSelector((state) => state.products.error);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const productId = uuidv4();
      
      const updatedValues = { ...values, id: productId };

      dispatch(createProduct(updatedValues))
      setSubmitting(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        id: "",
        title: "",
        price: "",
        description: "",
        image: "",
        category: "",
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required("Title is required"),
        price: Yup.number().required("Price is required"),
        description: Yup.string().required("Description is required"),
        image: Yup.string().required("Image URL is required"),
        category: Yup.string().required("Category is required"),
      })}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <Field as={Input} type="text" name="title" />
            <ErrorMessage name="title" className="text-red-600 mt-1.5" component="div" />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <Field as={Input} type="number" name="price" />
            <ErrorMessage name="price" className="text-red-600 mt-1.5" component="div" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Field as={Input.TextArea} name="description" />
            <ErrorMessage name="description" className="text-red-600 mt-1.5" component="div" />
          </div>
          <div>
            <label htmlFor="image">Image URL</label>
            <Field as={Input} type="text" name="image" />
            <ErrorMessage name="image" className="text-red-600 mt-1.5" component="div" />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <Field as={Input} type="text" name="category" />
            <ErrorMessage name="category" className="text-red-600 mt-1.5" component="div" />
          </div>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              {isSubmitting ? "Submitting" : "Submit"}
            </Button>
          </Space>
          {error && <p>{error}</p>}
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;


