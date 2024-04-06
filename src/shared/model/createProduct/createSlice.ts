import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface ProductFormValues {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  deleteProduct: any;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  deleteProduct: null,
};

const loadProductsFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : [];
  }
  return [];
};

initialState.products = loadProductsFromLocalStorage();

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (newProduct: ProductFormValues) => {
    const response = await axios.post(
      "https://fakestoreapi.com/products",
      newProduct
    );
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `product: ${response.data.id}`,
        JSON.stringify(response.data)
      );
    }
    console.log(response.data);
    return response.data;
  }
);

const createProductSlice = createSlice({
  name: "create",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    deleteProduct(state, action: PayloadAction<number>) {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product.id !== productId
      );
      state.deleteProduct = productId;
    },
    updateProductData: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to create product";
    });
  },
});

export const { setLoading, setError, updateProductData, deleteProduct } =
  createProductSlice.actions;

export default createProductSlice.reducer;
