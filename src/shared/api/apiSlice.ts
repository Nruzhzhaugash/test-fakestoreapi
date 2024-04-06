import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./BASE";
import { buildUrl } from "./apiSet";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ id }) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    getProducts: builder.query({
      query: (params) => buildUrl("/products", params),
      providesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `/products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
} = apiSlice;
