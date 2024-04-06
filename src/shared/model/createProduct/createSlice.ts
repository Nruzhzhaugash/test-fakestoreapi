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
}

const initialState: ProductsState = {
  products:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("products") || "[]")
      : [],
  loading: false,
  error: null,
};

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (newProduct: ProductFormValues) => {
    const response = await axios.post(
      "https://fakestoreapi.com/products",
      newProduct
    );
    return response.data;
  }
);

const createProductSlice = createSlice({
  name: "create",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      localStorage.setItem("products", JSON.stringify(action.payload));
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
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
      localStorage.setItem("products", JSON.stringify(state.products));
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to create product";
    });
  },
});

export const { setProducts, setLoading, setError, updateProductData } =
  createProductSlice.actions;

export default createProductSlice.reducer;
