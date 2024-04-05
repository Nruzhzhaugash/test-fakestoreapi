// import { BASE_URL } from "@/shared/api/_BASE";
// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   image: string;
//   category: string;
// }

// interface ProductState {
//   list: Product[];
//   loading: boolean;
//   error: string | null;
// }


// const initialState: ProductState = {
//   list: [],
//   loading: false,
//   error: null,
// };

// const updateProductSlice = createSlice({
//   name: "product",
//   initialState,
//   reducers: {
//     getProductStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     getProductSuccess: (state, action: PayloadAction<Product[]>) => {
//       state.loading = false;
//       state.list = action.payload;
//     },
//     getProductFailure: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     updateProduct: (state, action: PayloadAction<Product>) => {
//       state.list = state.list.map((product) =>
//         product.id === action.payload.id ? action.payload : product
//       );
//     },
//   },
// });

// export const {
//   getProductStart,
//   getProductSuccess,
//   getProductFailure,
//   updateProduct,
// } = updateProductSlice.actions;

// export default updateProductSlice.reducer;
