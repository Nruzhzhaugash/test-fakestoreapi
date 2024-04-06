import ProductForm from "@/features/createForm/ui/createForm";

export default function CreateProductPage() {
  return (
    <section className="py-10">
      <h1 className="text-xl mb-12">Create Product</h1>
      <div>
        <ProductForm />
      </div>
    </section>
  );
}
// 