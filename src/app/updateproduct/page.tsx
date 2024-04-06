import Layout from "@/widgets/Layout/Layout";
import ProductsTable from "@/widgets/ProductTable/ui/ProductTable";

export default function UpdateProduct() {

  
  return (
    <Layout>
      <main className="container py-10">
        <h1 className="text-xl mb-10">Update product</h1>
        <ProductsTable />
      </main>
    </Layout>
  );
}
