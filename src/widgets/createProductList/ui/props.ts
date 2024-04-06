import { Product } from "@/shared/model/products/products";

export default interface CreateProductListProps {
  amount: number;
  products?: Product[];
}