type Product = {
  id: string | number;
  price: string | number;
  title: string;
  category: string;
  image: any;
};

interface ProductProps {
  amount: number;
  products: Product[];
}
