import { API_URL } from "@/public/utils/constant";
import {
	fetchBaseQuery,
	createApi,
} from "@reduxjs/toolkit/query/react";
import { getToken } from "./getToken";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: (header: Headers) => {
			if (getToken()) {
				header.set("Authorization", `Bearer ${getToken()}`);
			}

			return header;
		},
	}),
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: "/admin/login",
				method: "POST",
				body: credentials,
			}),
		}),
		register: builder.mutation({
			query: (userData: any) => ({
				url: "/admin/register",
				method: "POST",
				body: userData,
			}),
		}),
		profile: builder.query<any, void>({
			query: () => "/go-foods/admin/profile",
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useProfileQuery,
} = authApi;
