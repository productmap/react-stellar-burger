import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://norma.nomoreparties.space/api";
const refreshToken = localStorage.getItem("refreshToken");
const accessToken = localStorage.getItem("accessToken");

export const burgersApi = createApi({
  reducerPath: "burgersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: () => `/ingredients`,
      transformResponse: (response) => response.data,
    }),
    orderBurger: builder.mutation({
      query: (payload) => ({
        url: `/orders`,
        method: "POST",
        body: { ingredients: payload },
      }),
    }),
    registration: builder.mutation({
      query: (payload) => ({
        url: `auth/register`,
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: `/auth/login`,
        method: "POST",
        body: payload,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
        body: { token: refreshToken },
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: `/auth/user`,
        method: "GET",
        header: {
          Authorization: refreshToken,
        },
      }),
    }),
    updateUser: builder.query({
      query: (payload) => ({
        url: `/auth/user`,
        method: "PATCH",
        header: {
          Authorization: accessToken,
        },
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetIngredientsQuery,
  useOrderBurgerMutation,
  useLoginMutation,
  useRegistrationMutation,
  useGetUserQuery,
} = burgersApi;
