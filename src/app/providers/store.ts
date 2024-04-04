import { configureStore } from "@reduxjs/toolkit";
import productSlice from "@/shared/model/products/products";
import createProductSlice from "@/shared/model/createProduct/createSlice";
import deleteSlice from "@/shared/model/deleteProduct/deleteProduct";
import { apiSlice } from "@/shared/api/apiSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
    create: createProductSlice,
    delete: deleteSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
