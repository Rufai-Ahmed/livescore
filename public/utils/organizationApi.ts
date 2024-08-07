import { API_URL } from "@/public/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "./getToken";

export const organizationApi = createApi({
  reducerPath: "organizationApi",
  tagTypes: ["organization"],
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
  endpoints: (build) => ({
    getOrganization: build.query<any, void>({
      query: () => "/go-foods/organization",
      providesTags: ["organization"],
    }),
  }),
});

export const { useGetOrganizationQuery } = organizationApi;
