"use client"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '@/shared/model/createProduct/createSlice';
import { useAppSelector } from '@/shared/lib/reduxHooks';

const ProductForm: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useAppSelector((state) => state.create.loading);
  const error = useAppSelector((state) => state.create.error);

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    try {
      dispatch(createProduct(values));
      setSubmitting(false);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Formik
      initialValues={{
        title: '',
        price: '',
        description: '',
        image: '',
        category: '',
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required('Title is required'),
        price: Yup.number()
          .typeError('Price must be a number')
          .required('Price is required'),
        description: Yup.string().required('Description is required'),
        image: Yup.string().required('Image URL is required'),
        category: Yup.string().required('Category is required'),
      })}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <Field type="text" name="price" />
            <ErrorMessage name="price" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Field type="text" name="description" />
            <ErrorMessage name="description" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="image">Image URL</label>
            <Field type="text" name="image" />
            <ErrorMessage name="image" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <Field type="text" name="category" />
            <ErrorMessage name="category" component="div" className="error" />
          </div>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;

