import { API_URL } from "@/public/utils/constant";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { getToken } from "./getToken";
import { Player } from "@/app/dashboard/player/page";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (header: Headers) => {
      const token = getToken();
      console.log(token);
      if (token) {
        header.set("Authorization", `Bearer ${token ? token : "yhgdshi"}`);
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
    createSession: builder.mutation({
      query: (sessionData) => ({
        url: "/sessions/sessions",
        method: "POST",
        body: sessionData,
      }),
    }),
    getSessions: builder.query<any, void>({
      query: () => "/sessions/sessions",
    }),
    getSessionById: builder.query({
      query: (id) => `/sessions/sessions/${id}`,
    }),
    updateSession: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/sessions/sessions/${id}`,
        method: "PUT",
        body: updates,
      }),
    }),
    deleteSession: builder.mutation({
      query: (id) => ({
        url: `/sessions/sessions/${id}`,
        method: "DELETE",
      }),
    }),
    startSession: builder.mutation({
      query: (id) => ({
        url: `/sessions/sessions/${id}/start`,
        method: "POST",
      }),
    }),
    endSession: builder.mutation({
      query: (id) => ({
        url: `/sessions/sessions/${id}/end`,
        method: "POST",
      }),
    }),
    getCurrentSession: builder.query({
      query: () => "/sessions/sessions/current",
    }),
    addTeamToSession: builder.mutation({
      query: ({ id, teamId }) => ({
        url: `/sessions/${id}/teams`,
        method: "POST",
        body: { teamId },
      }),
    }),
    removeTeamFromSession: builder.mutation({
      query: ({ id, teamId }) => ({
        url: `/sessions/${id}/teams/${teamId}`,
        method: "DELETE",
      }),
    }),
    createTeam: builder.mutation({
      query: (team) => ({
        url: "/teams",
        method: "POST",
        body: team,
      }),
    }),
    getTeams: builder.query<any, void>({
      query: () => "/teams",
    }),

    updateTeam: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/teams/${id}`,
        method: "PUT",
        body: updates,
      }),
    }),
    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "DELETE",
      }),
    }),

    player: builder.mutation<any, Player>({
      query: (player: Player) => ({
        url: "/admin/create-player",
        method: "POST",
        body: player,
      }),
    }),
    getPlayer: builder.query<any, void>({
      query: () => "/players/",
    }),
    getTeamById: builder.query({
      query: (id) => `/teams/${id}`,
    }),
    getPlayers: builder.query<Player[], void>({
      query: () => "/players/",
    }),
    addPlayerToTeam: builder.mutation<
      void,
      { teamId: string; playerId: string }
    >({
      query: ({ teamId, playerId }) => ({
        url: `/teams/teams/${teamId}/players/${playerId}`,
        method: "POST",
      }),
    }),
    removePlayerFromTeam: builder.mutation<
      void,
      { teamId: string; playerId: string }
    >({
      query: ({ teamId, playerId }) => ({
        url: `/teams/teams/${teamId}/players/${playerId}`,
        method: "DELETE",
      }),
    }),
    createPayment: builder.mutation({
      query: ({ playerId, session, amount }) => ({
        url: "/payments",
        method: "POST",
        body: { playerId, session, amount },
      }),
    }),
    getPayments: builder.query<any, void>({
      query: () => "/payments",
    }),
    getPaymentById: builder.query<any, void>({
      query: (id) => `/payments/${id}`,
    }),
    deletePayment: builder.mutation({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useAddPlayerToTeamMutation,
  useGetPlayersQuery,
  useRegisterMutation,
  usePlayerMutation,
  useGetPlayerQuery,
  useCreateSessionMutation,
  useGetSessionsQuery,
  useGetSessionByIdQuery,
  useUpdateSessionMutation,
  useDeleteSessionMutation,
  useStartSessionMutation,
  useEndSessionMutation,
  useGetCurrentSessionQuery,
  useCreateTeamMutation,
  useGetTeamByIdQuery,
  useGetTeamsQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useAddTeamToSessionMutation,
  useRemoveTeamFromSessionMutation,
  useCreatePaymentMutation,
  useGetPaymentsQuery,
  useGetPaymentByIdQuery,
  useDeletePaymentMutation,
} = authApi;
