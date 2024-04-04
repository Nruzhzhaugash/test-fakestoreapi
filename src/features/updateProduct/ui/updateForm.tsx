import { Product } from "@/shared/model/products/products";
import { Form, Input, Button } from "antd";

interface EditProductFormProps {
  title: string;
  image: string;
  price: string | any;
  category: string;
  description: string;
  loading: boolean;
  error: string | null;
  onSubmit: (updatedProductData: Partial<Product>) => void;
  onDelete: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({
  title,
  image,
  price,
  category,
  description,
  loading,
  error,
  onSubmit,
  onDelete,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      // initialValues={product}
      onFinish={handleSubmit}
    >
      <h1>{category}</h1>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter title" }]}
      >
        <Input value={title} />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please enter price" }]}
      >
        <Input type="number" value={price} />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please enter description" }]}
      >
        <Input.TextArea value={description} />
      </Form.Item>
      <Form.Item
        label="Image"
        name="image"
        rules={[{ required: true, message: "Please enter image URL" }]}
      >
        <Input value={image} />
      </Form.Item>
      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: "Please enter category" }]}
      >
        <Input value={category} />
      </Form.Item>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Save
        </Button>
        <Button onClick={onDelete} style={{ marginLeft: "10px" }}>
          Delete
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProductForm;
