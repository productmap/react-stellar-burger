import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://norma.nomoreparties.space/api";
const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    if (accessToken) {
      headers.set("Authorization", accessToken);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let response = await baseQuery(args, api, extraOptions);

  if (response?.error?.status === 403) {
    console.log("Refresh token");
    if (refreshToken) {
      const refreshResponse = await baseQuery(
        { url: "/auth/token", method: "POST", body: { token: refreshToken } },
        api,
        extraOptions
      );

      if (refreshResponse) {
        // console.log(refreshResponse)
        localStorage.setItem("accessToken", refreshResponse.data.accessToken);
        localStorage.setItem("refreshToken", refreshResponse.data.refreshToken);
      }
    }
  }
  return response;
};

export const burgersApi = createApi({
  reducerPath: "burgersApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
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
    forgotPassword: builder.mutation({
      query: (payload) => ({
        url: `/password-reset`,
        method: "POST",
        body: payload,
      }),
    }),
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: `/password-reset/reset`,
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
      }),
    }),
    updateUser: builder.mutation({
      query: (payload) => ({
        url: `/auth/user`,
        method: "PATCH",
        body: payload,
      }),
    }),
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
  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useGetIngredientsQuery,
  useOrderBurgerMutation,
} = burgersApi;
