import { API_URL } from "@/public/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "./getToken";

export const staffApi = createApi({
  reducerPath: "staffApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers: Headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Staff"],
  endpoints: (builder) => ({
    addStaffer: builder.mutation<void, string>({
      query: (email: string) => ({
        url: "/go-foods/sales-person/create",
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["Staff"],
    }),
    getAllMembers: builder.query<any, void>({
      query: () => "/go-foods/sales-person/sales-persons",
      providesTags: ["Staff"],
    }),
    deleteStaffer: builder.mutation<void, string>({
      query: (_id: string) => ({
        url: `/go-foods/sales-person/delete/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Staff"],
    }),
  }),
});

export const { useAddStafferMutation, useGetAllMembersQuery } = staffApi;
