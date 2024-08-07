import { API_URL } from "@/public/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getFoodApi = createApi({
  reducerPath: "foodApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Food"],
  endpoints: (builder) => ({
    addFood: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/go-foods/foods/list",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Food"],
    }),
    getFoodByCategory: builder.query<any, string>({
      query: (category) => `/go-foods/foods/list/category/${category}`,
      providesTags: ["Food"],
    }),
    getAllfood: builder.query<any, void>({
      query: () => "/go-foods/foods/list",
      providesTags: ["Food"],
    }),
  }),
});

export const {
  useGetFoodByCategoryQuery,
  useGetAllfoodQuery,
  useAddFoodMutation,
} = getFoodApi;
