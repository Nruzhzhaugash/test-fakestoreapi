import { BASE_URL } from "@/shared/api/BASE";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const saveProductsToLocalStorage = (products: Product[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("products", JSON.stringify(products));
  }
};

const loadProductsFromLocalStorage = (): Product[] => {
  if (typeof window !== "undefined") {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  }
  return [];
};
// 
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkApi) => {
    try {
      const res = await axios.get(`${BASE_URL}/products`);
      return res.data;
    } catch (err) {
      console.log(err);
      thunkApi.rejectWithValue(err);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (productData: Product, thunkApi) => {
    try {
      const { id, ...data } = productData;
      const res = await axios.put(`${BASE_URL}/products/${id}`, data);
      return res.data;
    } catch (err) {
      console.log(err);
      thunkApi.rejectWithValue(err);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: number | string, thunkApi) => {
    try {
      await axios.delete(`${BASE_URL}/products/${productId}`);
      localStorage.removeItem(`product:${productId}`); 
      return productId; 
    } catch (err) {
      console.log(err);
      thunkApi.rejectWithValue(err);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (newProduct: Product) => {
    const response = await axios.post(
      "https://fakestoreapi.com/products",
      newProduct
    );
    localStorage.setItem(
      `product: ${response.data}`,
      JSON.stringify(response.data)
    );
    console.log(response.data);
    return response.data;
  }
);

export type Product = {
  id: number | string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

interface ProductState {
  list: Product[];
  filtered: Product[];
  created: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  list: loadProductsFromLocalStorage(),
  filtered: [],
  created: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductData: (state, action: PayloadAction<Product>) => {
      const updatedProduct = action.payload;
      const index = state.list.findIndex(
        (product) => product.id === updatedProduct.id
      );
      if (index !== -1) {
        state.list[index] = updatedProduct;
        saveProductsToLocalStorage(state.list);
      }
    },
    deleteProductFromFiltered: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.filtered = state.filtered.filter(
        (product) => product.id !== productId
      );
    },
    addCreatedProduct: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      if (typeof product.id === "number" && product.id > 20) {
        state.created.push(product);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.loading = false;
      saveProductsToLocalStorage(state.list);
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.loading = false;
      state.error = "Failed to fetch products";
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const payload = action.payload;
      if (payload && typeof payload.id !== "undefined") {
        const index = state.list.findIndex(
          (product) => product.id == payload.id
        );
        if (index !== -1) {
          state.list[index] = payload;
          saveProductsToLocalStorage(state.list);
        }
      }
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const productId = action.payload;
      state.list = state.list.filter((product) => product.id !== productId);
      state.filtered = state.filtered.filter(
        (product) => product.id !== productId
      );
      saveProductsToLocalStorage(state.list);
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.list.push(action.payload);
      localStorage.setItem("products", JSON.stringify(state.list));
    });
  },
});

export const { updateProductData, addCreatedProduct } = productSlice.actions;

export default productSlice.reducer;
