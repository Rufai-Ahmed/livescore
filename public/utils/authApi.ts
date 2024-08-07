import { API_URL } from "@/public/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "./getToken";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (header: Headers) => {
      const token = getToken();

      if (token) {
        header.set("Authorization", `Bearer ${token}`);
      }

      return header;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/go-foods/admin/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/go-foods/admin/signup",
        method: "POST",
        body: userData,
      }),
    }),
    profile: builder.query<any, void>({
      query: () => "/go-foods/admin/profile",
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useProfileQuery } =
  authApi;
