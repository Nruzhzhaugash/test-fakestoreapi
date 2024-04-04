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

type Product = {
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
  },
});

export const { filterByPrice } = productSlice.actions;

export default productSlice.reducer;
