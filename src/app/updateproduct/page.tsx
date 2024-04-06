import ListEditProductPage from "@/pagess/ListEditProduct/ui/listEditProductPage";
import Layout from "@/widgets/Layout/Layout";

export default function UpdateProduct() {
  return (
    <Layout>
      <main className="container py-10">
        <h1 className="text-xl mb-10">Update product</h1>
        <ListEditProductPage />
      </main>
    </Layout>
  );
}
