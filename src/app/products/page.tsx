import { ProductsPage } from "@/pages/Products";
import Layout from "@/widgets/Layout/Layout";

export default function Products() {
  return (
    <Layout>
      <main className="container py-10">
        <ProductsPage />
      </main>
    </Layout>
  );
}
