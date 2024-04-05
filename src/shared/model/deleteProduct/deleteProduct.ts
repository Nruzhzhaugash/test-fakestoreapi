// import { BASE_URL } from "@/shared/api/_BASE";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export const deleteProduct = createAsyncThunk(
//   "products/deleteProduct",
//   async (productId: number | string, thunkApi) => {
//     try {
//       const res = await axios.delete(`${BASE_URL}/products/${productId}`);
//       return res.data;
//     } catch (err) {
//       console.log(err);
//       thunkApi.rejectWithValue(err);
//     }
//   }
// );

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   image: string;
//   category: string;
// }

// interface ProductsState {
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ProductsState = {
//   loading: false,
//   error: null,
// };

// const deleteSlice = createSlice({
//   name: "deleteProduct",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(deleteProduct.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(deleteProduct.fulfilled, (state) => {
//       state.loading = false;
//     });
//     builder.addCase(deleteProduct.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.error.message ?? "Failed to delete product";
//     });
//   },
// });

// export default deleteSlice.reducer;