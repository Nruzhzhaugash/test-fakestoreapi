import { BASE_URL } from "@/shared/api/_BASE";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
      const res = await axios.patch(`${BASE_URL}/products/${id}`, data);
      return res.data;
    } catch (err) {
      console.log(err);
      thunkApi.rejectWithValue(err);
    }
  }
);

export type Product = {
  id: string | number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};

interface ProductState {
  list: Product[];
  filtered: Product[];
  loading: boolean;
  error: null;
}

const initialState: ProductState = {
  list: [],
  filtered: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterByPrice: (state, { payload }) => {
      state.filtered = state.list.filter(({ price }) => price < payload);
    },
    updateProductData: (state, { payload }) => {
      const index = state.list.findIndex(product => product.id === payload.id);
      if (index !== -1) {
        state.list[index] = payload;
        localStorage.setItem("products", JSON.stringify(state.list));
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
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.loading = false;
      console.log("Error");
    });
    builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
      const index = state.list.findIndex(
        (product) => product.id === payload.id
      );
      if (index !== -1) {
        state.list[index] = payload;
        localStorage.setItem("products", JSON.stringify(state.list));
      }
    });
  },
});

export const { filterByPrice, updateProductData } = productSlice.actions;

export default productSlice.reducer;
