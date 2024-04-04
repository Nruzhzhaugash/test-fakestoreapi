"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createProduct } from "@/shared/model/createProduct/createSlice";
import { useAppSelector } from "@/shared/lib/reduxHooks";
import { Button } from "antd";

const ProductForm: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useAppSelector((state) => state.create.loading);
  const error = useAppSelector((state) => state.create.error);

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    try {
      dispatch(createProduct(values));
      setSubmitting(false);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        price: "",
        description: "",
        image: "",
        category: "",
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required("Title обезателен"),
        price: Yup.number()
          .typeError("Price должен соблюдать цифры")
          .required("Price обезателен"),
        description: Yup.string().required("Description обезателен"),
        image: Yup.string().required("Image должно быть URL"),
        category: Yup.string().required("Category обезателен"),
      })}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-md mb-2.5">
              Title
            </label>
            <Field
              type="text"
              className="border-[1px] border-black border-solid"
              name="title"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-600"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className="text-md mb-2.5">
              Price
            </label>
            <Field
              type="text"
              name="price"
              className="border-[1px] border-black border-solid"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="text-red-600"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-md mb-2.5">
              Description
            </label>
            <Field
              type="text"
              name="description"
              className="border-[1px] border-black border-solid"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-600"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="image" className="text-md mb-2.5">
              Image URL
            </label>
            <Field
              type="text"
              name="image"
              className="border-[1px] border-black border-solid"
            />
            <ErrorMessage
              name="image"
              component="div"
              className="text-red-600"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="category" className="text-md mb-2.5">
              Category
            </label>
            <Field
              type="text"
              name="category"
              className="border-[1px] border-black border-solid"
            />
            <ErrorMessage
              name="category"
              component="div"
              className="text-red-600"
            />
          </div>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <Button disabled={isSubmitting}>Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
