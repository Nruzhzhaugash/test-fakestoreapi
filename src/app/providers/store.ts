import { configureStore } from "@reduxjs/toolkit";
import productSlice from "@/shared/model/products/products";
import createProductSlice from "@/shared/model/createProduct/createSlice";
import deleteProductReducer from "@/shared/model/products/products";
import { apiSlice } from "@/shared/api/apiSlice";
import updateProductReducer from "@/shared/model/products/products";

// const store = configureStore({
  
// });

// export default store;

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productSlice,
      create: createProductSlice,
      delete: deleteProductReducer,
      updateProduct: updateProductReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
