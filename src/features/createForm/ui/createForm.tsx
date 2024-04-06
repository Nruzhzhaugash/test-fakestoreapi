"use client";
import * as Formik from "formik";
import * as Yup from "yup";
import * as Antd from "antd";
import { useAppDispatch, useAppSelector } from "@/shared/lib/reduxHooks";
import { createProduct } from "@/shared/model/createProduct/createSlice";

export default function ProductForm() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.products.loading);
  const error = useAppSelector((state) => state.products.error);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const updatedValues = { ...values, id: Date.now() };
      dispatch(createProduct(updatedValues));
      setSubmitting(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Formik.Formik
      initialValues={{
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
        <Formik.Form>
          <div>
            <label htmlFor="title">Title</label>
            <Formik.Field as={Antd.Input} type="text" name="title" />
            <Formik.ErrorMessage
              name="title"
              className="text-red-600 mt-1.5"
              component="div"
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <Formik.Field as={Antd.Input} type="number" name="price" />
            <Formik.ErrorMessage
              name="price"
              className="text-red-600 mt-1.5"
              component="div"
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Formik.Field as={Antd.Input.TextArea} name="description" />
            <Formik.ErrorMessage
              name="description"
              className="text-red-600 mt-1.5"
              component="div"
            />
          </div>
          <div>
            <label htmlFor="image">Image URL</label>
            <Formik.Field as={Antd.Input} type="text" name="image" />
            <Formik.ErrorMessage
              name="image"
              className="text-red-600 mt-1.5"
              component="div"
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <Formik.Field as={Antd.Input} type="text" name="category" />
            <Formik.ErrorMessage
              name="category"
              className="text-red-600 mt-1.5"
              component="div"
            />
          </div>
          <Antd.Space>
            <Antd.Button type="primary" htmlType="submit" loading={loading}>
              {isSubmitting ? "Submitting" : "Submit"}
            </Antd.Button>
          </Antd.Space>
          {error && <p>{error}</p>}
        </Formik.Form>
      )}
    </Formik.Formik>
  );
}
